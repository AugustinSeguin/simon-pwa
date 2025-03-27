self.addEventListener('install', (event) => {
    console.log('Service Worker: Installation en cours')
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/static/js/main.js',
                '/static/css/main.css',
            ])
        })
    )
})

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activé')
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
        })
    )
})
