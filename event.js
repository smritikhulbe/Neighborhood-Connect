document.addEventListener('DOMContentLoaded', () => {
    const eventsSection = document.getElementById('events');
    const eventList = document.getElementById('event-list');

    if (eventsSection && eventList) {
        const events = [
            { title: "Neighborhood Cleanup", date: "2024-03-15", time: "10:00 AM" },
            { title: "Community Potluck", date: "2024-03-22", time: "6:00 PM" },
        ];

        function displayEvents() {
            eventList.innerHTML = "";
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.innerHTML = `<h3>${event.title}</h3><p>${event.date} at ${event.time}</p>`;
                eventList.appendChild(eventDiv);
            });
        }

        displayEvents();
    }

    // Navigation (Only for the Events link on this page)
    const eventsLink = document.getElementById('events-link');
    if (eventsLink) {
        eventsLink.addEventListener('click', (event) => {
            event.preventDefault();
            showSection('events');
        });
    }

    function showSection(sectionId) {
        const sections = ['feed', 'profile', 'messages', 'events'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.classList.remove('active');
            }
        });

        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }
});