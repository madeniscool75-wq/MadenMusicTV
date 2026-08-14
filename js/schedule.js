// Schedule Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set reminders
    document.querySelectorAll('.set-reminder').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventName = this.closest('.event-card').querySelector('h3').textContent;
            const eventDate = this.closest('.event-card').querySelector('.event-date').textContent;
            
            showNotification(`Reminder set for: ${eventName}!`, 'success');
            this.textContent = '✓ Reminder Set';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
        });
    });

    // Timezone selector
    const tzSelect = document.getElementById('timezone-select');
    if (tzSelect) {
        tzSelect.addEventListener('change', function() {
            const selectedTz = this.value;
            showNotification(`Schedule updated for ${selectedTz}`, 'info');
            // In a real implementation, this would update all times
        });
    }

    // Notification button
    const notifBtn = document.querySelector('.notif-btn:first-child');
    if (notifBtn) {
        notifBtn.addEventListener('click', function() {
            if ('Notification' in window) {
                if (Notification.permission === 'granted') {
                    new Notification('MadenMusicTV', {
                        body: 'Notifications enabled! You\'ll get alerts when I go live.',
                        icon: '🔔'
                    });
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            new Notification('MadenMusicTV', {
                                body: 'Notifications enabled! You\'ll get alerts when I go live.',
                                icon: '🔔'
                            });
                        }
                    });
                }
            } else {
                showNotification('Notifications not supported in your browser', 'info');
            }
        });
    }

    // Update active day highlight
    updateCurrentDay();
    setInterval(updateCurrentDay, 60000); // Update every minute
});

function updateCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    
    document.querySelectorAll('.day-card').forEach(card => {
        card.classList.remove('active-day');
        if (card.querySelector('h3').textContent === currentDay) {
            card.classList.add('active-day');
            card.style.borderColor = 'var(--primary-color)';
        }
    });
}

// Add active day styling
const style = document.createElement('style');
style.textContent = `
    .day-card.active-day {
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
    }
`;
document.head.appendChild(style);
