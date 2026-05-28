import vine from '@vinejs/vine'

export const registerValidator = vine.create(
  vine.object({
    firstname: vine.string().trim().optional(),
    lastname: vine.string().trim().optional(),
    mail: vine.string().email().unique({ table: 'users', column: 'mail' }),
    password: vine.string().minLength(8),
    companyName: vine.string().optional(),
    passwordConfirmation: vine.string().sameAs('password'),
  })
)


export const loginValidator = vine.create({
  mail: vine.string().email(),
  password: vine.string().trim(),
})

export const updateValidator = vine.withMetaData<{ userId: number }>().create(
  vine.object({
    firstname: vine.string().trim().optional(),
    lastname: vine.string().trim().optional(),
    mail: vine.string().email().unique({ 
      table: 'users', 
      column: 'mail',
      filter: (db, value, field) => {
        db.whereNot('id', field.meta.userId)
      }
    }).optional(),
    password: vine.string().minLength(8).optional(),
    companyName: vine.string().optional(),
    passwordConfirmation: vine.string().sameAs('password').optional(),
    urls: vine.array(
      vine.object({
        id: vine.number().optional(),
        url: vine.string().url(),
      })
    ).optional()
  })
)