import React from "react"

export default function AnswerCheck(props) {
    return (
        <div className="check-answers-section">
            <p className="check-answers-text">You scored 3/5 correct answers</p>
            <button className="check-answers__btn" onClick={props.handleClick}>Check Answers</button>
    </div>
    )
}