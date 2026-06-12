import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Ticket from '#models/ticket'
import Website from '#models/website'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['mail'],
  passwordColumnName: 'password',
})

export default class User extends compose(UserSchema, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstname: string | null

  @column()
  declare lastname: string | null

  @column({ columnName: 'company_name' })
  declare companyName: string | null

  @column()
  declare mail: string

  @column()
  declare tel: string | null

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'admin' | 'client' 

  @column({ columnName: 'drive_path' })
  declare drivePath: string | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime

  @column.dateTime({columnName: 'deleted_at' })
  declare deletedAt: DateTime

  get initials() {
    const name = (this.firstname && this.lastname) 
      ? `${this.firstname} ${this.lastname}` 
      : this.mail

    if (!name) return '??'

    const parts = name.split(/[ @.]/)
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  @hasMany(() => Ticket)
  declare tickets: HasMany<typeof Ticket>

  @hasMany(() => Website, {
    foreignKey: 'userId',
  })
  declare websites: HasMany<typeof Website>
}
