"use client"
import { getBackgroundImage } from "@/lib/helpers";
import SiteSection from "../ui/site-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage
} from "@/components/shadcn-ui/form"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ContactType } from "@/schemas/types";
import { getContactSchema } from "@/schemas";
import { toast } from "sonner";
import { useTransition } from "react";
import { sendMessage } from "@/actions/contact";
import { Spinner } from "../shadcn-ui/spinner";
import { useTranslations } from "next-intl";

export default function ContactSection(){
     const [isPending, startTransition] = useTransition();
     const t = useTranslations("contact");
     const validationMessages = useTranslations("validation")
     const form = useForm<ContactType>({
          resolver: zodResolver(getContactSchema(validationMessages)),
          defaultValues: {
               name: "",
               email: "",
               subject: "",
               message: ""
          }
     })
     const onSubmit = async(values: ContactType) => {
          startTransition(async()=>{
               try{
                    const response = await sendMessage(values,validationMessages);
                    if(response.success)
                         toast.success(t(response.success))
                    if(response.error)
                         toast.error(t(response.error))
               } catch (err: unknown) {
                    console.error(err);
                    toast.error(t("messages.error"))
               }
          })
     }
     const bgStyle = getBackgroundImage("contact");
     const buttonText = useTranslations("buttons")
     return (
          <SiteSection id="contact" style={bgStyle}>
               <div className="relative w-full flex items-center justify-center flex-col">
                    <h2 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mb-4 border-b border-blue-700 w-fit text-center">{t("title")}</h2>
                    <div className="self-start p-8 lg:p-10 bg-card text-card-foreground rounded-md shadow-sm border w-full max-w-lg">
                         <h3 className="text-xl font-medium mb-5">{t("form.title")}</h3>
                         <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 font-heading">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                             control={form.control}
                                             name="name"
                                             render={({field})=>(
                                                  <FormItem>
                                                       <FormLabel>{t("form.nameInput.title")}</FormLabel>
                                                       <FormControl>
                                                            <Input
                                                                 {...field}
                                                                 placeholder={t("form.nameInput.placeholder")}
                                                                 disabled={isPending}
                                                            />
                                                       </FormControl>
                                                       <FormMessage/>
                                                  </FormItem>
                                             )}
                                        />
                                        <FormField
                                             control={form.control}
                                             name="email"
                                             render={({field})=>(
                                                  <FormItem>
                                                       <FormLabel>{t("form.emailInput.title")}</FormLabel>
                                                       <FormControl>
                                                            <Input
                                                                 {...field}
                                                                 type="email"
                                                                 placeholder={t("form.emailInput.placeholder")}
                                                                 disabled={isPending}
                                                            />
                                                       </FormControl>
                                                       <FormMessage/>
                                                  </FormItem>
                                             )}
                                        />
                                   </div>
                                   <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormLabel>{t("form.subjectInput.title")}</FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            {...field}
                                                            placeholder={t("form.subjectInput.placeholder")}
                                                            disabled={isPending}
                                                       />
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                                   <FormField
                                        control={form.control}
                                        name="message"
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormLabel>{t("form.messageInput.title")}</FormLabel>
                                                  <FormControl>
                                                       <Textarea
                                                            {...field}
                                                            placeholder={t("form.messageInput.placeholder")}
                                                            rows={5}
                                                            disabled={isPending}
                                                       />
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                                   <Button type="submit" variant="defaultAlt" disabled={isPending}>
                                        {isPending && <Spinner/>}
                                        {buttonText(`send.${isPending ? "loading" : "original"}`)}
                                   </Button>
                              </form>
                         </Form>
                    </div>
               </div>
          </SiteSection>
     )
}