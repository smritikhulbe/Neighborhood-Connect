document.addEventListener('DOMContentLoaded', () => {
    const profileSection = document.getElementById('profile');
    const profileDetails = document.getElementById('profile-details');
    const profileLink = document.getElementById('profile-link'); // Get the profile link

    if (profileSection && profileDetails && profileLink) {
        profileLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (localStorage.getItem('isLoggedIn')) {
              profileSection.style.display = 'block';
              const userData = {
                  username: localStorage.getItem('username') || "Guest",
              };
              profileDetails.innerHTML = `<p>Username: ${userData.username}</p>`;
            } else {
              window.location.href = 'login.html';
            }
        });
    }

    // Navigation (Only for the Profile link on this page)
    const profileLinkNav = document.getElementById('profile-link'); // Get the profile link
    if (profileLinkNav) {
        profileLinkNav.addEventListener('click', (event) => {
            event.preventDefault();
            showSection('profile');
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