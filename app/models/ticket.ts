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

    @column({ columnName: 'client_comment' })
    declare clientComment: string

    @column({ columnName: 'team_comment' })
    declare teamComment: string | null

    @column({ columnName: 'mail_comment' })
    declare mailComment: string | null

    @column()
    declare bugLink: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoUpdate: true })
    declare updatedAt: DateTime

    @column.dateTime({ autoUpdate: true })
    declare archivedAt: DateTime

    @column()
    declare userId: number

    @belongsTo(() => User)
    declare user: relations.BelongsTo<typeof User>

    @column()
    declare ticketStatusId: number

    @belongsTo(() => TicketsStatus, {
        foreignKey: 'ticketStatusId',
    })
    declare status: relations.BelongsTo<typeof TicketsStatus>

    @column()
    declare categoryId: number

    @belongsTo(() => Category)
    declare category: relations.BelongsTo<typeof Category>

    @manyToMany(() => Nametag, {
        pivotTable: 'ticket_tags', 
        pivotForeignKey: 'ticket_id',
        pivotRelatedForeignKey: 'nametag_id'})
    declare nametags: relations.ManyToMany<typeof Nametag>
}