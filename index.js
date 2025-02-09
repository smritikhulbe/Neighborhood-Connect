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

        // Add reply button
        const replyButton = document.createElement('button');
        replyButton.textContent = 'Reply';
        replyButton.classList.add('reply-button'); // Add a class for easy selection
        replyButton.addEventListener('click', () => {
            openMessageModal(post.id); // Pass the post ID to the modal
        });
        postDiv.appendChild(replyButton);

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

// Function to open the message modal (You'll need to add the modal HTML to your index.html)
function openMessageModal(postId) {
    const messageModal = document.getElementById('message-modal'); // Replace with your modal's ID
    if (!messageModal) {
        console.error("Message modal not found!");
        return;
    }

    // Set the post ID in the modal (you can use a data attribute or a hidden input)
    messageModal.dataset.postId = postId; // Or messageModal.querySelector('#post-id').value = postId;

    messageModal.style.display = 'block';

    const closeModal = messageModal.querySelector('.close'); // Replace '.close' with your close button's selector
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            messageModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == messageModal) {
            messageModal.style.display = "none";
        }
    });

    const sendMessageButton = messageModal.querySelector('#send-message'); // Replace with your send button's ID
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', () => {
            const message = messageModal.querySelector('#message-text').value; // Get the message text
            console.log("Sending message to post ID:", postId, "Message:", message);
            // Here you would add the logic to actually send the message
            // (e.g., using Firebase or another backend).
            messageModal.style.display = "none"; // Close the modal after sending
        });
    }
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
    if (homeLink) {
        homeLink.addEventListener('click', (event) => {
            event.preventDefault();
            showSection('feed');
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