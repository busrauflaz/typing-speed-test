import React from "react"
import Header from "./Header.jsx"
import data from "./data.json"
import clsx from "clsx"

function App(){
  const [difficulty, setDifficulty] = React.useState("")

  const [text, setText] = React.useState([])

  const [pressedKey, setPressedKey] = React.useState([])

  const [timeLeft, setTimeLeft] = React.useState(60)

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
  

  React.useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);


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
      //  (index+1 == pressedKey.length )&&  
      //  pressedKey[index] == letter ? "correct" : "wrong"
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
         timeLeft={timeLeft}
         />
      </header>

      <div className="text">
        {textElements}
      </div>
      
      
    </>
  )
}

export default App