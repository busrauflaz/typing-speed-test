import React from "react"
import clsx from "clsx"

function Header(props){
  const [active, setActive] = React.useState("")

    return(
        <>
          <section id="game-info">
            <div id="header-bottom-left">
              <p>WPM:</p>
              <p className="accuracy">{props.calculateWPM()}</p>

              <p>Accuracy:</p> <p className={clsx(
                "accuracy",
                !props.showButton && props.accuracy==100 && "green",
                !props.showButton && props.accuracy!=100 && "red"
              )}> %{props.accuracy}</p>

              <p>Time: </p> <p className={clsx(
                "accuracy",
                props.mode == "countdown" && props.countdown.minutes!=1 && props.countdown.seconds>10 && "yellow",
                !props.showButton && props.mode == "countdown" && props.countdown.seconds<=10 && props.countdown.minutes!=1 && "red")}>
                {!props.showButton && props.mode == "countdown" && 
                `${props.countdown.minutes}:${props.countdown.seconds}` }
                
                {!props.showButton && props.mode == "stopwatch" && 
                `${props.stopwatch.minutes}:${props.stopwatch.seconds}` }
                </p>

            </div>

            <div id="header-bottom-right">
                <p>Difficulty:  </p>
                <button id="header-btn" 
                  className={props.difficulty == "easy" ? "active" : undefined}
                  onClick={() => props.setDifficulty("easy")}>Easy</button>

                <button id="header-btn" 
                  className={props.difficulty == "medium" ? "active" : undefined}
                  onClick={() => props.setDifficulty("medium")}>Medium</button>

                <button id="header-btn" 
                  className={props.difficulty == "hard" ? "active" : undefined}
                  onClick={() => props.setDifficulty("hard")}>Hard</button>

                <p id="mode">Mode:  </p>
                <button id="header-btn" 
                className={props.mode == "countdown" ? "active" : undefined}
                onClick={() => props.setMode("countdown")}>Timed(60s)</button>

                <button id="header-btn" 
                  className={props.mode== "stopwatch" ? "active" : undefined}
                  onClick={() => props.setMode("stopwatch")}>Passage</button>
            </div>
          </section>
        </>
    )


}

export default Header