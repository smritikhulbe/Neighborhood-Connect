// events.js
document.addEventListener('DOMContentLoaded', () => {
    const eventList = document.getElementById('event-list');
    const createEventButton = document.getElementById('create-event-button');
    const modal = document.getElementById('create-event-modal');
    const closeModal = document.querySelector('.close');
    const newEventForm = document.getElementById('new-event-form');

    let events = JSON.parse(localStorage.getItem('events')) || [
      
        { id: 1, title: "Neighborhood Cleanup", description: "Let's clean up our neighborhood!", date: "2024-03-15", location: "Community Park" },
        { id: 2, title: "Gardening Workshop", description: "Learn how to grow your own vegetables.", date: "2024-04-01", location: "Community Garden" },
    ];
    let nextEventId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;

    function displayEvents() {
        eventList.innerHTML = '';

        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerHTML = `<h3>${event.title}</h3><p>${event.description}</p><p>Date: ${event.date}</p><p>Location: ${event.location}</p>`;
            eventList.appendChild(eventDiv);
        });
    }

    function saveEvents() {
        localStorage.setItem('events', JSON.stringify(events));
    }

    createEventButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    newEventForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('event-title').value;
        const description = document.getElementById('event-description').value;
        const date = document.getElementById('event-date').value;
        const location = document.getElementById('event-location').value;

        const newEvent = { id: nextEventId++, title, description, date, location };
        events.push(newEvent);
        saveEvents();
        displayEvents();

        newEventForm.reset(); // Clear form fields
        modal.style.display = "none";
    });

    displayEvents(); // Initial display of events


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