import { useRef, useState, useEffect } from 'react'
import './Quiz.css'
import { data } from '../../assets/data.js'

export function Quiz() {
    const [questions, setQuestions] = useState([]) // Estado para almacenar las preguntas aleatorias
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState(null)
    const [lock, setLock] = useState(false)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)
    const [timeLeft, setTimeLeft] = useState(60) // Estado para el tiempo restante

    const Option1 = useRef(null)
    const Option2 = useRef(null)
    const Option3 = useRef(null)

    const optionArray = [Option1, Option2, Option3]

    // Función para barajar preguntas
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        // Seleccionar 10 preguntas aleatorias al iniciar el juego
        const selectedQuestions = shuffleArray(data).slice(0, 10)
        setQuestions(selectedQuestions)
        setQuestion(selectedQuestions[0]) // Inicializar la primera pregunta
    }, [])

    useEffect(() => {
        // Temporizador de 60 segundos
        if (timeLeft === 0) {
            // Si se termina el tiempo, marcar como incorrecta
            setLock(true)
            optionArray[question.ans - 1].current.classList.add('correct') // Resaltar la respuesta correcta
        }
        const timer = setInterval(() => {
            if (timeLeft > 0 && !lock) {
                setTimeLeft(prevTime => prevTime - 1)
            }
        }, 1000)

        return () => clearInterval(timer) // Limpiar el temporizador
    }, [timeLeft, lock, question])

    const checkAnswer = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add('correct')
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add('wrong')
                optionArray[question.ans - 1].current.classList.add('correct')
            }
            setLock(true)
        }
    }

    const handleClickNext = () => {
        if (lock) {
            if (index === questions.length - 1) {
                setResult(true)
                return
            }
            setIndex(index + 1)
            setQuestion(questions[index + 1])
            setLock(false)
            setTimeLeft(60) // Reiniciar el temporizador
            optionArray.forEach(option => {
                option.current.classList.remove('correct')
                option.current.classList.remove('wrong')
            })
        }
    }

    return (
        <div className="container">
            {result ? (
                <div className="result">
                    <h2>Tu puntaje es: {score}</h2>
                    <button onClick={() => window.location.reload()}>Reiniciar</button>
                </div>
            ) : (
                <>
                    {question && (
                        <> 
                            {/* <figure className="img-container">
                                <img src={question.image} alt={question.question}/>
                            </figure> */}
                            <h3>{index + 1}. {question.question}</h3>
                            <ul>
                                <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>{question.option1}</li>
                                <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>{question.option2}</li>
                                <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>{question.option3}</li>
                            </ul>
                            <div className="timer-container">
                                <div
                                    className="timer-bar"
                                    style={{ width: `${(timeLeft / 60) * 100}%` }}
                                ></div>
                                <div className="timer-text">{timeLeft}s</div>
                            </div>
                            <button onClick={handleClickNext}>Siguiente</button>
                            <div className='index'>{index + 1} de {questions.length} preguntas</div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}
