import { BaseMail } from '@adonisjs/mail'
import Ticket from '#models/ticket' 

export default class TicketClosedClient extends BaseMail {

    subject = 'Tickey : Votre ticket a été traité !'

    constructor(public ticket: Ticket) {
        super()
    }

    prepare() {
        this.message.to(this.ticket.user.mail)
        .htmlView('emails/ticket_closed', { ticket: this.ticket }) 
    }
}