// Music Gallery Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const trackCards = document.querySelectorAll('.track-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            trackCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('fade-in-on-scroll'), 10);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('fade-in-on-scroll'), 10);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Play button functionality
    document.querySelectorAll('.play-btn-large').forEach(btn => {
        btn.addEventListener('click', function() {
            const trackName = this.closest('.track-card').querySelector('h3').textContent;
            showNotification(`Now playing: ${trackName} 🎵`, 'info');
        });
    });

    // Download button functionality
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const trackName = this.closest('.track-card').querySelector('h3').textContent;
            showNotification(`Preparing download for: ${trackName}`, 'success');
        });
    });

    // Platform link tracking
    document.querySelectorAll('.platform-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.textContent.split(' ')[0];
            console.log(`Redirecting to ${platform}`);
        });
    });
});
