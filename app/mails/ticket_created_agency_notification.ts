import { BaseMail } from '@adonisjs/mail'
import Ticket from '#models/ticket' 
import env from '#start/env'

export default class TicketCreatedAgency extends BaseMail {

    subject = 'Tickey : Un nouveau ticket a été créé'

    constructor(public ticket: Ticket) {
        super()
    }

    prepare() {
        this.message.to(env.get('MAIL_FROM_ADDRESS'))
        .htmlView('emails/ticket_created_agency', { ticket: this.ticket }) 
    }
}