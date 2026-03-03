function Header(props){

    return(
        <>
          <section id="game-info">
            <div id="header-bottom-left">
              <p>VPM:</p>
              <p>Accuracy:</p>
              <p>Time: {props.timeLeft}</p>

            </div>

            <div id="header-bottom-right">
                <p>Difficulty:</p>
                <button onClick={() => props.setDifficulty("easy")}>Easy</button>
                <button onClick={() => props.setDifficulty("medium")}>Medium</button>
                <button onClick={() => props.setDifficulty("hard")}>Hard</button>

                <p id="mode">Mode:</p>
                <button >Timed(60s)</button>
                <button >Passage</button>
            </div>
          </section>
        </>
    )


}

export default Header