import React from "react"
import Header from "./Header.jsx"
import data from "./data.json"
import clsx from "clsx"
import { useStopwatch, useTimer } from "react-timer-hook"

function App(){
  const [difficulty, setDifficulty] = React.useState("")

  const [text, setText] = React.useState([])

  const [pressedKey, setPressedKey] = React.useState([])

  const [mode, setMode] = React.useState("")

  const expiryTimestamp = new Date(); expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60)

  const [showButton, setShowButton] = React.useState(true)

  const [errorMessage, setErrorMessage] = React.useState("")

  let isGameStarted = false

  const { seconds, minutes, hours, isRunning, 
    start, pause, resume, restart, } = 
    useTimer({ expiryTimestamp, autoStart: false, onExpire: () => 
      console.log("Countdown finished!"), })
  
      const { seconds: swSeconds, minutes: swMinutes, 
        hours: swHours, isRunning: swRunning, start: swStart, 
        pause: swPause, reset: swReset, } = 
        useStopwatch({ autoStart: false });

  function getRandomText(){
     let index = Math.floor(Math.random() * 10)
     let random_text = []

     {difficulty == "easy" && (
      random_text =  data.easy[index].text.split(""))
     }
     { difficulty == "medium" && (
      random_text =  data.medium[index].text.split(""))
     }
     { difficulty == "hard" && (
      random_text = data.hard[index].text.split(""))
     }

     return random_text
  }
  
  function startGame(){
    if(difficulty!="" && mode!=""){
      setShowButton(false)
      isGameStarted = true
      setErrorMessage("")

      if(mode=="countdown"){
        start()
      }
      if(mode=="stopwatch"){
        swStart()
      }
    }
    if (difficulty=="" && mode==""){
      setErrorMessage("Please choose a difficulty level and a game mode")
    }
    if (difficulty=="" && !mode==""){
      setErrorMessage("Please choose a difficulty level")
    }
    if (!difficulty=="" && mode==""){
      setErrorMessage ("Please choose a game mode")
    }
  }
 

  React.useEffect(() => {
    setText(getRandomText(difficulty))
    setPressedKey([])
    
  }, [difficulty])

  React.useEffect(() => {
    function handleKeyDown(event){
      console.log("you pressed!", event.key)

      setPressedKey(prevKey => [...prevKey, event.key])
    }

    document.addEventListener("keydown", handleKeyDown)

    return () =>{
      document.removeEventListener("keydown", handleKeyDown)
    }

  }, [])

  const textElements = text.map((letter, index) => <span key={index} 
    className={clsx("first",
      index+1 <= pressedKey.length && pressedKey[index]==letter && "correct",
      index+1 <= pressedKey.length && pressedKey[index]!=letter  && "wrong"
    )}>{letter}</span>
  )
  
 console.log(text)

  return(
    <>
       <header>
         <section id="top-header">
             <img src="src/images/logo-large.svg" />

             <div id="personal-best">
                <img src="src/images/icon-personal-best.svg" />
                <h3>Personal Best: </h3>
             </div>
         </section>

         <Header 
         setDifficulty = {setDifficulty}
         countdown={{ minutes, seconds, start, 
          pause, resume, restart, isRunning }} 
          
         stopwatch={{ minutes: swMinutes, seconds: swSeconds, 
          start: swStart, pause: swPause, reset: swReset, 
          isRunning: swRunning }}

          setMode = {setMode}
          mode = {mode}
          difficulty={difficulty}
          showButton={showButton}
         />
      </header>

      {!showButton && <div className="text">
        {textElements}
      </div>}

      <div id="button">
        {showButton && <button className="start-btn"
        onClick={startGame}>Start Typing Test</button>}
        
      </div>
      <p id="error">{errorMessage}</p>
      

      
    </>
  )
}

export default App