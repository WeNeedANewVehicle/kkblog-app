import { attachedFileSchema } from '@/features/files/schema/files.schema';
import { z } from 'zod'

export const profileSchema = z.object({
    summary: z.string().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
    nickname: z.string(),
    email: z.string(),
    attachedFile: attachedFileSchema
})

export type ProfileSchmea = z.infer<typeof profileSchema>;