import { getAllProducts } from "../api.js";
import ProductCard from "../components/ProductCard.js";
import { addToCart } from '../cart.js'; 

export default () => {
  const pageElement = document.createElement("div");
  pageElement.classList.add("products-page-container");

  pageElement.innerHTML = `
        <section class="page-header">
            <h1>All Components</h1>
            <p>Browse our complete catalog of high-performance parts.</p>
        </section>
        <section class="product-grid" id="all-products-grid">
            <div class="loading-pulse"></div>
        </section>
    `;

  // --- DYNAMIC DATA FETCHING ---
  const productsGrid = pageElement.querySelector("#all-products-grid");

  getAllProducts().then((products) => {
    productsGrid.innerHTML = ""; // Clear loading state
    if (products && products.length > 0) {
      products.forEach((product) => {
        // ... inside the forEach loop
        const card = ProductCard(product);
        card.addEventListener("click", (e) => {
          if (e.target.closest(".add-to-cart")) {
            e.stopPropagation(); // Prevent navigating to detail page
            addToCart(product);
          } else {
            window.dispatchEvent(
              new CustomEvent("navigate", { detail: `/products/${product.id}` })
            );
          }
        });
        productsGrid.appendChild(card);
      });
    } else {
      productsGrid.innerHTML = "<p>Could not load products.</p>";
    }
  });

  return pageElement;
};
