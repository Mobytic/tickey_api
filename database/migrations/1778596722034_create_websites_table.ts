import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'websites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('url').notNullable()

      table.integer('user_id')
           .unsigned()
           .references('id')
           .inTable('users')
           .onDelete('CASCADE')

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}