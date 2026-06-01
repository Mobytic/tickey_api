import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ticket_tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('ticket_id')
        .unsigned()
        .references('id')
        .inTable('tickets')
        .onDelete('CASCADE')

      table
        .integer('nametag_id')
        .unsigned()
        .references('id')
        .inTable('nametags')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}