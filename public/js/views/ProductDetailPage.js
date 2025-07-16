import { getProductById } from '../api.js';
import { addToCart } from '../cart.js'; // <-- PROBLEM 1: IMPORT addToCart

export default ({ id: productId }) => {
    const pageElement = document.createElement('div');
    pageElement.classList.add('product-detail-page');

    // --- RENDER INITIAL LOADING STATE ---
    pageElement.innerHTML = `
        <div class="loading-container">
            <div class="loading-pulse"></div>
            <p>Loading Component Data...</p>
        </div>
    `;

    // --- FETCH DATA AND RENDER FINAL VIEW ---
    getProductById(productId).then(product => {
        if (!product) {
            pageElement.innerHTML = `
                <h1>Error: Component Not Found</h1>
                <p>The requested product could not be located in our database.</p>
                <a href="/products" data-link>Back to Catalog</a>
            `;
            // PROBLEM 3: REMOVE listener from the error block
            return;
        }

        // --- RENDER THE FULL PRODUCT DETAIL VIEW ---
        pageElement.innerHTML = `
            <div class="breadcrumb">
                <a href="/products" data-link>All Components</a> / <span>${product.category}</span>
            </div>
            <div class="detail-layout">
                <div class="detail-image">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <h1 class="detail-name">${product.name}</h1>
                    <p class="detail-category">${product.category}</p>
                    <div class="detail-price-container">
                        <span class="price-label">Price:</span>
                        <span class="detail-price">₱${product.price}</span>
                    </div>
                    <div class="detail-description">
                        <p>This is a placeholder description. A full-fledged component would have detailed specs and marketing copy here, fetched from the database.</p>
                    </div>
                    <div class="detail-actions">
                        <button class="btn btn-primary add-to-cart-detail" data-product-id="${product.id}">
                            Add to System Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

        // --- PROBLEM 2: ATTACH THE EVENT LISTENER *AFTER* RENDERING ---
        // Now that the button exists in pageElement, we can select it and add the listener.
        const addToCartButton = pageElement.querySelector('.add-to-cart-detail');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                console.log('Adding to cart from detail page:', product);
                addToCart(product);
                // Optional: give user feedback
                // For example, temporarily change button text
                addToCartButton.textContent = 'Added!';
                setTimeout(() => {
                    addToCartButton.textContent = 'Add to System Cart';
                }, 1000);
            });
        }
    });

    return pageElement;
};