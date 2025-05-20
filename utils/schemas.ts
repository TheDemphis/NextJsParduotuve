import { z, ZodSchema } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Turi būti įrašytos minimaliai 3 raidės' }),
  description: z.string().refine(
    (description) => {
      const words = description.split('').length
      return words >= 10 && words <= 1000
    },
    {
      message: 'Turi būti įrašyti minimaliai 5 žodžiai',
    }
  ),
  company: z.string(),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: 'Minimalus skaičius yra 0  ' }),
  featured: z.coerce.boolean(),
})
const imageValidation = () => {
  const imageSize = 1024 * 1024
  const imageType = ['image/']

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= imageSize
    }, 'Failo dydis turi būti iki 1 MB')
    .refine((file) => {
      return !file || imageType.some((type) => file.type.startsWith(type))
    }, 'Priimamos tik nuotraukos')
}
export const imageSchema = z.object({
  image: imageValidation(),
})

export function zodCreateSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const err = result.error.errors.map((error) => error.message)
    throw new Error(err.join(' , '))
  }
  return result.data
}

export const reviewsSchema = z.object({
  productId: z.string().refine((value) => value !== '', {
    message: 'Negali būti tuščia',
  }),
  authorName: z.string().refine((value) => value !== '', {
    message: 'Vardas privalomas',
  }),
  authorImageUrl: z.string().refine((value) => value !== '', {
    message: 'Nuotraukos url privalomas',
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: 'Minimalus įvertinimas 1' })
    .max(5, { message: 'Maksimalus įvertinimas 5' }),
  comment: z
    .string()
    .min(8, { message: 'Privalo būti bent 8 žodžiai' })
    .max(2000, { message: 'Maksimaliai gali būti 200 žodžių' }),
})
