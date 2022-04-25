import React from "react"

export default function Answer(props) {
    let className = ""
    
    if (!props.checkingAnswers) {
        if(props.isSelected){
            className = "answer__btn selected"
        } else {
            className = "answer__btn"
        }
    } else {
        if (props.isSelected && props.isCorrect) {
            className = "answer__btn correct"
        } else if (props.isSelected && !props.isCorrect) {
            className = "answer__btn after-finished incorrect"
        } else if (!props.isSelected && props.isCorrect) {
            className = "answer__btn correct"
        } else if (!props.isSelected) {
            className = "answer__btn after-finished"
        }
    }

    return (
        <button type="button" value={props.answer} className={className} onClick={props.selectAnswer}>{props.answer}</button>
    )
}