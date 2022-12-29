import React, { useEffect, useState } from "react";
import he from 'he';


export  default function Trivia(props){
 
   const answerElements = props.answers.map((value,index) => {
      return(
         <button
           onClick={() => props.getChosenObj(props.id,value)}
           key={index}
           disabled={props.showAnswers ? true : ""}
           className={`
               ${props.selectedAnswer === value ? "isSelected" : ""}
               ${props.showAnswers && value !== props.correctAnswer ? "notSelected" : ""}
               ${props.correctAnswer === value  && props.showAnswers  ? "isCorrect" : ""}
               ${props.showAnswers && props.selectedAnswer === value && value !== props.correctAnswer ? "isWrong" : ""}
            `}
         >
            {he.decode(value)}
         </button>
      )
   })

   return(
      <div className="question__answer">
         <h2>{he.decode(props.question)}</h2>
         <div className="answers">
            {answerElements}
         </div>
      </div>
   )
}
