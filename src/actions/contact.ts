"use server"
import { getContactSchema } from "@/lib/schemas";
import { ContactType } from "@/lib/types/schemas";
import { getTranslations } from "next-intl/server";

export async function sendMessage(values: ContactType): Promise<{
     success?: string,
     error?: string
}>{
     const t = await getTranslations("validation")
     const validatedFields = getContactSchema(t).safeParse(values);
     if(!validatedFields.success)
          return { error: t("invalidFields") }
     const res = await fetch("https://formspree.io/f/myybakel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedFields.data),
     });
     return res.ok ? { success: t("message.success") } : { error: t("message.sendError") }
}