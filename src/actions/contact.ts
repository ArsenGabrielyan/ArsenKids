"use server"
import { ContactType } from "@/schemas/types";
import { ZodSafeParseResult } from "zod";

export async function sendMessage(validatedFields: ZodSafeParseResult<ContactType>): Promise<{
     success?: "message.success",
     error?: "invalidFields" | "message.sendError"
}>{
     if(!validatedFields.success)
          return { error: "invalidFields" }
     const res = await fetch("https://formspree.io/f/myybakel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedFields.data),
     });
     return res.ok ? { success: "message.success" } : { error: "message.sendError" }
}