import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal('')),
  message: z.string().min(1).max(200),
  captcha: z.string().min(10)
})
export type ContactDTO = z.infer<typeof ContactSchema>
