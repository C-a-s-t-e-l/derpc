import { getCartCount } from '../cart.js';
import { getCurrentUser, logout } from '../auth.js';

export default () => {
    // 1. Get the current user state first.
    const user = getCurrentUser();
    const headerElement = document.createElement('header');
    headerElement.id = 'main-header';

    // 2. Determine which authentication links to show based on the user state.
    const authLinks = user
        ? `<a href="/profile" data-link>Profile</a><a href="#" id="logout-button">Logout</a>`
        : `<a href="/login" data-link>Login / Register</a>`;

    // 3. Build the complete HTML string using the variables we just defined.
    headerElement.innerHTML = `
        <nav class="main-nav">
            <a href="/" class="nav-logo" data-link>DRE</a>
            <div class="nav-links">
                <a href="/products" data-link>Components</a>
                <a href="/builds" data-link>Builds</a>
                <a href="/about" data-link>About</a>
            </div>
            <div class="nav-actions">
                ${authLinks}
                <button id="cart-button" class="cart-button">
                    <span class="cart-icon">🛒</span>
                    <span class="cart-count">${getCartCount()}</span>
                </button>
            </div>
        </nav>
    `;

    // 4. If the user is logged in, find the logout button and add its functionality.
    if (user) {
        // We use querySelector on the element we just created
        const logoutButton = headerElement.querySelector('#logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', e => {
                e.preventDefault();
                logout();
            });
        }
    }

    // 5. Return the fully constructed and functional header element.
    return headerElement;
};