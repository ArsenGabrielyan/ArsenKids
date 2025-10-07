import * as z from "zod"
import { ContactSchema, InteractiveMathSchema, NumberGuesserSchema, WordGuesserSchema } from "."

export type ContactType = z.infer<typeof ContactSchema>
export type WordGuesserType = z.infer<typeof WordGuesserSchema>
export type NumberGuesserType = z.infer<typeof NumberGuesserSchema>
export type InteractiveMathType = z.infer<typeof InteractiveMathSchema>