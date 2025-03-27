import React, { useState, useEffect } from "react"

const ThemeButton: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    // Basculer entre les thèmes
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", newTheme) // Appliquer le thème au document
    }

    // Détecter le mode préféré de l'utilisateur
    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const initialTheme = prefersDark ? "dark" : "light"
        setTheme(initialTheme)
        document.documentElement.setAttribute("data-theme", initialTheme)
    }, [])

    return (
        <div className="theme-button">
            <button onClick={toggleTheme}>
                {theme === "light" ? "Dark" : "Light"}
            </button>
        </div>
    )
}

export default ThemeButton