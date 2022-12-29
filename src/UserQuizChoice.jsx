import React, { useEffect, useState } from "react";

export default function UserQuizChoice(props){
   const [formData,setFormData] = useState({
      difficulty:"",
      category:""
   })


   function handleFormData(e){
      const {name,value} = e.target;
      setFormData(prevState => {
         return {
            ...prevState,
            [name]:value
         }
      })
   }


   useEffect(() =>  {
      props.formData(formData)
   },[formData])

// sending data to parent App component 
   function renderQuiz(e){
      e.preventDefault();
      props.loading(true)
      setTimeout(() => {
         props.handleRender(true)
      }, 1000);
   }


// input area for user quiz type options
   return(

      <div className="user-inputSection">
         <h1>Select The Options Which Suits You</h1>
         <form>
            <label htmlFor="category">Trivia Category</label>
            <select
              onChange={handleFormData}
              name="category"
              value={formData.category}
              id="category"
            >
               <option value="">Any Category</option>
               <option value="9">General Knowledge</option>
               <option value="15">Entertainment: Video Games</option>
               <option value="10">Entertainment: Books</option>
               <option value="17">Science And Nature</option>
               <option value="18">Science: Computers</option>
               <option value="19">Science: Mathematics</option>
               <option value="30">Science: Gadgets</option>
               <option value="20">Mythology</option>
               <option value="21">Sports</option>
               <option value="22">Geography</option>
               <option value="23">History</option>
               <option value="24">Politics</option>
               <option value="25">Art</option>
               <option value="27">Animals</option>
               <option value="28">Vehicles</option>
            </select>

            <label htmlFor="difficulty">Select Difficulty</label>
            <select
              onChange={handleFormData}
              name="difficulty"
              id="difficulty"
              value={formData.difficulty}
            >
               <option value="medium">Medium</option>
               <option value="easy">Easy</option>
               <option value="hard">Hard</option>
            </select>
            <button
              className="submit-btn"
              onClick={renderQuiz}
            >
               <pre>Hit Me</pre>
               <img src="/images/emoji.jpg" aria-hidden="true" alt=""/>
            </button>
         </form>
      </div>
   )
}