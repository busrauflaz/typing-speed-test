function Header(){

    return(
        <>
          <section id="game-info">
            <div id="header-bottom-left">
              <p>VPM:</p>
              <p>Accuracy:</p>
              <p>Time:</p>

            </div>

            <div id="header-bottom-right">
                <p>Difficulty:</p>
                <button onClick>Easy</button>
                <button>Medium</button>
                <button>Hard</button>

                <p id="mode">Mode:</p>
                <button>Timed(60s)</button>
                <button>Passage</button>
            </div>
          </section>
        </>
    )


}

export default Header