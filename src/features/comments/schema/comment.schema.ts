import z from 'zod'

export const commentSchema = z.object({
  content: z.string().min(1),
  parentCommentId: z.string().uuid().optional(),
})

export type CommentSchema = z.infer<typeof commentSchema>
