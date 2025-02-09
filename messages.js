// messages.js
document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('message-list');
    const newMessageInput = document.getElementById('new-message');
    const sendMessageButton = document.getElementById('send-message');

    let socket = io();

    sendMessageButton.addEventListener('click', () => {
        const messageText = newMessageInput.value;
        if (messageText.trim() !== "") {
            const sender = localStorage.getItem('username') || "Guest";
            const message = { sender: sender, text: messageText };

            socket.emit('chat message', message, (response) => {
                if (response.status === 'ok') {
                    newMessageInput.value = '';
                } else {
                    console.error("Error sending message:", response.message);
                    alert("There was an error sending your message. Please try again.");
                }
            });
        }
    });

    socket.on('chat message', (msg) => {
        displayMessage(msg);
    });

    function displayMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<p><strong>${message.sender}:</strong> ${message.text}</p>`;
        messageList.appendChild(messageDiv);
        messageList.scrollTop = messageList.scrollHeight;
    }

    socket.on('connect', () => {
        socket.emit('get messages', (response) => {
            if (response.status === 'ok') {
                response.messages.forEach(message => {
                    displayMessage(message);
                });
            } else {
                console.error("Error getting messages:", response.message);
            }
        });
    });

    // Navigation (Client-side - same as before)
    const homeLink = document.getElementById('home-link');
    const eventsLink = document.getElementById('event-link');
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