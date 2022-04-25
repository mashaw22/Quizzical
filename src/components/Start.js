import React from "react"

export default function Start(props) {    
    return (
        <div className={props.isShown ? "start-overlay" : "start-overlay--hidden"}>
            <h1 className="start__title">Quizzical</h1>
            <p className="start__text">Ready to question your knowledge? <br/> Click the button to start a new game</p>
            <button className="start__btn" onClick={props.hideOverlay}>Start quiz</button>
        </div>
    )
}