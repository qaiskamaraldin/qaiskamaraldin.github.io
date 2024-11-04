// Typing effect function
function typeText(element, text, delay = 100, cursor = false) {
    return new Promise((resolve) => {
        let index = 0;
        const cursorElement = cursor ? document.createElement('span') : null;

        if (cursorElement) {
            cursorElement.classList.add('cursor');
            element.appendChild(cursorElement); // Append cursor span
        }

        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index); // Use textContent instead of innerHTML
                index++;
            } else {
                clearInterval(interval);
                if (cursorElement) {
                    cursorElement.classList.add('active'); // Activate cursor style
                }
                resolve(); // Resolve promise when done
            }
        }, delay);
    });
}

// Fade-in effect function for the image
function fadeInImage(imageElement) {
    imageElement.classList.add('fade-in');

    // Function to check if element is in view
    function checkVisibility() {
        const rect = imageElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            imageElement.classList.add('visible'); // Add visible class when in view
            window.removeEventListener('scroll', checkVisibility); // Remove listener once it’s visible
        }
    }

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    // Also check on load
    checkVisibility();
}

// Arrow toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const welcomeElement = document.getElementById('welcome');
    const statsElement = document.getElementById('stats');
    const meImage = document.getElementById('me');
    const arrow = document.createElement('div');
    let isAtSublanding = false;

    // Set up the arrow
    arrow.classList.add('scroll-arrow');
    arrow.textContent = '▼'; // Down arrow
    document.body.appendChild(arrow);

    // Initialize typing effect
    typeText(welcomeElement, "Hi, I'm Qais!!", 150) // Slower typing speed for welcome
        .then(() => typeText(statsElement, "Aspiring Medic | A-levels: 5A* | 3190 B1 UCAT | 3x Dentistry Offers", 100, true));
    
    fadeInImage(meImage);

    // Arrow click event
    arrow.addEventListener('click', () => {
        if (isAtSublanding) {
            // Scroll back to landing
            window.scrollTo({ top: 0, behavior: 'smooth' });
            arrow.textContent = '▼'; // Change to down arrow
        } else {
            // Scroll to sublanding
            document.getElementById('sublanding').scrollIntoView({ behavior: 'smooth' });
            arrow.textContent = '▲'; // Change to up arrow
        }
        isAtSublanding = !isAtSublanding; // Toggle state
    });

    // Update arrow position on scroll
    window.addEventListener('scroll', () => {
        const sublandingOffset = document.getElementById('sublanding').offsetTop;
        if (window.scrollY >= sublandingOffset) {
            arrow.textContent = '▲'; // Up arrow
            isAtSublanding = true;
        } else {
            arrow.textContent = '▼'; // Down arrow
            isAtSublanding = false;
        }
    });
});