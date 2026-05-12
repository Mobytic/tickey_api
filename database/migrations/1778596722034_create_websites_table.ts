import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'websites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('url').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}