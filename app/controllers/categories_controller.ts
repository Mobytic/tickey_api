import Category from '#models/category'
import { createValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {

    /**
    * Category index
    */
    public async index({ response }: HttpContext) {
    
        const categories = await Category.all()
    
        return response.ok(categories)
      }

    /**
    * Category's creation
    */
    public async create({ request, response }: HttpContext) {

        const payload = await request.validateUsing(createValidator)
        const category = await Category.create({
            name: payload.name,
    })
        
        return response.created({
            message: "Catégorie créée avec succès",
            category: category})
    }

    /**
    * Categories's update
    */
    public async update({ params, request, response }: HttpContext) {

        const payload = await request.validateUsing(createValidator)
        const category= await Category.find(params.id)
        if (!category) {
            return response.notFound({ message: 'Cette catégorie n\'existe pas ou a été supprimée.' })
        }
        category.merge({
            name: payload.name,
        })
        await category.save()

        return response.ok({
            message: 'Catégorie mise à jour avec succès !',
            category: category
        })
    }

    /**
    * Categories's deletion
    */
   public async delete({ params, response }: HttpContext) {
        const category = await Category.find(params.id)
        
        if (!category) {
            return response.notFound({ 
                message: 'Cette catégorie n\'existe pas ou a été supprimée.' 
            })
        }
        
        await category.delete()
        
        return response.ok({ 
            message: 'Catégorie supprimée avec succès.' 
        })
    }
}