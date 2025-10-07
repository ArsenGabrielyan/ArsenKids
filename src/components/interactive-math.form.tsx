"use client"
import { AmazingMathOperator } from "@/lib/types";
import { Input } from "./ui/input";

interface FormProps {renderInput: (type: "number" | "text") => React.JSX.Element, num1?: number, num2?: number, randomOperator?: AmazingMathOperator, solution?: number}
const elements: [React.FC<FormProps>, React.FC<FormProps>, React.FC<FormProps>] = [
     ({solution, num2, randomOperator, renderInput}) => (
          <>
               {renderInput("number")}
               {randomOperator}
               {num2}
               =
               {solution}
          </>
     ),
     ({num1,randomOperator,solution, renderInput}) => (
          <>
               {num1}
               {randomOperator}
               {renderInput("number")}
               =
               {solution}
          </>
     ),
     ({num1,num2,solution, renderInput}) => (
          <>
               {num1}
               {renderInput("text")}
               {num2}
               =
               {solution}
          </>
     )
]
const defaultElem: React.FC<FormProps> = ({randomOperator,num2,num1, renderInput}) => (
     <>
          {num1}
          {randomOperator}
          {num2}
          =
          {renderInput("number")}
     </>
)
interface InteractiveMathFormProps{
     index: number,
     num1: number,
     num2: number,
     operator: AmazingMathOperator | "",
     solution: number,
}
export default function InteractiveMathForm({index, num1, num2, operator, solution}: InteractiveMathFormProps){
     if(operator==="") return null;
     const FormElement = elements[index] ?? defaultElem
     return (
          <form className="bg-gray-800 text-white text-center p-4 text-[23px] sm:text-[30px] lg:text-[40px] rounded-md tracking-widest">
               <FormElement
                    num1={num1}
                    num2={num2}
                    randomOperator={operator}
                    solution={solution}
                    renderInput={(type)=>(
                         <Input
                              type={type}
                              placeholder="?"
                              variant="interactiveMath"
                              autoFocus
                         />
                    )}
               />
          </form>
     )
}