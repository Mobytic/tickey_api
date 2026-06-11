import Ticket from '#models/ticket'
import { createValidator, updateValidator } from '#validators/ticket'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import TicketCreatedClient from '#mails/ticket_created_client_notification'
import TicketCreatedAgency from '#mails/ticket_created_agency_notification'

export default class TicketsController {

    /**
    * Ticket index
    */
    public async index({ auth, response }: HttpContext) {
        const currentUser = auth.user!
        const ticketQuery = Ticket.query()
        
        if (currentUser.role !== 'admin') {
            ticketQuery.where('userId', currentUser.id)
        }
        
        const tickets = await ticketQuery
            .preload('status')
            .preload('user')
            .preload('website')
            .preload('category')
            .preload('nametags')
            .orderBy('createdAt', 'desc')

        return response.ok(tickets)
    }

    /**
    * Ticket's creation
    */
    public async create({ auth, request, response }: HttpContext) {

        const currentUser = auth.user!
        const payload = await request.validateUsing(createValidator)
        const ticket = await Ticket.create({
            userId: currentUser.id,
            ticketStatusId: 1,
            title: payload.title,
            clientComment: payload.clientComment,
            bugLink: payload.bugLink,
            websiteId: payload.websiteId,
            teamComment: currentUser.role === 'admin' ? payload.teamComment : undefined,
            mailComment: currentUser.role === 'admin' ? payload.mailComment : undefined,
            categoryId: payload.categoryId,
    })
        await ticket.load('user')
        await mail.sendLater(new TicketCreatedClient(ticket))
        await mail.sendLater(new TicketCreatedAgency(ticket))
        
        return response.created({
            message: "Ticket créé et envoyé à l'équipe Mobytic ! :)",
            ticket: ticket})
    }

    /**
    * Get one ticket
    */
    public async show({ auth, params, response }: HttpContext) {
        const currentUser = auth.user!
        const ticket = await Ticket.query()
            .where('id', params.id)
            .preload('status')
            .preload('user')
            .preload('website')
            .preload('category')
            .preload('nametags')
            .firstOrFail()

        if (currentUser.role !== 'admin' && ticket.userId !== currentUser.id) {
            return response.forbidden({ message: 'Accès refusé.' })
        }

        return response.ok(ticket)
    }

    /**
    * Ticket's update
    */
    public async update({ auth, params, request, response }: HttpContext) {

        const currentUser = auth.user!
        const payload = await request.validateUsing(updateValidator)
        const ticket = await Ticket.find(params.id)
        if (!ticket) {
            return response.notFound({ message: 'Ce ticket n\'existe pas ou a été supprimé.' })
        }
        if (currentUser.role !== 'admin' && ticket.userId !== currentUser.id) {
            return response.forbidden({ message: 'Accès refusé.' })
        }
        const dataToUpdate: Record<string, any> = {}
        if (payload.title !== undefined) dataToUpdate.title = payload.title
        if (payload.clientComment !== undefined) dataToUpdate.clientComment = payload.clientComment
        if (payload.bugLink !== undefined) dataToUpdate.bugLink = payload.bugLink
        if (payload.websiteId !== undefined) dataToUpdate.websiteId = payload.websiteId
        if (payload.categoryId !== undefined) dataToUpdate.categoryId = payload.categoryId
        if (currentUser.role === 'admin') {
            if (payload.teamComment !== undefined) dataToUpdate.teamComment = payload.teamComment
            if (payload.mailComment !== undefined) dataToUpdate.mailComment = payload.mailComment
            if (payload.statusId !== undefined) dataToUpdate.ticketStatusId = payload.statusId
        }

        ticket.merge(dataToUpdate)
        await ticket.save()

        if (payload.nametagIds !== undefined) {
            await ticket.related('nametags').sync(payload.nametagIds)
        }
        
        await ticket.load('category')
        await ticket.load('status')
        await ticket.load('nametags')

        return response.ok({
            message: 'Ticket mis à jour avec succès !',
            ticket: ticket
        })
    }
}