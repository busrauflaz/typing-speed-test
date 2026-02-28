import React from "react"
import Header from "./Header.jsx"
import data from "./data.json"

function App(){
  let isEasy = false
  let isMedium = false
  let isHard = false

  const [text, setText] = React.useState(() => getRandomText())

  function getRandomText(){
     let random_text = Math.floor(Math.random() * 10)
     if (isEasy){
      return data.easy[random_text].text
     }
     if (isHard){
      return data.hard[random_text].text
     }
     if (isMedium){
      return data.medium[random_text].text
     }

  }

  function is_Easy(){
    isEasy = true
    isMedium = false
    isHard = false
  }

  function is_Medium(){
    isEasy = false
    isMedium = true
    isHard = false
  }

  function is_Hard(){
    isEasy = false
    isMedium = false
    isHard = true
  }

  document.addEventListener("keydown", function(event){
    console.log("you pressed!")

  })

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
         is_Easy = {is_Easy}
         is_Medium = {is_Medium}
         is_Hard = {is_Hard}
         />
      </header>

      

      <p>{text}</p>

      



    </>
  )

  

}

export default App