// main.js

export function initializeApp() {
    const appDiv = document.getElementById('app');

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker Registered', reg))
            .catch(err => console.error('Service Worker Error', err));
    }

    fetch('contrib.md')
        .then(response => response.text())
        .then(markdown => {
            appDiv.innerHTML = marked.parse(markdown);
        })
        .catch(error => {
            console.error('Error fetching contrib.md:', error);
            appDiv.innerHTML = '<p>Error loading content.</p>';
        });
}

document.addEventListener('DOMContentLoaded', initializeApp);