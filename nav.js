document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a'); // Select all navigation links
    const currentPath = window.location.pathname; // Get the current page's path

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (currentPath.includes(linkPath) || (currentPath === '/' && linkPath === 'index.html')) { // Handle root path
            link.classList.add('active'); // Add "active" class
        } else {
            link.classList.remove('active'); // Remove "active" class
        }
    });
});