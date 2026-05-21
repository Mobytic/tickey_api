import vine from '@vinejs/vine'

export const createValidator = vine.create(
  vine.object({
    name: vine.string().trim(),
  })
)