Simon game

Créer une application PWA

Initialiser un projet avec vite :

`npm create vite@latest`

Ajouter le setup PWA :

`npm install -D vite-plugin-pwa`

Modifier le fichier vite.config.ts :


```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'My App',
        background_color: "#ff0000"
      }
    })
  ]
})
```


Cahier des charges
1 - Ajoutez l'implémentation du jeu du Simon Quatres couleurs sont disponibles : rouge, vert, bleu, jaune

<!-- Le jeu doit afficher une séquence de couleurs à l'utilisateur 

Puis l'utilisateur doit reproduire la séquence en cliquant sur les couleurs Si l'utilisateur se trompe, la partie est terminée Si l'utilisateur réussi, la séquence est augmentée d'une couleur  -->

2 - Ajoutez des fonctionnalités "progressives" comme : 

- la vibration à chaque nouvelle couleur lors de la séquence 
<!-- - une notification locale à la fin de la partie avec le score  -->
- la possibilité de saisir une couleur en la dictant plutôt qu'en cliquant sur la pastille 
- stockage des meilleurs scores en local storage 
<!-- - un mode "dark" pour l'application en fonction de la luminosité ambiante  -->
<!-- - un son pour chaque couleur -->

