import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Website from '#models/website'
import { registerValidator, updateValidator, loginValidator } from '#validators/auth'
import db from '@adonisjs/lucid/services/db'
import encryption from '@adonisjs/core/services/encryption'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'
import ForgotPasswordNotification from '#mails/forgot_password_notification'
import env from '#start/env'


export default class AuthController {


  /**
  * User index
  */
  public async index({ response }: HttpContext) {

    const users = await User.query().preload('websites')

    return response.ok(users)
  }

  /**
  * Websites index
  */
  public async websiteIndex({ response }: HttpContext) {

    const websites = await Website.all()

    return response.ok(websites)
  }


  /**
   * New user registration
   */
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const transaction = await db.transaction()
    try {
      const user = new User()
      user.fill({
        firstname: payload.firstname,
        lastname: payload.lastname,
        mail: payload.mail,
        password: payload.password,
        companyName: payload.companyName,
        tel: payload.tel,
        drivePath: payload.drivePath,
      })
      user.useTransaction(transaction)
      await user.save()
      if (payload.urls && payload.urls.length > 0) {
        await user.related('websites').createMany(payload.urls)
      }
      await transaction.commit()
      const token = await User.accessTokens.create(user)
      await user.load('websites')

      return response.created({
        message: 'Inscription réussie',
        user: user,
        token: token.value!.release(),
      })

    } catch (error) {
      await transaction.rollback()
      return response.internalServerError({ message: "Erreur lors de la création" })
    }
  }


  /**
  * User login
  */
  async login({ request, response }: HttpContext) {

    const { mail, password } = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(mail, password)
      const token = await User.accessTokens.create(user)
      await user.load('websites')
      return response.ok({
        token: token.value!.release(),
        user: {
          id: user.id,
          firstname: user?.firstname,
          lastname: user?.lastname,
          companyName: user?.companyName,
          mail: user.mail,
          tel: user.tel,
          role: user.role,
          websites: user.websites,
          drivePath: user.drivePath,
        }
      })

    } catch (error) {
      return response.badRequest({ message: 'Email ou mot de passe incorrect' })
    }
  }



  /**
  * User logout
  */
  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    const token = user.currentAccessToken
    if (!token) {
      return response.badRequest({ message: 'Aucun jeton actif trouvé' })
    }
    await User.accessTokens.delete(user, token.identifier)
    return response.ok({ message: 'Déconnecté' })
  }


  /**
  * User page
  */
  async show({ auth, response }: HttpContext) {

    const user = auth.user as User
    await user.load('websites') 

    return response.ok(user)
  }

  /**
  * User update
  */
  async update({ params, request, response }: HttpContext) {

    const payload = await request.validateUsing(updateValidator, {
      meta: {
        userId: Number(params.id)
      }
    })
    const user = await User.findOrFail(params.id)
    const transaction = await db.transaction()
    user.useTransaction(transaction)
    console.log(payload)
    try {
      user.merge({
        firstname: payload.firstname,
        lastname: payload.lastname,
        mail: payload.mail,
        password: payload.password,
        companyName: payload.companyName,
        tel: payload.tel,
        drivePath: payload.drivePath,
      })
      await user.save()
      if (payload.urls) {

        const existingUrls = payload.urls.filter(
          (item) => item.id !== null && item.id !== undefined
        )
        const activeIds = existingUrls.map((item) => item.id as number)

        const newUrls = payload.urls
          .filter((item) => item.id === null || item.id === undefined)
          .map((item) => ({
            url: item.url
          }))


        if (activeIds.length > 0) {
          await user.related('websites').query().whereNotIn('id', activeIds).delete()
        } else {
          await user.related('websites').query().delete()
        }

        if (existingUrls.length > 0) {
          await user.related('websites').updateOrCreateMany(existingUrls, 'id')
        }

        if (newUrls.length > 0) {
          await user.related('websites').createMany(newUrls)
        }
      }

      if (user.$dirty) {
        await user.save()
      }
      
      await transaction.commit()
      await user.load("websites")
      return response.ok({ 
        message: "Client et sites mis à jour avec succès !", 
        updatedUser: user 
      })
    } catch (error) {
      await transaction.rollback()

      return response.internalServerError({
        message: "Erreur de modification",
        error: error instanceof Error ? error.message : "Erreur inconnue"
      })
    }
  }

  /**
   * user deletion
   */
  async delete({ params, response }: HttpContext) {
    const transaction = await db.transaction()

    try {

      const user = await User.findOrFail(params.id)
      user.useTransaction(transaction)
      await user.delete()
      await transaction.commit()

      return response.ok({ 
        message: "L'utilisateur a été supprimé avec succès." 
      })

    } catch (error) {
      await transaction.rollback()

      return response.internalServerError({
        message: "Erreur lors de la suppression de l'utilisateur.",
        error: error instanceof Error ? error.message : "Erreur inconnue"
      })
    }
  }


  /**
   * user password forgotten
   */
  async forgotPassword({ request, response }: HttpContext) {
    const mailAddress = request.input('mail')

    if (!mailAddress) {
      return response.badRequest({ message: "L'adresse e-mail est requise." })
    }

    const user = await User.findBy('mail', mailAddress)

    if (!user) {
      return response.ok({ 
        message: "Si cette adresse existe, un e-mail de réinitialisation vous a été envoyé." 
      })
    }

    const payload = {
      userId: user.id,
      expiresAt: DateTime.now().plus({ minutes: 20 }).toISO()
    }

    const token = encryption.encrypt(payload)

    const baseUrl = env.get('FRONTEND_URL', 'http://localhost:5173')
    // Le token est injecté dans les paramètres de l'URL pour que React puisse le lire
    const frontendUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`
    
    await mail.sendLater(new ForgotPasswordNotification(user, frontendUrl))

    return response.ok({ 
      message: "Si cette adresse existe, un e-mail de réinitialisation vous a été envoyé." 
    })
  }

  /**
   * User reset Password
   */
  async resetPassword({ request, response }: HttpContext) {
    const token = request.input('token')
    const newPassword = request.input('password')

    if (!token || !newPassword) {
      return response.badRequest({ message: "Données incomplètes (token ou mot de passe manquant)." })
    }

    try {
      const decrypted = encryption.decrypt<{ userId: number, expiresAt: string }>(token)
      if (!decrypted) {
        return response.badRequest({ message: "Le lien de réinitialisation est invalide ou corrompu." })
      }

      const expiresAt = DateTime.fromISO(decrypted.expiresAt)
      if (DateTime.now() > expiresAt) {
        return response.badRequest({ message: "Le lien de réinitialisation a expiré (maximum 20 minutes)." })
      }

      const user = await User.findOrFail(decrypted.userId)
      user.password = newPassword 
      
      await user.save()

      return response.ok({ message: "Votre mot de passe a été réinitialisé avec succès !" })

    } catch (error) {
      return response.internalServerError({ 
        message: "Une erreur est survenue lors de la réinitialisation.",
        error: error instanceof Error ? error.message : "Erreur inconnue"
      })
    }
  }
}
