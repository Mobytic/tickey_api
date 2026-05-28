import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, updateValidator } from '#validators/auth'
import { loginValidator } from '#validators/auth'
import db from '@adonisjs/lucid/services/db'


export default class AuthController {


  /**
  * User index
  */
  public async index({ response }: HttpContext) {

    const users = await User.query().preload('websites')

    return response.ok(users)
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
      return response.ok({
        token: token.value!.release(),
        user: {
          firstname: user?.firstname,
          lastname: user?.lastname,
          companyName: user?.companyName,
          mail: user.mail,
          role: user.role,
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
    return response.ok(auth.user)
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
      })
      await user.save()
      if (payload.urls) {
        const activeIds = payload.urls
          .map((item) => item.id)
          .filter((id) => id !== undefined) as number[]
        if (activeIds.length > 0) {
          await user.related('websites').query().whereNotIn('id', activeIds).delete()
        } else {
          await user.related('websites').query().delete()
        }
        await user.related('websites').updateOrCreateMany(payload.urls)
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
}
