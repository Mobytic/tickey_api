import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import Ticket from '#models/ticket'
import type { HasMany } from "@adonisjs/lucid/types/relations";



export default class TicketsStatus extends BaseModel {

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @hasMany(() => Ticket)
    declare tickets: HasMany<typeof Ticket>
}