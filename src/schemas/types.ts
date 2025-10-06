import * as z from "zod"
import { ContactSchema, GuesserSchema } from "."

export type ContactType = z.infer<typeof ContactSchema>
export type GuesserType = z.infer<typeof GuesserSchema>