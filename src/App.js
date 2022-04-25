import React from "react"
import yellowBlob from "../src/images/blob-yellow.png"
import blueBlob from "../src/images/blob-blue.png"
import Start from "./components/Start"
import Question from "./components/Question"
import Answer from "./components/Answer"
import AnswerCheck from "./components/AnswerCheck"
import { nanoid } from "nanoid"

export default function App(){
    const [quiz, setQuiz] = React.useState([])
    const [overlay, setOverlay] = React.useState(true)
    const [reset, setReset] = React.useState(false)
    const [gameOver, setGameOver] = React.useState(false)
    const [buttonText, setButtonText] = React.useState("Check Answers")
    const [checkingAnswers, setCheckingAnswers] = React.useState(false)
    const [score, setScore] = React.useState(0)

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
                    const correctAnswer = htmlDecode(item.correct_answer)
                    const answersData = answers.map(answer => {
                        return {
                            answer: htmlDecode(answer),
                            isCorrect: answer === item.correct_answer ? true : false,
                            isSelected: false,
                            key: nanoid(),
                            id: nanoid(),
                        }
                    })
                    return {
                        question: htmlDecode(item.question),
                        answers: answersData.sort(() => Math.random() - 0.5),
                        key: nanoid(),
                        id: nanoid(),
                        correct_Answer: correctAnswer,
                        selected_Answer: "",
                        userIsCorrect: false
                    }
                })
                setQuiz(quizData)
            })
    }, [reset])

    function hideOverlay(){
        setOverlay(false)
    }
    
    function calculateScore(){
        let currentScore = 0
        setQuiz(prevQuiz => prevQuiz.map(item =>{
            if(item.selected_Answer === item.correct_Answer){
                setScore(currentScore += 1)
                return {
                    ...item,
                    userIsCorrect: true
                }
            } else {
                return item
            }
        }))
    }   

    function checkAnswers() {
        if (!gameOver) {
            setCheckingAnswers(true)
            setButtonText("New Game")
            setGameOver(true)
            calculateScore()
        } else {
            setCheckingAnswers(false)
            setButtonText("Check Answers")
            setGameOver(false)
            setReset(prevReset => !prevReset)
            setScore(0)
        }
    }
    
    function selectAnswer(event) {
        const {textContent} = event.target
        const {id} = event.target.parentNode
        setQuiz(prevQuiz => prevQuiz.map(item => {
            if(id === item.id) {
                const newAnswerChoices = item.answers.map(a => {
                    return a.answer === textContent ?
                        {...a, isSelected: true} :
                        {...a, isSelected: false}
                }) 
                return {
                    ...item, 
                    answers: newAnswerChoices, 
                    selected_Answer: textContent
                }
            } else {
                return item
            }
        }
        )) 
    } 

    const questionElements = quiz.map(item => {
        const answerElements = item.answers.map(a => {
            return (
                <Answer answer={a.answer} isCorrect={a.isCorrect} isSelected={a.isSelected} key={a.key} id={a.id} gameOver={gameOver} selectAnswer={selectAnswer} checkingAnswers={checkingAnswers}/>
            )
        })
        
        return (
            <div className="quiz-item" id={item.id}>
                <Question answerData={item.answers} key={item.key} id={item.id} question={item.question}/>
                <div id={item.id} className="answer-choices">
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
            <Start hideOverlay={hideOverlay} isShown={overlay}/>
            {questionElements}
            <AnswerCheck handleClick={checkAnswers} buttonText={buttonText} gameOver={gameOver} score={score}/>
        </main>
    )
}