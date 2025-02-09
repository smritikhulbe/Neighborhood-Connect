// index.js
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let nextPostId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

function displayPosts() {
    const postList = document.getElementById('post-list');
    if (!postList) return;

    postList.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.description}</p><p>Posted by: ${post.author}</p>`;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deletePost(post.id);
        });
        postDiv.appendChild(deleteButton);


        postList.appendChild(postDiv);
    });
}

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function createPost(title, description, author) {
    const newPost = { id: nextPostId++, title, description, author };
    posts.push(newPost);
    savePosts();
    displayPosts();
}

function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    savePosts();
    displayPosts();
}



document.addEventListener('DOMContentLoaded', () => {
    displayPosts();

    const createPostButton = document.getElementById('create-post-button');
    const modal = document.getElementById('create-post-modal');
    const closeModal = document.querySelector('.close');

    if (createPostButton && modal && closeModal) {
        createPostButton.addEventListener('click', () => {
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
    }

    const newRequestForm = document.getElementById('new-request-form');
    if (newRequestForm) {
        newRequestForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('request-title').value;
            const description = document.getElementById('request-description').value;
            const author = localStorage.getItem('username') || "Anonymous";

            createPost(title, description, author);

            document.getElementById('request-title').value = '';
            document.getElementById('request-description').value = '';

            if (modal) {
                modal.style.display = "none";
            }
        });
    }


    // Navigation (Only for the Home link on this page)
    const homeLink = document.getElementById('home-link');
    const eventsLink = document.getElementById('events-link');
    const messagesLink = document.getElementById('messages-link');
    const profileLinkNav = document.getElementById('profile-link'); // Get the profile link

    if (homeLink && eventsLink && messagesLink && profileLinkNav) {
        // These links now cause page transitions
        homeLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = "index.html";
        });

        eventsLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "events.html";
        });

        messagesLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "messages.html";
        });

        profileLinkNav.addEventListener('click', (event) => {
            event.preventDefault();
            if (isLoggedIn) {
                window.location.href = "profile.html";
            } else {
                window.location.href = 'login.html';
            }
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