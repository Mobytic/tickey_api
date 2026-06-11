import { BaseMail } from '@adonisjs/mail'
import Ticket from '#models/ticket' 

export default class TicketCreatedAgency extends BaseMail {

    from = 'test@mobytic.com' 
    subject = 'Tickey : Un nouveau ticket a été créé'

    htmlView = 'emails/ticket_created_agency'

    constructor(public ticket: Ticket) {
        super()
    }

    prepare() {
        this.message.to("test@mobytic.com") 
    }
}