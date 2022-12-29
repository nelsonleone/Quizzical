import { useEffect } from 'react';
import { useState } from 'react';
import IntroPage from './IntroPage'
import UserQuizChoice from './UserQuizChoice';
import Trivia from './Trivia';
import {nanoid} from 'nanoid'
import LoadingIcons from 'react-loading-icons';



function App() {
  const [trivia,setTrivia] = useState(null)
  const [removeForm,setRemoveForm] =  useState(true)
  const [isStarted,setIsStarted] = useState(false)
  const [isRendered,setIsRendered] = useState(false)
  const [loading,setLoading] = useState(false)
  const [gotError,setGotError] = useState(false)
  const [shownAnswers,setShownAnswers] = useState(false)
  const [score,setScore] = useState(0)
  const [isEnded,setIsEnded] = useState(false)
  const [formData,setFormData] = useState({})


  let API_error = <div className='error-message'>
  <p>Sorry Network Error, Please Try Again</p>
  <button className='try-again' onClick={handleTryAgain}>TRY AGAIN</button>
</div>

// setting the user input
  const difficulty = formData.difficulty !== "" ? formData.difficulty : "medium";
  const category = formData.category !== "" ? parseFloat(formData.category) : "";
  const URL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

  useEffect(() => {
   fetch(URL)
     .then(resp => {
      if(!resp.ok){
        setGotError(true)
      }else{
        return resp.json()
      }
     })
     .then(data => {
      if(data.response_code <=  0){
        setLoading(false)
        setRemoveForm(true)

        setTrivia(data.results.map(values =>  {
          return {
            question: values.question,
            answers:values.incorrect_answers.concat(values.correct_answer).sort(()=> 0.5 - Math.random()),
            correctAnswer: values.correct_answer,
            selectedAnswer:"",
            id:Math.random()
          }
        }))
      }
      })
  },[isRendered])
  
  function handleRestart(){
    setIsStarted(false)
    setIsRendered(false)
    setRemoveForm(true)
    setIsEnded(false)
    setScore(0)
    setShownAnswers(false)
    setTrivia(null)
  }

  function handleShowAnswers(){
    const check = trivia.every(trivia => {
      return trivia.selectedAnswer !== ""  
    })

    if(check){
      setShownAnswers(true)
      setIsEnded(true)
    }else{
      alert('Please finish  all question')
    }
  }


  // setting the chosen answer to the selectedAnswer object value
  function getChosenObj(ID,answer){
    setTrivia(prevData =>  {
      return prevData.map(data => {
        return data.id === ID ?
        {...data,selectedAnswer:answer}
        :
        data
      })
    })

    trivia.filter(trivia => {
      return trivia.correctAnswer === answer
      ?
      setScore(score + 1)
      :
      score
    })
  }

  // getting the Trivia Data
  let triviaElements;
  if(trivia !== null){
    triviaElements = trivia.map((value,index) => {
      return(
        <Trivia
          question={value.question}
          correctAnswer={value.correctAnswer}
          answers={value.answers}
          selectedAnswer={value.selectedAnswer}
          getChosenObj={getChosenObj}
          showAnswers={shownAnswers}
          key={index}
          id={value.id}
        />
      )
    })
  }


 function handleTryAgain(){
  setLoading(false)
  setIsStarted(false)
  setGotError(false)
 }

// handling Element display
  function startQuiz(){
    setLoading(true)
    setRemoveForm(false)
    setTimeout(() => {
      setIsStarted(true)
      setLoading(false)
    }, 1000);
  }



  // components conditional render
  let userQuizChoiceRender = "";
  if(!removeForm && isStarted && !loading){
    userQuizChoiceRender = <UserQuizChoice
      // changing state  from child component
      handleRender={value => setIsRendered(value)}
      loading={value => setLoading(value)}
      formData={value => setFormData(value)}
    />
  }


  const  mainContent = <main>
      {isRendered
       ? <div>
          {triviaElements}
          {isEnded ? <p className='score'>You Scored {score} / {trivia.length}</p> : ""}
          <button 
            className="check-result" 
            onClick={isEnded ? handleRestart : handleShowAnswers}>
            {isEnded ? "Restart" : "Check answers"}
          </button>
          </div>
       : ""
      }

      {!isStarted ?  <IntroPage handleClick={startQuiz}/> : "" }
      {userQuizChoiceRender}
      {loading ?
        <LoadingIcons.ThreeDots fill='#293264'   className='loading'/>
        : ""
      }
    </main>


  return (
    <>
    {!gotError ? mainContent : API_error}
    </>
  )
}

export default App




