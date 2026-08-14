// ==========================================
// MADENMUSICIV - Interactive Features
// ==========================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Active nav link update
    updateActiveNavLink();
    window.addEventListener('hashchange', updateActiveNavLink);
});

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Load schedule data and update next stream time
function loadScheduleData() {
    // This would typically come from a server/database
    // For now, using sample data
    const nextStreamElement = document.querySelector('.next-stream-time');
    if (nextStreamElement) {
        // Example: Update with actual schedule
        const nextStream = new Date();
        nextStream.setDate(nextStream.getDate() + 1);
        nextStream.setHours(20, 0, 0, 0);
        
        const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
        nextStreamElement.textContent = `Next stream: ${nextStream.toLocaleDateString('en-US', options)}`;
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.music-card, .stat-card, .social-icon').forEach(el => {
    observer.observe(el);
});

// Play button functionality
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Music player will be integrated here! 🎵');
        // In a real implementation, this would play audio
    });
});

// Load schedule data when page loads
loadScheduleData();

// Notification system for forms (used in contact page)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles dynamically if not in CSS
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            font-weight: 600;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-success {
            background-color: #00d9ff;
            color: #000;
        }

        .notification-error {
            background-color: #ff006e;
            color: #fff;
        }

        .notification-info {
            background-color: #0a9fb5;
            color: #fff;
        }
    `;
    document.head.appendChild(style);
}

addNotificationStyles();

// Page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});
