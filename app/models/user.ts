import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

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

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'deleted_at' })
  declare deletedAt: DateTime

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.mail.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }
}
