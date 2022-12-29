import React from "react";

export default function IntroPage(props){
   return(
      <section className="introPage">
         <h1>Quizzical</h1>
         <p className="desc">I bet you can't answer up to 90% of the questions Correctly</p>
         <button className="startQuizBtn" onClick={props.handleClick}>Start quiz</button>
      </section>
   )
}