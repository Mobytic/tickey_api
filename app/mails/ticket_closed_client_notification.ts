import { BaseMail } from '@adonisjs/mail'
import Ticket from '#models/ticket' 

export default class TicketClosedClient extends BaseMail {

    from = 'test@mobytic.com' 
    subject = 'Tickey : Votre ticket a été traité !'

    constructor(public ticket: Ticket) {
        super()
    }

    prepare() {
        this.message.to("test@mobytic.com")
        .htmlView('emails/ticket_closed', { ticket: this.ticket }) 
    }
}