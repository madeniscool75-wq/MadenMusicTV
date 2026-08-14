// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const phone = formData.get('phone');
            const newsletter = formData.get('newsletter');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Prepare data for sending
            const contactData = {
                name: name,
                email: email,
                subject: subject,
                phone: phone || 'Not provided',
                message: message,
                newsletter: newsletter === 'on',
                timestamp: new Date().toISOString()
            };

            // In a real application, this would send to a server
            // For now, we'll simulate it
            submitForm(contactData);
        });
    }
});

function submitForm(data) {
    // Simulate form submission
    console.log('Form submitted:', data);

    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Sending...';

    // Simulate server response
    setTimeout(() => {
        // Success response
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Restore button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Store in localStorage for demo purposes
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(data);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        // If newsletter subscribed
        if (data.newsletter) {
            showNotification(`Also subscribed to newsletter!`, 'info');
        }
    }, 1500);
}

// FAQ accordion functionality
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        // Simple toggle effect
        this.classList.toggle('active');
    });
});

// Add active state styling for FAQ
const style = document.createElement('style');
style.textContent = `
    .faq-item.active {
        background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(255, 0, 110, 0.1));
    }
`;
document.head.appendChild(style);
