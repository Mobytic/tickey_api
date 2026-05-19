import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator } from '#validators/auth'

export default class AuthController {


    /**
    * User index
    */
    public async index({ response }: HttpContext) {
    
      const users = await User.all()
      
      return response.ok(users)
    }

    /**
     * New user registration
     */
    async register({ request, response }: HttpContext) {
        
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create({
      firstname: payload.firstname,
      lastname: payload.lastname,
      mail: payload.mail,
      password: payload.password,
      companyName: payload.companyName,
      role: 'client',
    })
    const token = await User.accessTokens.create(user)

    return response.created({
      message: 'Inscription réussie',
      user: user,
      token: token.value!.release(),
    })
  }


  /**
  * User login
  */
  async login({ request, response }: HttpContext) {
    try {
      const { mail, password } = request.only(['mail', 'password'])
      const user = await User.verifyCredentials(mail, password)
      const token = await User.accessTokens.create(user)
      return response.ok({ 
        token: token.value!.release(), 
        user: user })

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

}
