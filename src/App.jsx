import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Quiz } from './components/Quiz/Quiz'
import SpiralText  from './components/SpiralText'

import gsap from 'gsap'

function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const textTitle = useRef();
  const textSubtitle = useRef();

  useEffect(() => {
    gsap.fromTo(
      textTitle.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
    );

    gsap.fromTo(
      textSubtitle.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
    );
  }, []);


  const handleClickStart = () => {
    setStartQuiz(true)
  }

  return (
    <main className="App">
      { startQuiz ?
        <Quiz /> :
        <div className='content'>
          <figure className='logo'>
            <img src="../public/assets/logo.png" alt="Formosa Hermosa" />
          </figure>
          <h1 ref={textTitle} className='title'>Jugá</h1>
          <h2 ref={textSubtitle} className='subtitle'>y divertite</h2>
          <button onClick={handleClickStart} className='comenzar'>Comenzar</button>
        </div>
      }
    </main>
  )
}

export default App
