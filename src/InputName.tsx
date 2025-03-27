import React, { useRef } from "react"
import { toast } from "react-toastify"

interface InputNameProps {
  setUsername: (username: string) => void
}

const InputName: React.FC<InputNameProps> = ({ setUsername }) => {
  const inputRef = useRef<HTMLInputElement>(null) // Référence pour l'input

  const handleStartGame = () => {
    const inputValue = inputRef.current?.value.trim() // Récupérer la valeur de l'input
    if (inputValue) {
      setUsername(inputValue) // Définir le nom d'utilisateur
      toast.success(`Bonjour ${inputValue} !`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.error("Veuillez entrer un nom valide.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className="input-name">
      <h2>Quel est votre nom ?</h2>
      <input
        ref={inputRef} // Associer la référence à l'input
        type="text"
        placeholder="Entrez votre nom"
      />
      <button onClick={handleStartGame}>Commencer le jeu</button>
    </div>
  )
}

export default InputName