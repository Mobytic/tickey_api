import vine from '@vinejs/vine'

export const createValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    clientComment: vine.string().minLength(25),
    bugLink: vine.string().trim(),
    teamComment: vine.string().optional(),
    mailComment: vine.string().optional(),
  })
)
