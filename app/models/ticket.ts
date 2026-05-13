import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import * as relations from '@adonisjs/lucid/types/relations'
import Nametag from './nametag.js'
import TicketsStatus from './tickets_status.js'
import Category from './category.js'

export default class Ticket extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare clientComment: string

    @column()
    declare teamComment: string | null

    @column({ columnName: 'mail_Comment' })
    declare mailComment: string | null

    @column()
    declare bugLink: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare archivedAt: DateTime

    @column()
    declare userId: number

    @belongsTo(() => User)
    declare user: relations.BelongsTo<typeof User>

    @belongsTo(() => TicketsStatus)
    declare status: relations.BelongsTo<typeof TicketsStatus>

    @belongsTo(() => Category)
    declare category: relations.BelongsTo<typeof Category>

    @manyToMany(() => Nametag, {
    pivotTable: 'ticket_tag', })
    declare tags: relations.ManyToMany<typeof Nametag>
}