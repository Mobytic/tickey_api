import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import Ticket from "./ticket";
import { HasMany } from "@adonisjs/lucid/types/relations";


export default class Category extends BaseModel {

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @hasMany(() => Ticket)
    public tickets: HasMany<typeof Ticket>
}