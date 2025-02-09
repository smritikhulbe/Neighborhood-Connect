// messages.js
document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('message-list');
    const newMessageInput = document.getElementById('new-message');
    const sendMessageButton = document.getElementById('send-message');

    let messages = JSON.parse(localStorage.getItem('messages')) || []; // Load messages from localStorage

    function displayMessages() {
        messageList.innerHTML = '';

        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `<p><strong>${message.sender}:</strong> ${message.text}</p>`;
            messageList.appendChild(messageDiv);
        });
    }

    function saveMessages() {
        localStorage.setItem('messages', JSON.stringify(messages)); // Save messages to localStorage
    }

    sendMessageButton.addEventListener('click', () => {
        const messageText = newMessageInput.value;
        if (messageText.trim() !== "") { // Don't send empty messages
            const sender = localStorage.getItem('username') || "Guest"; // Get sender's username or "Guest"
            const message = { sender: sender, text: messageText };
            messages.push(message);
            saveMessages();
            displayMessages();
            newMessageInput.value = ''; // Clear input field
        }
    });

    displayMessages(); // Initial display of messages

    // ... (Navigation logic - same as before)
    const homeLink = document.getElementById('home-link');
    const eventsLink = document.getElementById('events-link');
    const profileLink = document.getElementById('profile-link');

    if (homeLink && eventsLink && profileLink) {
        homeLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "index.html";
        });

        eventsLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "events.html";
        });

        profileLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "profile.html";
        });
    }

});