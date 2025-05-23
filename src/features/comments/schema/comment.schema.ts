import z from 'zod'

export const commentSchema = z.object({
  id: z.string().uuid().optional(),
  content: z.string().min(1),
  parentCommentId: z.string().uuid().optional(),
})

export type CommentSchema = z.infer<typeof commentSchema>
