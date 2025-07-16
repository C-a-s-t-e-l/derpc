import './router.js';
import Header from './components/Header.js';
import CartSidebar from './components/CartSidebar.js';
import { getCartCount } from './cart.js'; // <-- ADD THIS IMPORT

const headerContainer = document.getElementById('main-header-container');
const cartContainer = document.getElementById('cart-sidebar-container');

// --- RENDER STATIC COMPONENTS ---
headerContainer.appendChild(Header());
cartContainer.appendChild(CartSidebar());

// --- CART EVENT LISTENERS ---
const cartButton = document.getElementById('cart-button');
const cartSidebar = document.getElementById('cart-sidebar');
const mainContainer = document.getElementById('main-container');

// Open/close cart sidebar
cartButton.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
    mainContainer.classList.toggle('pushed');
});

// Update cart count on change
window.addEventListener('cartchange', () => {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        // Now this function call will work correctly
        cartCountElement.textContent = getCartCount();
    }
});