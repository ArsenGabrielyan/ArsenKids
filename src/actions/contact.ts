"use server"
import { ContactSchema } from "@/schemas";
import { ContactType } from "@/schemas/types";

export async function sendMessage(values: ContactType): Promise<{
     success?: string,
     error?: string
}>{
     const validatedFields = ContactSchema.safeParse(values);
     if(!validatedFields.success)
          return { error: "Բոլոր դաշտերը անվավեր են" }
     const res = await fetch("https://formspree.io/f/myybakel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedFields.data),
     });
     return res.ok ? { success: "Հաղորդագրությունը հաջողությամբ ուղարկվեց!" } : { error: "Չհաջողվեց ուղարկել հաղորդագրությունը" }
}