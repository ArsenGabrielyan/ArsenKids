"use server"
import { getContactSchema } from "@/schemas";
import { ContactType } from "@/schemas/types";

export async function sendMessage(values: ContactType, t: (key: string) => string): Promise<{
     success?: `messages.${string}`,
     error?: `messages.${string}`
}>{
     const validatedFields = getContactSchema(t).safeParse(values);
     if(!validatedFields.success)
          return { error: "messages.invalidFields" }
     const res = await fetch("https://formspree.io/f/myybakel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedFields.data),
     });
     return res.ok ? { success: "messages.success" } : { error: "messages.sendError" }
}