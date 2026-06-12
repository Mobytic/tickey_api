import Nametag from '#models/nametag'
import { createValidator } from '#validators/nametag'
import type { HttpContext } from '@adonisjs/core/http'

export default class NametagsController {

    /**
    * Nametags index
    */
    public async index({ response }: HttpContext) {
    
        const statuses = await Nametag.all()
    
        return response.ok(statuses)
        }

    /**
    * Nametag creation
    */
    public async create({ request, response }: HttpContext) {

        const payload = await request.validateUsing(createValidator)
        const nametag = await Nametag.create({
            name: payload.name,
            color: payload.color,
    })
        
        return response.created({
            message: "Nametag créé avec succès",
            nametag: nametag})
    }

    /**
    * Nametags update
    */
    public async update({ params, request, response }: HttpContext) {

        const payload = await request.validateUsing(createValidator)
        const nametag= await Nametag.find(params.id)
        if (!nametag) {
            return response.notFound({ message: 'Ce nametag n\'existe pas ou a été supprimé.' })
        }
        nametag.merge({
            name: payload.name,
            color: payload.color,
        })
        await nametag.save()

        return response.ok({
            message: 'Nametag mis à jour avec succès !',
            nametag: nametag
        })
    }

    /**
    * Nametags deletion
    */
    public async delete({ params, response }: HttpContext) {
        const nametag = await Nametag.find(params.id)
        
        if (!nametag) {
            return response.notFound({ 
                message: 'Ce nametag n\'existe pas ou a été supprimée.' 
            })
        }
        
        await nametag.delete()
        
        return response.ok({ 
            message: 'Nametag supprimé avec succès.' 
        })
    }
}