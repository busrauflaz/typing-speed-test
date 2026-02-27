import React from "react"
import Header from "./Header.jsx"

function App(){

  return(
    <>
      <section id="top-header">
          <img src="src/images/logo-large.svg" />

          <div id="personal-best">
             <img src="src/images/icon-personal-best.svg" />
             <h3>Personal Best: </h3>
          </div>
      </section>

      <Header />
    </>
  )

  

}

export default App