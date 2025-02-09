
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
const db = firebase.firestore(); // If you're using Firestore

const authStatus = document.getElementById('auth-status');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

auth.onAuthStateChanged(async (user) => {
    if (user) {
        authStatus.textContent = `Logged in as ${user.displayName || user.email}`;
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';

        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
        }));

        // Example: Add user data to Firestore if it doesn't exist (optional)
        if (db) { // Check if Firestore is initialized
            try {
                const userRef = db.collection('users').doc(user.uid);
                const doc = await userRef.get();

                if (!doc.exists) {
                    await userRef.set({
                        displayName: user.displayName || user.email,
                        email: user.email,
                        // ... other user data ...
                    });
                    console.log("User data added to Firestore");
                }
            } catch (error) {
                console.error("Error with Firestore:", error);
            }
        }

    } else {
        authStatus.textContent = "Not logged in";
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        localStorage.removeItem('user');
    }
});

loginButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider(); // Or other provider
    auth.signInWithPopup(provider).then(() => {
        // Handled by onAuthStateChanged
    }).catch((error) => {
        console.error("Login error:", error);
    });
});

logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        // Handled by onAuthStateChanged
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
            event.preventDefault();
            window.location.href = href;
        };

        homeLink.addEventListener('click', (event) => handleNavigation(event, "index.html"));
        eventsLink.addEventListener('click', (event) => handleNavigation(event, "event.html"));
        profileLink.addEventListener('click', (event) => handleNavigation(event, "profile.html"));
        messagesLink.addEventListener('click', (event) => handleNavigation(event, "messages.html"));
    }
}

document.addEventListener('DOMContentLoaded', setupNavigation); 