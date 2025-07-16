let cart = JSON.parse(localStorage.getItem('dreCart')) || [];

function saveCart() {
    localStorage.setItem('dreCart', JSON.stringify(cart));
    // Dispatch a custom event so other parts of the app can react to changes
    window.dispatchEvent(new Event('cartchange'));
}

export function getCart() {
    return cart;
}

export function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

export function getCartTotal() {
    return cart.reduce((total, item) => {
        // Remove commas before parsing the price
        const price = parseFloat(item.price.replace(/,/g, ''));
        return total + (price * item.quantity);
    }, 0).toFixed(2);
}

export function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}