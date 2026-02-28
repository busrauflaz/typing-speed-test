function Header(props){

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
                <button onClick={props.is_Easy()}>Easy</button>
                <button onClick={props.is_Medium()}>Medium</button>
                <button onClick={props.is_Hard()}>Hard</button>

                <p id="mode">Mode:</p>
                <button >Timed(60s)</button>
                <button >Passage</button>
            </div>
          </section>
        </>
    )


}

export default Header