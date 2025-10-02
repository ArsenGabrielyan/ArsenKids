import { AmazingMathOperator } from "../types";

export function mathShuffle<T>(arr: T[]){
     for(let i=arr.length-1;i>0;i--){
          const rand = Math.floor(Math.random()*(i+1));
          [arr[i], [arr[rand]]] = [arr[rand], [arr[i]]];
     }
     return arr;
}
export const randomValue = (min: number,max: number) => Math.floor(Math.random()*(max-min))+min;
export const getSolution = (num1: number,num2: number,operator: AmazingMathOperator) => {
     switch(operator){
          case "+": return num1+num2;
          case "-": return num1-num2;
          case "*": return num1*num2;
     }
}
export const generateEquation = (mode: string) => {
     const q1=Math.floor(Math.random()*17);
     const q2=Math.floor(Math.random()*17);
     const d1=Math.floor(Math.random()*17);
     const d2=Math.floor(Math.random()*17);
     let answer: number;
     switch(mode){
          case "Հանում":
               answer = q1-q2;
               break;
          case "Բազմապատկում":
               answer = q1*q2;
               break;
          case "Բաժանում":
               answer = q1>q2 ? q1/q2 : q2/q1;
               answer = !isFinite(answer) || isNaN(answer) ? NaN : answer;
               break;
          default:
               answer = q1+q2;
     }
     const answers = mathShuffle([answer,d1,d2]);
     return {q1,q2,answers};
}
export const checkAnswer = (mode: string, q1: number, q2: number, selected: number) => {
     let correctAnswer: number;
     switch(mode){
          case "Հանում":
               correctAnswer = q1-q2;
               break;
          case "Բազմապատկում":
               correctAnswer = q1*q2;
               break;
          case "Բաժանում":
               correctAnswer = q1>q2 ? q1/q2 : q2/q1;
               correctAnswer = !isFinite(correctAnswer) || isNaN(correctAnswer) ? NaN : correctAnswer;
               break;
          default:
               correctAnswer = q1+q2;
     };
     return isNaN(correctAnswer) ? isNaN(selected) : correctAnswer===selected;
}