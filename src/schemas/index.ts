import * as z from "zod"

export const ContactSchema = z.object({
     name: z.string().min(2,"Անունը և ազգանունը շատ կարճ է").max(100,"Անունը և ազգանունը շատ երկար է").trim(),
     email:  z.email("Մուտքագրեք վավերական էլ․ հասցե").max(254, "Էլ․ հասցեն շատ երկար է").trim().transform(email => email.toLowerCase()),
     subject: z.string().min(1,"Մուտքագրեք հաղորդագրության թեմայի անունը").max(100, "Թեման շատ երկար է").trim(),
     message: z.string().min(5, "Հաղորդագրությունը պետք է լինի առնվազն 5 տառ").max(500,"Հաղորդագրությունը շատ երկար է").trim()
})

export const WordGuesserSchema = z.object({
     guess: z.string().min(1,"Այն շատ կարճ է").max(150,"Այն շատ երկար է").trim()
})

export const NumberGuesserSchema = z.object({
     guess: z.string()
     .regex(/^\d+$/, "Պետք է պարունակի միայն թվեր")
     .min(1,"Այն շատ կարճ է").max(150,"Այն շատ երկար է").trim()
     .refine(val=>!Number.isInteger(val),"Այն պետք է լինի ամբողջ թիվ")
})

export const InteractiveMathSchema = z.object({
  type: z.enum(["number", "text"]),
  answer: z.string().trim().min(1, "Խնդրում ենք լրացնել պատասխանը"),
})
.refine((data) => {
     if (data.type === "number") {
          const value = data.answer.trim();
          const asNumber = Number(value);
          return !isNaN(asNumber) && !value.includes(" ");
     }
     return true;
}, {
     message: "Խնդրում ենք գրել ցանկացած թիվ որպես պատասխան",
     path: ["answer"],
})
.refine((data) => {
     if (data.type === "text") {
          return /^[+\-*/]$/.test(data.answer.trim());
     }
     return true;
}, {
     message: "Խնդրում ենք գրել ցանկացած օպերատոր որպես պատասխան",
     path: ["answer"],
});