import Confetti from "react-confetti"
import clsx from "clsx"

function New_Personal_Best(props){

    return(
        <section id="high-score">
          <Confetti />
          <img src="/src/images/icon-new-pb.svg" />
          <h1>High Score Smashed!</h1>
          <p style={{fontStyle: "italic", fontSize:"1.1em"}}>You are getting faster. That was incredible typing.</p>

          <div id="sep-boxes">
            <div className="three-box">
              <p>WPM:</p>
              <p className="accuracy"> {props.finalScore}</p>
            </div>
            
            <div className="three-box">
              <p>Accuracy:</p>
              <p className={clsx(
                "accuracy",
                 props.accuracy==100 && "green",
                 props.accuracy!=100 && "red"
              )}> % {props.accuracy}</p>
            </div>
            
            <div className="three-box">
              <p>Characters:</p>

              <div id="characters">
                <p className="green"> {props.text.length}/</p>
                <p className="red">{props.wrongTyped}</p>
              </div>
              
            </div>
            
           </div>
          
          <div className="button-container">
            <button onClick={props.restartGame} id="new-btn">Beat This Score
              <img id="btn-img" 
                style={{filter: "brightness(0)"}} 
                src="src/images/icon-restart.svg" />
           </button>

          </div>
           

           

           <img src="/src/images/pattern-confetti.svg" />
        </section>
        
    )
}



export default New_Personal_Best






