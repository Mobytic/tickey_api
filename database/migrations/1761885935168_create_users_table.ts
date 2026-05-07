import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('firstname').nullable()
      table.string('lastname').nullable()
      table.string('company_name').nullable()
      table.string('mail', 250).notNullable().unique()
      table.string('password').notNullable()
      table.string('tel').nullable()
      table.string('drive_path').nullable()
      table.string('session').nullable()

      table.enum('role', ['admin', 'client']).defaultTo('client')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
