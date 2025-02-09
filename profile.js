document.addEventListener('DOMContentLoaded', () => {
    const profileContent = document.getElementById('profile-content');
    let user = JSON.parse(localStorage.getItem('user')) || {
        username: "Guest",
        bio: "Welcome to my profile!",
        skills: ""
    };

    function displayProfileContent(isLoggedIn) {
        profileContent.innerHTML = ""; // Clear previous content

        if (isLoggedIn) {
            profileContent.innerHTML = `
                <div id="profile-info">
                    <p><strong>Username:</strong> <span id="displayed-username">${user.username}</span></p>
                    <p><strong>Bio:</strong> <span id="displayed-bio">${user.bio}</span></p>
                    <p><strong>Skills:</strong> <span id="displayed-skills">${user.skills}</span></p>
                </div>

                <h3>Edit Profile</h3>
                <form id="edit-profile-form">
                    <label for="username">Username:</label><br>
                    <input type="text" id="username" name="username" required><br><br>

                    <label for="bio">Bio:</label><br>
                    <textarea id="bio" name="bio" rows="4" cols="50"></textarea><br><br>

                    <label for="skills">Skills (comma-separated):</label><br>
                    <input type="text" id="skills" name="skills"><br><br>

                    <button type="submit">Save Changes</button>
                </form>
            `;
            initializeProfileFunctionality();
        } else {
            profileContent.innerHTML = "<p>Please log in to view and edit your profile.</p>";
        }
    }

    function initializeProfileFunctionality() {
        const profileInfo = document.getElementById('profile-info');
        const editProfileForm = document.getElementById('edit-profile-form');

        function displayProfile() {
            profileInfo.innerHTML = `
                <p><strong>Username:</strong> <span id="displayed-username">${user.username}</span></p>
                <p><strong>Bio:</strong> <span id="displayed-bio">${user.bio}</span></p>
                <p><strong>Skills:</strong> <span id="displayed-skills">${user.skills}</span></p>
            `;

            const displayedUsername = document.getElementById('displayed-username');
            const displayedBio = document.getElementById('displayed-bio');
            const displayedSkills = document.getElementById('displayed-skills');

            if (displayedUsername) {
                displayedUsername.addEventListener('click', () => {
                    editProfileForm.username.value = user.username;
                });
            }
            if (displayedBio) {
                displayedBio.addEventListener('click', () => {
                    editProfileForm.bio.value = user.bio;
                });
            }
            if (displayedSkills) {
                displayedSkills.addEventListener('click', () => {
                    editProfileForm.skills.value = user.skills;
                });
            }
        }

        function saveUser() {
            localStorage.setItem('user', JSON.stringify(user));
        }

        displayProfile();

        if (editProfileForm) {
            editProfileForm.addEventListener('submit', (event) => {
                event.preventDefault();

                user.username = document.getElementById('username').value;
                user.bio = document.getElementById('bio').value;
                user.skills = document.getElementById('skills').value;

                saveUser();
                displayProfile();
            });
        } else {
            console.error("editProfileForm element not found!");
        }
    }

    auth.onAuthStateChanged((user) => {
        const isLoggedIn = !!user;
        if (user && localStorage.getItem('user') === null) {
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email
            }));
        }
        displayProfileContent(isLoggedIn);
    });

    // *** THIS IS THE KEY FIX ***
    auth.onAuthStateChanged(user => { // Call initially to set content
        const isLoggedIn = !!user;
        displayProfileContent(isLoggedIn);
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