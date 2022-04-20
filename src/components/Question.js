import React from "react"

export default function Question(props) {
    return (
        <h2 id={props.id} className="question">{props.question}</h2>
    )
}