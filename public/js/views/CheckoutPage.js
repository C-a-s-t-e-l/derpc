import { getCart, getCartTotal } from '../cart.js';
import { navigateTo } from '../router.js'; // Make sure navigateTo is imported

export default () => {
    const pageElement = document.createElement('div');
    pageElement.classList.add('checkout-page-container');

    const cart = getCart();
    const total = getCartTotal();

    if (cart.length === 0) {
        pageElement.innerHTML = `
            <h1>Your Cart is Empty</h1>
            <p>You need to add items to your cart before you can check out.</p>
            <a href="/products" class="btn btn-primary" data-link>Browse Components</a>
        `;
        return pageElement; // Return early if cart is empty
    }

    // Render the main checkout layout
    pageElement.innerHTML = `
        <div class="page-header">
            <h1>Checkout</h1>
        </div>
        <div class="checkout-layout">
            <div class="order-summary">
                <h2>Order Summary</h2>
                ${cart.map(item => `
                    <div class="summary-item">
                        <span>${item.name} (x${item.quantity})</span>
                        <span>₱${(parseFloat(item.price.replace(/,/g, '')) * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                <div class="summary-total">
                    <span>Total</span>
                    <span>₱${total}</span>
                </div>
            </div>
            <div class="payment-options">
                <h2>Payment Method</h2>
                <div class="payment-choice" id="pay-online-button">
                    <h3>Pay Online (Recommended)</h3>
                    <p>Instant payment via GCash, Maya, Cards through Xendit.</p>
                </div>
                <div class="payment-choice" id="pay-manual-button">
                    <h3>Pay Manually</h3>
                    <p>Pay via GCash transfer and upload your proof of payment.</p>
                </div>
                <div id="payment-status"></div>
            </div>
        </div>
    `;

    // --- LOGIC MOVED INSIDE THE FUNCTION ---
    const statusDiv = pageElement.querySelector('#payment-status');

    // --- ONLINE PAYMENT LOGIC ---
    pageElement.querySelector('#pay-online-button').addEventListener('click', async () => {
        statusDiv.textContent = 'Redirecting to secure payment...';
        try {
            const response = await fetch('/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(total) })
            });
            if (!response.ok) {
                // If the server returns an error, show it
                const errorData = await response.json();
                throw new Error(errorData.error || 'Payment gateway failed.');
            }
            const data = await response.json();
            if (data.actions && data.actions.desktop_web_checkout_url) {
                window.location.href = data.actions.desktop_web_checkout_url;
            } else {
                throw new Error('Could not get payment URL.');
            }
        } catch (error) {
            statusDiv.textContent = `Error: ${error.message}`;
        }
    });

    // --- MANUAL PAYMENT LOGIC ---
    pageElement.querySelector('#pay-manual-button').addEventListener('click', () => {
        // In a real app, we would save the order to the DB here.
        // For now, we'll simulate it.
        const mockOrderId = `MANUAL-${Date.now()}`;
        console.log('Manual Order Created:', mockOrderId);
        // Then navigate to the pending page
        navigateTo(`/order/pending/${mockOrderId}`);
    });

    // This is now the last line of the function
    return pageElement;
};