import { useEffect, useState } from "react"
import "../App.css"
import { ArrowRight, Pause, Play } from "./Icons"

export function Cronometer({shuffleCardFunction, enterCondition}) {
  const [timeLeft, setTimeLeft] = useState(null)
  const [active, setActive] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const [pause, setPause] = useState(false)

  const duration = 8 // duración en segundos

  // Cambiar el ícono de pausa y play
  const playPauseIcon = pause ? <Pause /> : <Play />

  const handleClick = () => {
    if(enterCondition){
      if(firstTime){
        setPause(prev => !prev)
      }
      if(timeLeft !== null){
        setActive(prev => !prev)
        setPause(prev => !prev)
      } else {
        start()
      }
    } else {return}
  }

  const shuffleHandleClick = () => {
    if(firstTime){
      handleClick()
    }
    if(enterCondition){
      setTimeLeft(duration)
      shuffleCardFunction()
    }
  }

  const start = () => {
    if(firstTime){
      shuffleCardFunction()
      setFirstTime()
    }
    setTimeLeft(duration)
    setActive(true)
  }

  useEffect(() => {
    if(!enterCondition){
      setTimeLeft(null)
    }

    if (!active || timeLeft === null || !enterCondition) return

    if (timeLeft <= 0) {
      setActive(false)
      shuffleCardFunction()
      start()
      return
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [active, timeLeft])

  const formatTime = (seconds) => {
    if (seconds === null) return "00"
    //const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
    const ss = String(seconds % 60).padStart(2, "0")
    return `${ss}`
  }

  return (
    <div className="cronometer-main">
      <div className="cronometer-container">
        <strong>SIGUIENTE CARTA EN:</strong>
        <h1>{formatTime(timeLeft)} <span>SEGS.</span></h1>
      </div>
      <div className="cronometer-buttons">
        <button onClick={handleClick}>
          {playPauseIcon}
        </button>
        <button onClick={shuffleHandleClick}>
          <ArrowRight></ArrowRight>
        </button>
      </div>
    </div>
  )
}