"use client"
import { AmazingMathOperator } from "@/lib/types";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { InteractiveMathType } from "@/schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { InteractiveMathSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./shadcn-ui/form";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface FormProps {renderInput: (type: "number" | "text") => React.JSX.Element, num1?: number, num2?: number, randomOperator?: AmazingMathOperator, solution?: number}
const elements: [React.FC<FormProps>, React.FC<FormProps>, React.FC<FormProps>] = [
     ({solution, num2, randomOperator, renderInput}) => (
          <div className="bg-gray-800 text-white text-center p-4 text-[23px] sm:text-[30px] lg:text-[40px] rounded-md flex items-center gap-3">
               {renderInput("number")}
               <span>{randomOperator}</span>
               <span>{num2}</span>
               =
               <span>{solution}</span>
          </div>
     ),
     ({num1,randomOperator,solution, renderInput}) => (
          <div className="bg-gray-800 text-white text-center p-4 text-[23px] sm:text-[30px] lg:text-[40px] rounded-md flex items-center gap-3">
               <span>{num1}</span>
               <span>{randomOperator}</span>
               {renderInput("number")}
               =
               <span>{solution}</span>
          </div>
     ),
     ({num1,num2,solution, renderInput}) => (
          <div className="bg-gray-800 text-white text-center p-4 text-[23px] sm:text-[30px] lg:text-[40px] rounded-md flex items-center gap-3">
               <span>{num1}</span>
               {renderInput("text")}
               <span>{num2}</span>
               =
               <span>{solution}</span>
          </div>
     )
]
const defaultElem: React.FC<FormProps> = ({randomOperator,num2,num1, renderInput}) => (
     <div className="bg-gray-800 text-white text-center p-4 text-[23px] sm:text-[30px] lg:text-[40px] rounded-md flex items-center gap-3">
          <span>{num1}</span>
          <span>{randomOperator}</span>
          <span>{num2}</span>
          =
          {renderInput("number")}
     </div>
)
interface InteractiveMathFormProps{
     index: number,
     num1: number,
     num2: number,
     operator: AmazingMathOperator | "",
     solution: number,
     onSubmit: (values: InteractiveMathType) => void,
     inputRef?: React.Ref<HTMLInputElement>
}
export default function InteractiveMathForm({index, num1, num2, operator, solution, onSubmit, inputRef}: InteractiveMathFormProps){
     const form = useForm<InteractiveMathType>({
          resolver: zodResolver(InteractiveMathSchema),
          defaultValues: {
               answer: "",
               type: index===2 ? "text" : "number"
          }
     })
     const handleSubmit = (values: InteractiveMathType) => {
          const validatedFields = InteractiveMathSchema.safeParse(values);
          if(!validatedFields.success){
               toast.error("Բոլոր դաշտերը անվավեր են");
               return;
          }
          if(!validatedFields.data) return;
          const fields = validatedFields.data;
          onSubmit(fields);
          form.reset();
     }
     if(operator==="") return null;
     const FormElement = elements[index] ?? defaultElem
     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col items-center gap-2">
                    <FormElement
                         num1={num1}
                         num2={num2}
                         randomOperator={operator}
                         solution={solution}
                         renderInput={(type)=>{
                              form.setValue("type", type);
                              return (
                                   <FormField
                                        control={form.control}
                                        name="answer"
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormControl>
                                                       <Input
                                                            {...field}
                                                            ref={inputRef}
                                                            type={type}
                                                            placeholder="?"
                                                            variant="interactiveMath"
                                                            autoFocus
                                                       />
                                                  </FormControl>
                                                  <FormMessage toastMessage/>
                                             </FormItem>
                                        )}
                                   />
                              )
                         }}
                    />
                    <Button className="w-full" type="submit" variant="tertiary">Ստուգել</Button>
               </form>
          </Form>
     )
}