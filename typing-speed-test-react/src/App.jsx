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

  const[wrongTyped, setWrongTyped] = React.useState(0)

  
  const [isGameOver, setIsGameOver] = React.useState(false)
  
  const bestWPMRef = React.useRef(localStorage.getItem("bestWPM"))
  

  const { seconds, minutes, hours, isRunning, 
    start, pause, resume, restart, } = 
    useTimer({ expiryTimestamp, autoStart: false, onExpire: () => 
      console.log("Countdown finished!"), })
  
      const { seconds: swSeconds, minutes: swMinutes, 
        hours: swHours, isRunning: swRunning, start: swStart, 
        pause: swPause, reset: swReset, } = 
        useStopwatch({ autoStart: false });


  function calculateWPM(){
    const wordsTyped = (pressedKey.length)/5
    let elapsedSeconds = 0
    
    if (mode=="countdown") {
      elapsedSeconds = 60-seconds
    }
    if(mode=="stopwatch") {
      elapsedSeconds= swMinutes*60 + swSeconds
    }

    if (elapsedSeconds <= 0) return 0

    let newWPM = Math.round((wordsTyped/elapsedSeconds)*60)

    return newWPM

  }

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

  React.useEffect(()=> {
    if( pressedKey.length >= text.length && text.length > 0){
      pause()
      swPause()
      setIsGameOver(true)
    }

    if(seconds==0 && mode=="countdown"){
      pause()
      setIsGameOver(true)
    }

  }, [pressedKey.length, text.length, seconds])
    
  React.useEffect(()=> {
    if (isGameOver){
      const finalWPM = calculateWPM()
      const currentBest = Number(localStorage.getItem("bestWPM"))

      if(finalWPM>currentBest){
        localStorage.setItem("bestWPM", finalWPM)
        bestWPMRef.current = finalWPM
      }
    }
  }, [isGameOver])
  
 

  React.useEffect(() => {
    setText(getRandomText(difficulty))
    setPressedKey([])
    
  }, [difficulty])

  React.useEffect(() => {
    function handleKeyDown(event){

      if (event.key.length !== 1) return

      console.log("you pressed!", event.key)

      setPressedKey(prevKey => {
        const currentIndex = prevKey.length

        if(text[currentIndex]!=event.key){
          setWrongTyped(prev => prev+1)
        }

        return [...prevKey, event.key]
      })

      
    }

    document.addEventListener("keydown", handleKeyDown)

    

    return () =>{
      document.removeEventListener("keydown", handleKeyDown)
    }

  }, [text, showButton])

  const textElements = text.map((letter, index) => <span key={index} 
    className={clsx("first",
      index+1 <= pressedKey.length && pressedKey[index]==letter && "correct",
      index+1 <= pressedKey.length && pressedKey[index]!=letter  && "wrong"
    )}>{letter}</span>
  )

   
  

  let accuracy = text.length > 0 ? 
  Math.round(((text.length-wrongTyped)/text.length)*100) : 100

  console.log(wrongTyped)
  
 console.log(text)

  return(
    <>
       <header>
         <section id="top-header">
             <img src="src/images/logo-large.svg" />

             <div id="personal-best">
                <img src="src/images/icon-personal-best.svg" />
                <h3>Personal Best: {localStorage.getItem("bestWPM")}</h3>
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
          calculateWPM={calculateWPM}
          accuracy={accuracy}
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
      

      {/*  filter: blur(5px); */}
    </>
  )
}

export default App