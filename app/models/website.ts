import { BaseModel, column } from "@adonisjs/lucid/orm";


export default class Website extends BaseModel {

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare url: string

}