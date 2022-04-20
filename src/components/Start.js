import React from "react"

export default function Start() {
    return (
        <div className="start-overlay">
            <h1 className="start__title">Quizzical</h1>
            <p className="start__text">Ready to question your knowledge? <br/> Click the button to start a new game</p>
            <button className="start__btn">Start quiz</button>
        </div>
    )
}