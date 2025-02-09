// messages.js
document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.getElementById('message-container');
    const authStatus = document.getElementById('auth-status'); // Get auth status element

    // Function to display messages content based on login status
    function displayMessagesContent(isLoggedIn) {
        messageContainer.innerHTML = ""; // Clear previous content

        if (isLoggedIn) {
            messageContainer.innerHTML = `
                <div class="message-list" id="message-list"></div>
                <div class="message-input">
                    <textarea id="new-message" placeholder="Type your message..."></textarea>
                    <button id="send-message">Send</button>
                </div>
            `;
            initializeMessageFunctionality(); // Call the function to initialize the message functionality
        } else {
            messageContainer.innerHTML = "<p>Please log in to view and send messages.</p>";
        }
    }

    // Function to initialize message functionality (only called when logged in)
    function initializeMessageFunctionality() {
        const messageList = document.getElementById('message-list');
        const newMessageInput = document.getElementById('new-message');
        const sendMessageButton = document.getElementById('send-message');

        let socket = io();

        sendMessageButton.addEventListener('click', () => {
            // ... (rest of the message sending logic - same as before)
        });

        socket.on('chat message', (msg) => {
            // ... (rest of the message display logic - same as before)
        });

        socket.on('connect', () => {
            // ... (rest of the initial message retrieval logic - same as before)
        });
    }

    // Call displayMessagesContent initially and whenever auth state changes
    auth.onAuthStateChanged((user) => {
        const isLoggedIn = !!user; // Convert user object to boolean
        displayMessagesContent(isLoggedIn);
    });

    // Navigation (Client-side - same as before)
    const homeLink = document.getElementById('home-link');
    const eventsLink = document.getElementById('events-link');
    const profileLink = document.getElementById('profile-link');
    const messagesLink = document.getElementById('messages-link');

    if (homeLink && eventsLink && profileLink && messagesLink) {
        homeLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "index.html";
        });

        eventsLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "event.html";
        });

        profileLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "profile.html";
        });

        messagesLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "messages.html";
        });
    }
});