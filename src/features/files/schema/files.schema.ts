import { z } from 'zod'

export const fileSchema = z.object({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  uri: z.string().url(),
  name: z.string().url(),
})

export type FileSchema = z.infer<typeof fileSchema>

export const attachedFileSchema = typeof FileList !== 'undefined'
  ? z.instanceof(FileList).optional()
  : z.undefined();

export type AttachedFileSchema = z.infer<typeof attachedFileSchema>;