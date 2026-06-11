import { BaseMail } from '@adonisjs/mail'
import Ticket from '#models/ticket' 

export default class TicketCreatedClient extends BaseMail {

    from = 'test@mobytic.com' 
    subject = 'Confirmation de création de votre ticket'

    htmlView = 'emails/ticket_created_client'

    constructor(public ticket: Ticket) {
        super()
    }

    prepare() {
        this.message.to(this.ticket.user.mail) 
    }
}