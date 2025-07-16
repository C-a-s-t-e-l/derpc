export default ({ status, orderId }) => { // Destructure both properties
    const pageElement = document.createElement('div');
    pageElement.classList.add('order-status-container');

    if (status === 'success') {
        // ...
    } else if (status === 'pending') {
        pageElement.innerHTML = `
            <h1>⏳ Order Placed - Awaiting Payment</h1>
            <p>Your order has been created. Please complete the payment via GCash transfer and upload the receipt in your profile's order history.</p>
            <p><strong>Order ID:</strong> ${orderId}</p> <!-- Use the destructured orderId -->
            <a href="/profile" class="btn btn-primary" data-link>Go to Profile</a>
        `;
    } // ...
    return pageElement;
};