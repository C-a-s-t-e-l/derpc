import { getCart, getCartTotal, removeFromCart } from '../cart.js';

export default () => {
    const sidebarElement = document.createElement('aside');
    sidebarElement.id = 'cart-sidebar';
    sidebarElement.classList.add('closed'); // Start closed

    function render() {
        const cart = getCart();
        const total = getCartTotal();

        sidebarElement.innerHTML = `
            <h3>System Cart</h3>
            <div class="cart-items">
                ${cart.length === 0 ? '<p class="cart-empty">Your cart is empty.</p>' :
                cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <div class="item-info">
                            <p>${item.name}</p>
                            <small>₱${item.price} x ${item.quantity}</small>
                        </div>
                        <button class="remove-item" data-id="${item.id}">×</button>
                    </div>
                `).join('')
            }
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span>₱${total}</span>
                </div>
                <button class="btn btn-primary checkout-button" ${cart.length === 0 ? 'disabled' : ''}>Checkout</button>
            </div>
        `;
    }

    // Initial render
    render();

    // Re-render whenever the cart changes
    window.addEventListener('cartchange', render);

    // --- EVENT LISTENER LOGIC ---
    sidebarElement.addEventListener('click', e => {
        // Handle removing an item
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        }

        // --- NEW: HANDLE CHECKOUT BUTTON CLICK ---
        if (e.target.classList.contains('checkout-button')) {
            // Close the sidebar for a better UX
            const mainContainer = document.getElementById('main-container');
            sidebarElement.classList.remove('open');
            mainContainer.classList.remove('pushed');

            // Tell the router to navigate to the checkout page
            window.dispatchEvent(new CustomEvent('navigate', { detail: '/checkout' }));
        }
    });

    return sidebarElement;
};