import * as z from "zod"
import { getContactSchema, getInteractiveMathSchema, getNumberGuesserSchema, getWordGuesserSchema } from "."

export type ContactType = z.infer<
     Awaited<ReturnType<typeof getContactSchema>>
>
export type WordGuesserType = z.infer<
     Awaited<ReturnType<typeof getWordGuesserSchema>>
>
export type NumberGuesserType = z.infer<
     Awaited<ReturnType<typeof getNumberGuesserSchema>>
>
export type InteractiveMathType = z.infer<
     Awaited<ReturnType<typeof getInteractiveMathSchema>>
>