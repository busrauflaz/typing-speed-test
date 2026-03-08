import Confetti from "react-confetti"
import clsx from "clsx"

function Results(props){

    return(
        <section id="high-score">
        
          <img src="/src/images/icon-completed.svg" />
          <h1>Test Complete!</h1>
          <p style={{fontStyle: "italic", fontSize:"1.1em"}}>Solid run. Keep pushing to beat your high score.</p>

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
            <button onClick={props.restartGame}id="new-btn">Go Again
              <img id="btn-img" 
                style={{filter: "brightness(0)"}} 
                src="src/images/icon-restart.svg" />
           </button>

          </div>
           
        </section>
        
    )
}



export default Results






