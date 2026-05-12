import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tickets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('client_comment').notNullable()
      table.string('bug_link').notNullable()
      table.string('team_comment').nullable()
      table.string('mail_comment').nullable()

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('archived_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}