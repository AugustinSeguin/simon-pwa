import { useCallback, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [count, setCount] = useState(0)
  const [playCount, setPlayCount] = useState(0)
  const [historyColor, setHistoryColor] = useState<string[]>([])
  const [currentColor, setCurrentColor] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isError, setIsError] = useState(false)
  const [buttonMessage, setButtonMessage] = useState<string>("Commencer le jeu")

  const playSound = (color: string) => {
    const audio = new Audio(`/sounds/${color}.mp3`)
    audio.play()
  }

  const clickButton = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const targetId = target.id
    playSound(targetId) 
    if (playCount < historyColor.length) {
      if (targetId !== historyColor[playCount]) {
        looseGame()
      }
    }
    if (playCount + 1 == historyColor.length) {
      setMessage("Bravo !")
      setIsStarted(false)
      setButtonMessage("Level up !")
    }
    setPlayCount(playCount + 1)
  }, [historyColor, playCount, buttonMessage, isStarted, isError, message])

  const looseGame = useCallback(() => {
    toast.error(`Vous avez perdu au tour ${count} !`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    setMessage("Perdu !")
    setIsError(true)
    setPlayCount(0)
    setCount(0)
    setHistoryColor([])
    setIsStarted(false)
    setButtonMessage("Recommencer le jeu")
  }, [])

  const addColor = useCallback(() => {
    setPlayCount(0)
    setCount(count + 1)
    const colors = ["green", "red", "yellow", "blue"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setHistoryColor([...historyColor, randomColor])
  }, [historyColor])

  const startGame = useCallback(() => {
    setIsStarted(true)
    setMessage("")
    addColor()
    console.log(historyColor)
    setCount(0)
  }, [historyColor, addColor, count, isStarted])

  useEffect(() => {
    if (count < historyColor.length) {
      setTimeout(() => {
        setCurrentColor("")
        setTimeout(() => {
          setCurrentColor(historyColor[count])
          console.log(`currentColor ${count} : ${historyColor[count]}`)
          setCount(count + 1)
        }, 50)
      }, 500)
    }
  }, [historyColor, count])

  return (
    <div className='App'>
      <ToastContainer /> 
      <h1>Simon Game</h1>
      <hr />
      <h2>Niveau : {count}</h2>
      <hr />

      {message &&
        <>
          <p>{message}</p>
          <hr />
        </>
      }

      {!isStarted &&
        <button
          className="start"
          onClick={() => {
            startGame()
          }}
        >
          {buttonMessage}
        </button>
      }
      <div className="card">
        <div className="top">
          <button
            id="green"
            className={currentColor === "green" ? "active" : ""}
            onClick={clickButton}
          ></button>
          <button
            id="red"
            className={currentColor === "red" ? "active" : ""}
            onClick={clickButton}
          ></button>
        </div>
        <div className="bottom">
          <button
            id="yellow"
            className={currentColor === "yellow" ? "active" : ""}
            onClick={clickButton}
          ></button>
          <button
            id="blue"
            className={currentColor === "blue" ? "active" : ""}
            onClick={clickButton}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default App