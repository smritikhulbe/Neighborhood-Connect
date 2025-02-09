
const firebaseConfig = {
    apiKey: "AIzaSyAMT37ESKppxPnduQRQPKaY0rftJbPIQyg",
    authDomain: "mh-2025.firebaseapp.com",
    projectId: "mh-2025",
    storageBucket: "mh-2025.firebasestorage.app",
    messagingSenderId: "786101368222",
    appId: "1:786101368222:web:185ce41366ddce578d528f",
    measurementId: "G-E2SPM1HDKW"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // If you are using Firestore

const authStatus = document.getElementById('auth-status');
const loginLink = document.getElementById('login-link');
const logoutButton = document.getElementById('logout-button');

auth.onAuthStateChanged(async (user) => {
    if (initialAuthCheck) { // Only perform the redirect logic on the initial check
        initialAuthCheck = false; // Set the flag to false after the first check

        if (user) {
            authStatus.textContent = `Logged in as ${user.displayName || user.email}`;
            loginLink.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            // ... (Firestore user data logic - optional)
        } else {
            authStatus.textContent = "Not logged in";
            loginLink.style.display = 'inline-block';
            logoutButton.style.display = 'none';

            if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
                window.location.href = "login.html";
            }
        }
    }
});




// Logout button event listener
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = "login.html"; // Redirect to login page after logout
    }).catch((error) => {
        console.error("Logout error:", error);
    });
});


// Navigation (Client-side - Make this function reusable)
function setupNavigation() {
    const homeLink = document.getElementById('home-link');
    const eventsLink = document.getElementById('events-link');
    const profileLink = document.getElementById('profile-link');
    const messagesLink = document.getElementById('messages-link');

    if (homeLink && eventsLink && profileLink && messagesLink) {
        const handleNavigation = (event, href) => {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = href;
        };

        homeLink.addEventListener('click', (event) => handleNavigation(event, "index.html"));
        eventsLink.addEventListener('click', (event) => handleNavigation(event, "event.html"));
        profileLink.addEventListener('click', (event) => handleNavigation(event, "profile.html"));
        messagesLink.addEventListener('click', (event) => handleNavigation(event, "messages.html"));
    }
}

document.addEventListener('DOMContentLoaded', setupNavigation); 