import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().optional(),
    lastname: vine.string().trim().optional(),
    mail: vine.string().email().unique({ table: 'users', column: 'mail' }),
    password: vine.string().minLength(8),
    companyName: vine.string().optional(),
  })
)