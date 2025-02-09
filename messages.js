document.addEventListener('DOMContentLoaded', () => {
    const messagesSection = document.getElementById('messages');
    const messageList = document.getElementById('message-list');

    if (messagesSection && messageList) {
        messageList.innerHTML = "<p>Messaging feature coming soon!</p>";
    }

    // Navigation (Only for the Messages link on this page)
    const messagesLink = document.getElementById('messages-link');
    if (messagesLink) {
        messagesLink.addEventListener('click', (event) => {
            event.preventDefault();
            showSection('messages');
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