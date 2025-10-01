import * as z from "zod"

export const ContactSchema = z.object({
     name: z.string().min(2,"Անունը և ազգանունը շատ կարճ է").max(100,"Անունը և ազգանունը շատ երկար է").trim(),
     email:  z.email("Մուտքագրեք վավերական էլ․ հասցե").max(254, "Էլ․ հասցեն շատ երկար է").trim().transform(email => email.toLowerCase()),
     subject: z.string().min(1,"Մուտքագրեք հաղորդագրության թեմայի անունը").max(100, "Թեման շատ երկար է").trim(),
     message: z.string().min(5, "Հաղորդագրությունը պետք է լինի առնվազն 5 տառ").max(500,"Հաղորդագրությունը շատ երկար է").trim()
})