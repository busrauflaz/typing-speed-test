import React from "react"
import Header from "./Header.jsx"
import data from "./data.json"
import clsx from "clsx"
import { useStopwatch, useTimer } from "react-timer-hook"
import New_Personal_Best from "./New_Personal_Best.jsx"
import Results from "./Results.jsx"
import First_Test from "./First_Test.jsx"

function App(){
  const [difficulty, setDifficulty] = React.useState("")

  const [text, setText] = React.useState([])

  const [pressedKey, setPressedKey] = React.useState([])

  const [mode, setMode] = React.useState("")

  // const expiryTimestamp = new Date(); expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60)

  const [showButton, setShowButton] = React.useState(true)

  const [errorMessage, setErrorMessage] = React.useState("")

  const[wrongTyped, setWrongTyped] = React.useState(0)

  
  const [isGameOver, setIsGameOver] = React.useState(false)
  
  const bestWPMRef = React.useRef(localStorage.getItem("bestWPM"))

  const [finalScore, setFinalScore] = React.useState(0)
  const [isNewRecord, setIsNewRecord] = React.useState(false)

  const [isFirstGame, setIsFirstGame] = React.useState(() => {
    const bestWPM = localStorage.getItem("bestWPM")
    console.log("Initial isFirstGame check:", { bestWPM, isFirstGame: bestWPM === null })
    return bestWPM===null
  })

  const { seconds, minutes, hours, isRunning, 
    start, pause, resume, restart, } = 
    useTimer({ expiryTimestamp : new Date(), autoStart: false, onExpire: () => {
      console.log("Countdown finished!")
       }})
  
      const { seconds: swSeconds, minutes: swMinutes, 
        hours: swHours, isRunning: swRunning, start: swStart, 
        pause: swPause, reset: swReset, } = 
        useStopwatch({ autoStart: false });


  function calculateWPM(){
    if(pressedKey.length === 0) return 0

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

  function getRandomText(selectedDifficulty){
     if (!selectedDifficulty || !data[selectedDifficulty] ) return[]

     let index = Math.floor(Math.random()*10)

     const textString = data[selectedDifficulty][index].text;
     return textString.split("");


     /*
     let index = Math.floor(Math.random() * 10)
     let random_text = []

     {selectedDifficulty == "easy" && (
      random_text =  data.easy[index].text.split(""))
     }
     {selectedDifficulty == "medium" && (
      random_text =  data.medium[index].text.split(""))
     }
     { selectedDifficulty == "hard" && (
      random_text = data.hard[index].text.split(""))
     }

     return random_text
     */
  }

  function restartGame(){
    pause()
    swPause()
    swReset(undefined, false)

    setIsGameOver(false)
    setIsNewRecord(false)
    setShowButton(true)
    setIsFirstGame(false)

    setDifficulty("")
    setMode("")
    setPressedKey([])
    setWrongTyped(0)
    setFinalScore(0)
    setText([])
    setErrorMessage("")
    

    const newTime = new Date()
    newTime.setSeconds(newTime.getSeconds() + 60)
    restart(newTime, false)
  }
  
  function startGame(){
    /* if(difficulty!="" && mode!=""){ */
    if (difficulty && mode){
      console.log("Game starting with:", { difficulty, mode })

      setPressedKey([])
      setWrongTyped(0)
      
      setShowButton(false)
      
      setErrorMessage("")
      // const randomText = getRandomText(difficulty)
      // setText(randomText)

      if(mode=="countdown"){
        const time = new Date()
        time.setSeconds(time.getSeconds() + 60)
        restart(time, true)

      }
      if(mode=="stopwatch"){
        swReset()
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
  if(text.length > 0 && !showButton && mode === "stopwatch"){
    
  }
  }, [text.length, showButton, mode])

  React.useEffect(()=> {
    console.log("Effect triggered:", {
    isGameOver,
    textLength: text.length,
    showButton,
    pressedKeyLength: pressedKey.length,
    seconds,
    mode,
    isRunning,
    swRunning
    })

    if(isGameOver || text.length==0 || showButton) return

    if( pressedKey.length >= text.length && text.length > 0){
      pause()
      swPause()
      setIsGameOver(true)
      return
    }

    if(seconds===0 && mode==="countdown" && !isRunning){
      pause()
      setIsGameOver(true)
      return
    }

  }, [pressedKey.length, text.length, seconds, isGameOver, mode, showButton, isRunning])
    
  React.useEffect(()=> {
    if (isGameOver){
      const wpm = calculateWPM()
      const currentBest = Number(localStorage.getItem("bestWPM"))
      setFinalScore(wpm)

      if(wpm>currentBest){
        localStorage.setItem("bestWPM", wpm)
        bestWPMRef.current = wpm
        setIsNewRecord(true)
      }
      
    }

  }, [isGameOver])

  React.useEffect(() => {
    if (isGameOver && !isFirstGame){return}

    if (isGameOver && isFirstGame) {
      const timer = setTimeout(() => {
      //setIsFirstGame(false)
      }, 100)
    return () => clearTimeout(timer)
  }
}, [isGameOver, isFirstGame])
  
  
 

  React.useEffect(() => {
    if(difficulty){
      setText(getRandomText(difficulty))
      setPressedKey([])
    }

  }, [difficulty])  

  React.useEffect(() => {
    function handleKeyDown(event){

      if (event.key.length !== 1) return
      if(showButton || isGameOver) return

      console.log("you pressed!", event.key)

      setPressedKey(prevKey => {
        if (prevKey.length >= text.length) return prevKey

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

  }, [text.length, showButton, isGameOver])

  const textElements =  text.map((letter, index) => <span key={index} 
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
      {console.log("Render check:", { 
      isGameOver, 
      showButton, 
      isFirstGame,
      shouldShowFirst: isGameOver && !showButton && isFirstGame,
      shouldShowNew: isGameOver && isNewRecord && !isFirstGame,
      shouldShowResults: isGameOver && !isNewRecord && !showButton && !isFirstGame
    })}
       <header>
         <section id="top-header">
             <img src="src/images/logo-large.svg" />

             <div id="personal-best">
                <img src="src/images/icon-personal-best.svg" />
                <h3>Personal Best: {localStorage.getItem("bestWPM")} WPM</h3>
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
          restartGame={restartGame}
         />
      </header>

      {isGameOver && !isFirstGame && isNewRecord &&
        <New_Personal_Best 
          finalScore ={finalScore}
          accuracy={accuracy}
          wrongTyped={wrongTyped}
          text={text}
          restartGame={restartGame}
        />}

       {isGameOver &&  !isFirstGame && !isNewRecord && !showButton && 
        <Results
          finalScore ={finalScore}
          accuracy={accuracy}
          wrongTyped={wrongTyped}
          text={text}
          restartGame={restartGame}
        />}

        {isGameOver && isFirstGame && !showButton && <First_Test 
          finalScore ={finalScore}
          accuracy={accuracy}
          wrongTyped={wrongTyped}
          text={text}
          restartGame={restartGame}
        />}

      {!isGameOver && <div className={clsx("text",
        showButton && "blur",
        !showButton && ""
      )}>
        {textElements}
      </div>}

      <div id="button">
        {showButton && !isGameOver && (<button className="start-btn"
        onClick={startGame}>Start Typing Test</button>)}
        
      </div>
      <p id="error">{errorMessage}</p>
      

      {/*  filter: blur(5px); */}
    </>
  )
}

export default App