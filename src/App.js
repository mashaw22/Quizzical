import React from "react"
import yellowBlob from "../src/images/blob-yellow.png"
import blueBlob from "../src/images/blob-blue.png"
// import Start from "./components/Start"
import Question from "./components/Question"
import Answer from "./components/Answer"
import AnswerCheck from "./components/AnswerCheck"
import { nanoid } from "nanoid"

export default function App(){
    const [quiz, setQuiz] = React.useState([])

    function htmlDecode(input) {
        const doc = new DOMParser().parseFromString(input, "text/html")
        return doc.documentElement.textContent
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                const quizData = data.results.map(item => {
                    const answers = [...item.incorrect_answers, item.correct_answer]
                    const answersData = answers.map(answer => {
                        return {
                            answer: htmlDecode(answer),
                            isCorrect: answer === item.correct_answer ? true : false,
                            isSelected: false,
                        }
                    })
                    return {
                        question: htmlDecode(item.question),
                        answers: answersData.sort(() => Math.random() - 0.5),
                        key: nanoid(),
                        id: nanoid()
                    }
                })
                setQuiz(quizData)
            })
    }, [])

    console.log(quiz)

    function checkAnswers() {
        console.log("clicked")
    }

    const questionElements = quiz.map(item => {
        const answerElements = item.answers.map(a => {
                return (
                    <Answer answer={a.answer} isCorrect={a.isCorrect} isSelected={a.isSelected}/>
                )
            })
        
        return (
            <div className="quiz-item">
                <Question key={item.key} id={item.id} question={item.question}/>
                <div className="answer-choices">
                    {answerElements}
                </div>
            </div>
        )
    })

    return (
        <main>
            <img 
                src={blueBlob} 
                alt=""
                className="blue-blob"
            />
            <img 
                src={yellowBlob} 
                alt="" 
                className="yellow-blob"
            />
            {/* <Start /> */}
            {questionElements}
            <AnswerCheck handleClick={checkAnswers}/>
        </main>
    )
}