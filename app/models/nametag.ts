import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Ticket from '#models/ticket'

export default class Nametag extends BaseModel {

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare color: string

    @manyToMany(() => Ticket, {
    pivotTable: 'ticket_tag',
    })
    declare tickets: ManyToMany<typeof Ticket>
}