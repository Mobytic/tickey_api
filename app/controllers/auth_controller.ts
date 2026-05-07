import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator } from '#validators/auth'

export default class AuthController {

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
      token: token,
    })
  }

}
