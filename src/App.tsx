import { useCallback, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'
import InputName from "./InputName"

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [count, setCount] = useState(0)
  const [playCount, setPlayCount] = useState(0)
  const [historyColor, setHistoryColor] = useState<string[]>([])
  const [currentColor, setCurrentColor] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isError, setIsError] = useState(false)
  const [buttonMessage, setButtonMessage] = useState<string>("Commencer le jeu")
  const [username, setUsername] = useState("")

  const playSound = (color: string) => {
    const audio = new Audio(`/sounds/${color}.mp3`)
    audio.play()
  }

  const saveScore = useCallback(() => {
    const scores = JSON.parse(localStorage.getItem("simonScores") || "[]")
    const newScore = {
      username,
      timestamp: new Date().toISOString(),
      level: count,
    }
    const updatedScores = [...scores, newScore]
    localStorage.setItem("simonScores", JSON.stringify(updatedScores))
  }, [username, count])

  const getScores = () => {
    const scores = JSON.parse(localStorage.getItem("simonScores") || "[]")
    return scores.sort((a: any, b: any) => b.level - a.level)
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
    saveScore()

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
  }, [count, saveScore])

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

      {!username && <InputName setUsername={setUsername} />}
      {username && (
        <>
          <h2>A toi de jouer {username} !</h2>
        </>
      )}

      {username &&

        <>
          <h2>Niveau : {count}</h2>

          {message &&
            <>
          <hr />
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

          <h2>Meilleurs Scores</h2>
          <ul>
            {getScores().map((score: any, index: number) => (
              <li key={index}>
                {score.username} - Niveau : {score.level} - {new Date(score.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      }

    </div>
  )
}

export default App