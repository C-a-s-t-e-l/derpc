import { getFeaturedProducts } from '../api.js';
import ProductCard from '../components/ProductCard.js';

export default () => {
    const pageElement = document.createElement('div');
    pageElement.classList.add('homepage-container');

    pageElement.innerHTML = `
        <section class="hero-section">
            <h1>DRE Blueprint</h1>
            <p>High-Performance Systems, Precision Engineered.</p>
            <a href="/products" class="btn btn-primary" data-link>Browse All Components</a>
        </section>
        <section class="featured-products">
            <h2>Featured Components</h2>
            <div class="product-grid" id="featured-grid">
                <div class="loading-pulse"></div>
            </div>
        </section>
        <section class="component-matrix">
            <h2>Component Matrix</h2>
            <div class="grid">
                <div class="grid-item" data-category="CPU">CPUs</div>
                <div class="grid-item" data-category="GPU">GPUs</div>
                <div class="grid-item" data-category="Motherboard">Motherboards</div>
                <div class="grid-item" data-category="RAM">RAM</div>
                <div class="grid-item" data-category="Storage">Storage</div>
                <div class="grid-item" data-category="Case">Cases</div>
            </div>
        </section>
    `;

    const featuredGrid = pageElement.querySelector('#featured-grid');
    getFeaturedProducts().then(products => {
        featuredGrid.innerHTML = '';
        if (products && products.length > 0) {
            products.forEach(product => {
                const card = ProductCard(product);
                featuredGrid.appendChild(card);
            });
        } else {
            featuredGrid.innerHTML = '<p>Could not load featured products.</p>';
        }
    });

    return pageElement;
};