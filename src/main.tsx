import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeButton from './ThemeButton.tsx'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker enregistré avec succès:', registration)
      })
      .catch((error) => {
        console.log('Erreur lors de l\'enregistrement du Service Worker:', error)
      })
  })
}

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeButton />
    <App />
  </>
)
