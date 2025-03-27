// Fonction pour enregistrer le Service Worker
export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            navigator.serviceWorker
                .register(swUrl)
                .then((registration) => {
                    console.log('Service Worker enregistré:', registration);
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
                });
        });
    }
}

// Fonction pour désenregistrer le Service Worker
export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error('Erreur lors du désenregistrement du Service Worker:', error);
            });
    }
}
