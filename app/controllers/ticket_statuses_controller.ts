import TicketsStatus from '#models/tickets_status'
import { createValidator } from '#validators/tickets_status'
import type { HttpContext } from '@adonisjs/core/http'

export default class TicketStatusesController {

    /**
        * Ticket's statuses index
        */
        public async index({ response }: HttpContext) {
        
            const statuses = await TicketsStatus.all()
        
            return response.ok(statuses)
          }
    
        /**
        * Ticket's statuses creation
        */
        public async create({ request, response }: HttpContext) {
    
            const payload = await request.validateUsing(createValidator)
            const ticketsStatus = await TicketsStatus.create({
                name: payload.name,
        })
            
            return response.created({
                message: "Statut de ticket créé avec succès",
                ticketsStatus: ticketsStatus})
        }
    
        /**
        * Ticket's statuses update
        */
        public async update({ params, request, response }: HttpContext) {
    
            const payload = await request.validateUsing(createValidator)
            const ticketsStatus= await TicketsStatus.find(params.id)
            if (!ticketsStatus) {
                return response.notFound({ message: 'Ce statut de ticket n\'existe pas ou a été supprimé.' })
            }
            ticketsStatus.merge({
                name: payload.name,
            })
            await ticketsStatus.save()
    
            return response.ok({
                message: 'Statut de ticket mis à jour avec succès !',
                ticketsStatus: ticketsStatus
            })
        }
    
        /**
        * Ticket's statuses deletion
        */
       public async delete({ params, response }: HttpContext) {
            const ticketsStatus = await TicketsStatus.find(params.id)
            
            if (!ticketsStatus) {
                return response.notFound({ 
                    message: 'Ce statut de ticket n\'existe pas ou a été supprimée.' 
                })
            }
            
            await ticketsStatus.delete()
            
            return response.ok({ 
                message: 'Statut de ticket supprimé avec succès.' 
            })
        }

}