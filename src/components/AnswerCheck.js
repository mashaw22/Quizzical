import React from "react"

export default function AnswerCheck(props) {
    return (
        <div className="check-answers-section">
            {props.gameOver && <p className="check-answers-text">You scored {props.score}/5 correct answers</p>}
            <button className="check-answers__btn" onClick={props.handleClick}>{props.buttonText}</button>
    </div>
    )
}