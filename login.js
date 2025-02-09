// login.js
document.addEventListener('DOMContentLoaded', () => {
    const googleLoginButton = document.getElementById('google-login');
    const loginButtonLocal = document.getElementById('login-button-local');
    const signupButton = document.getElementById('signup-button');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const authMessage = document.getElementById('auth-message');

    googleLoginButton.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                authMessage.textContent = "Login Successful!";
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Google Login Error:", error);
                authMessage.textContent = `Google Login Error: ${error.message}`;
            });
    });

    loginButtonLocal.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                authMessage.textContent = "Login Successful!";
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Local Login Error:", error);
                authMessage.textContent = `Local Login Error: ${error.message}`;
            });
    });

    signupButton.addEventListener('click', () => {
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Update user's display name (optional)
                userCredential.user.updateProfile({
                    displayName: username
                }).then(() => {
                    authMessage.textContent = "Account created successfully!";
                    loginForm.style.display = 'block'; // Switch to login form
                    signupForm.style.display = 'none';
                    loginLink.style.display = 'none';
                    signupLink.style.display = 'inline';
                    // ... Add user data to Firestore or database (if needed) ...
                }).catch((error) => {
                    console.error("Error updating display name:", error);
                    authMessage.textContent = `Error updating display name: ${error.message}`;
                });

            }).catch((error) => {
                console.error("Signup Error:", error);
                authMessage.textContent = `Signup Error: ${error.message}`;
            });
    });

    signupLink.addEventListener('click', (event) => {
        event.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        loginLink.style.display = 'inline';
        signupLink.style.display = 'none';
    });

    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginLink.style.display = 'none';
        signupLink.style.display = 'inline';
    });


    auth.onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "index.html";
        }
    });

    // Navigation (Client-side - same as before)
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

});