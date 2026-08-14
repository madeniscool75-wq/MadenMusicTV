// Shop Page Functionality
let cart = JSON.parse(localStorage.getItem('madenmusictvCart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    // Product filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-category');

            productCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const product = {
                id: index,
                name: card.querySelector('h3').textContent,
                price: parseFloat(card.querySelector('.product-price').textContent.replace('$', '')),
                quantity: 1
            };

            // Check if product already in cart
            const existingProduct = cart.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            saveCart();
            updateCartDisplay();
            showNotification(`${product.name} added to cart!`, 'success');
            
            // Visual feedback
            this.textContent = '✓ Added';
            setTimeout(() => {
                this.textContent = '🛒 Add to Cart';
            }, 1500);
        });
    });

    // Bundle button
    const bundleBtn = document.querySelector('.bundle-btn');
    if (bundleBtn) {
        bundleBtn.addEventListener('click', function() {
            const bundleItems = [
                { name: 'Classic Logo T-Shirt', price: 24.99 },
                { name: 'Gaming Hoodie', price: 49.99 },
                { name: 'Complete Album Bundle', price: 9.99 },
                { name: 'Music Production Presets', price: 19.99 },
                { name: 'Royalty-Free Beat Pack', price: 14.99 }
            ];

            bundleItems.forEach(item => {
                cart.push({
                    id: Math.random(),
                    name: item.name,
                    price: item.price,
                    quantity: 1
                });
            });

            saveCart();
            updateCartDisplay();
            showNotification('Ultimate Bundle added to cart! Savings applied!', 'success');
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
            } else {
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                showNotification(`Proceeding to checkout... Total: $${total.toFixed(2)}`, 'success');
                // In a real implementation, this would redirect to a payment processor
            }
        });
    }

    updateCartDisplay();
});

function saveCart() {
    localStorage.setItem('madenmusictvCart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartCount && cartTotal) {
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartCount.textContent = `Items in cart: ${itemCount}`;
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Color selection
document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const colors = card.querySelectorAll('.color');
        colors.forEach(c => c.style.opacity = '0.5');
        this.style.opacity = '1';
    });
});
