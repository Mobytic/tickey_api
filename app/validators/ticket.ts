import vine from '@vinejs/vine'

export const createValidator = vine.create(
  vine.object({
    title: vine.string().trim(),
    clientComment: vine.string().minLength(25),
    bugLink: vine.string().trim(),
    teamComment: vine.string().optional(),
    mailComment: vine.string().optional(),
    categoryId: vine.number(),
  })
)

export const updateValidator = vine.create(
  vine.object({
    title: vine.string().trim().optional(),
    clientComment: vine.string().minLength(25).optional(),
    bugLink: vine.string().trim().optional(),
    teamComment: vine.string().optional(),
    mailComment: vine.string().optional(),
    statusId: vine.number().optional(),
    categoryId: vine.number().optional(),
    nametagIds: vine.array(vine.number()).optional()
  })
)
