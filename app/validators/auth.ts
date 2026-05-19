import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().optional(),
    lastname: vine.string().trim().optional(),
    mail: vine.string().email().unique({ table: 'users', column: 'mail' }),
    password: vine.string().minLength(8),
    companyName: vine.string().optional(),
    passwordConfirmation: vine.string().sameAs('password'),
  })
)

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  mail: vine.string().email(),
  password: vine.string().trim(),
})