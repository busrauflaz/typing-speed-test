import React from "react"
import Header from "./Header.jsx"
import data from "./data.json"

function App(){

  const [text, setText] = React.useState(() => getRandomText())

  function getRandomText(){
     let random_text = Math.floor(Math.random() * 10)
     return 

  }

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

         <Header />
      </header>

      

      



    </>
  )

  

}

export default App