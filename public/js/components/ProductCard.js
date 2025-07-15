export default (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imageUrl}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-price">₱${product.price}</p>
        </div>
        <div class="product-actions">
            <button class="btn-icon add-to-cart" data-product-id="${product.id}">
                +
            </button>
        </div>
    `;
    return card;
};