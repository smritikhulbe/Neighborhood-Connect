// script.js (For shared logic)

document.addEventListener('DOMContentLoaded', () => {
    // Authentication Logic (Simplified)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const profileLink = document.getElementById('profile-link');
    const loginLink = document.getElementById('login-link');

    if (profileLink && loginLink) {
        if (isLoggedIn) {
            profileLink.style.display = 'inline';
            loginLink.style.display = 'none';
        } else {
            profileLink.style.display = 'none';
            loginLink.style.display = 'inline';
        }
    }
}