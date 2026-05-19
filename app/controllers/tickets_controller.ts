import Ticket from '#models/ticket'
import type { HttpContext } from '@adonisjs/core/http'

export default class TicketsController {

    /**
    * Ticket index
    */
    public async index({ response }: HttpContext) {
    
        const tickets = await Ticket.all()

        return response.ok(tickets)
    }

    /**
    * Ticket's creation
    */
    public async create({ request, response }: HttpContext) {

        const payload = request.only(['title', 
                                    'description', 
                                    'status', 
                                    'priority', 
                                    'client_id'])
        const ticket = await Ticket.create(payload)
        
        return response.created({
            message: "Ticket créé et envoyé à l'équipe Mobytic ! :)",
            ticket: ticket})
    }

    /**
    * Get one ticket
    */
    public async show({ params, response }: HttpContext) {

        const ticket = await Ticket.findOrFail(params.id)

        return response.ok(ticket)
    }

    /**
    * Ticket's update
    */


    /**
    * Ticket's delete
    */
}