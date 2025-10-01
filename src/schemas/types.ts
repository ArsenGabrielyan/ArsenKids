import * as z from "zod"
import { ContactSchema } from "."

export type ContactType = z.infer<typeof ContactSchema>