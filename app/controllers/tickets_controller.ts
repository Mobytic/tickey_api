import Ticket from '#models/ticket'
import { createValidator, updateValidator } from '#validators/ticket'
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

        const payload = await request.validateUsing(createValidator)
        const ticket = await Ticket.create({
            title: payload.title,
            clientComment: payload.clientComment,
            bugLink: payload.bugLink,
            teamComment: payload.teamComment,
            mailComment: payload.mailComment,
    })
        
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
    public async update({ params, request, response }: HttpContext) {

    const payload = await request.validateUsing(updateValidator)
    const ticket = await Ticket.find(params.id)
    if (!ticket) {
        return response.notFound({ message: 'Ce ticket n\'existe pas ou a été supprimé.' })
    }
    ticket.merge({
        title: payload.title,
        clientComment: payload.clientComment,
        bugLink: payload.bugLink,
        teamComment: payload.teamComment,
        mailComment: payload.mailComment,
    })
    await ticket.save()

    return response.ok({
        message: 'Ticket mis à jour avec succès !',
        ticket: ticket
    })
}


}