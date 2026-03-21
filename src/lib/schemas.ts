import { useTranslations } from "next-intl";
import * as z from "zod"

export const getContactSchema = (t: ReturnType<typeof useTranslations>) => z.object({
     name: z.string().min(2,t("name.isShort")).max(100,t("name.isLong")).trim(),
     email:  z.email(t("email.isInvalid")).max(254,t("email.isLong")).trim().transform(email => email.toLowerCase()),
     subject: z.string().min(1,t("subject.required")).max(100, t("subject.isLong")).trim(),
     message: z.string().min(5,t("message.atLeast5Chars")).max(550,t("message.isLong")).trim()
})

export const getWordGuesserSchema = (t: ReturnType<typeof useTranslations>) => z.object({
     guess: z.string().min(1,t("answer.isShort")).max(150,t("answer.isLong")).trim()
})

export const getNumberGuesserSchema = (t: ReturnType<typeof useTranslations>) => z.object({
     guess: z.string()
     .regex(/^\d+$/, t("answer.onlyNumbers"))
     .min(1,t("answer.isShort")).max(150,t("answer.isLong")).trim()
     .refine(val=>!Number.isInteger(val),t("answer.isInt"))
})

export const getInteractiveMathSchema = (t: ReturnType<typeof useTranslations>) => z.object({
  type: z.enum(["number", "text"]),
  answer: z.string().trim().min(1, t("answer.required")),
})
.refine((data) => {
     if (data.type === "number") {
          const value = data.answer.trim();
          const asNumber = Number(value);
          return !isNaN(asNumber) && !value.includes(" ");
     }
     return true;
}, {
     message: t("answer.requiredNum"),
     path: ["answer"],
})
.refine((data) => {
     if (data.type === "text") {
          return /^[+\-*/]$/.test(data.answer.trim());
     }
     return true;
}, {
     message: t("answer.requiredOperator"),
     path: ["answer"],
});