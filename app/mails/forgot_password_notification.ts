import { BaseMail } from '@adonisjs/mail'
import User from '#models/user'

export default class ForgotPasswordNotification extends BaseMail {

    subject = 'Tickey : Réinitialisation de votre mot de passe'

    constructor(public user: User, public resetLink: string) {
        super()
    }

    prepare() {
        this.message.to(this.user.mail)
        
        this.message.htmlView('emails/forgot_password', { 
            user: this.user, 
            resetLink: this.resetLink 
        })
    }
}