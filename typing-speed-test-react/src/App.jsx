import React from "react"
import Header from "./Header.jsx"
import data from "./data.json"

function App(){
  const [difficulty, setDifficulty] = React.useState("")

  const [text, setText] = React.useState([])

  function getRandomText(){
     let index = Math.floor(Math.random() * 10)
     let random_text = []

     {difficulty == "easy" && (
      random_text =  data.easy[index].text.split(""))
     }
     { difficulty == "medium" && (
      random_text =  data.hard[index].text.split(""))
     }
     { difficulty == "hard" && (
      random_text = data.medium[index].text.split(""))
     }

     return random_text
  }

  React.useEffect(() => {
    setText(getRandomText(difficulty))
    
  }, [difficulty])

  React.useEffect(() => {
    function handleKeyDown(){
      console.log("you pressed!")
    }

    document.addEventListener("keydown", handleKeyDown)

    return () =>{
      document.removeEventListener("keydown", handleKeyDown)
    }

  }, [])

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
         />
      </header>

      <p>{text}</p>

      
    </>
  )
}

export default App