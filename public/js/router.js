import HomePage from './views/HomePage.js';
import ProductsPage from './views/ProductsPage.js';
import ProductDetailPage from './views/ProductDetailPage.js';
import CheckoutPage from './views/CheckoutPage.js'; // <-- ADD THIS LINE
import OrderStatusPage from './views/OrderStatusPage.js';
import AboutPage from './views/AboutPage.js';
import BuildsPage from './views/BuildsPage.js'

const mainContent = document.getElementById('app');

// Convert a path string to a regular expression for matching
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    if (!match.result) return {};
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

// The main router function
const router = async () => {
    const routes = [
    { path: "/", view: HomePage },
    { path: "/products", view: ProductsPage },
    { path: "/products/:id", view: ProductDetailPage },
    { path: "/checkout", view: CheckoutPage }, // <-- Add this
    { path: "/order/:status", view: OrderStatusPage }, // <-- Add this for success/pending
     { path: "/about", view: AboutPage },       // <-- ADD THIS
        { path: "/builds", view: BuildsPage }, 
    { path: "/order/:status/:orderId", view: OrderStatusPage },
];

    // Find the matching route
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: window.location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    // If no route matches, default to a 404 view
    if (!match) {
        match = {
            route: routes[0], // Or a dedicated 404 route
            result: [window.location.pathname]
        };
        mainContent.innerHTML = '<h1>404 Not Found</h1>';
        return;
    }

    const params = getParams(match);
    const view = match.route.view(params);; // Pass the ID to the detail page view

    mainContent.innerHTML = '';
    mainContent.appendChild(view);
};

// --- NAVIGATION HANDLING ---

// A function to handle navigation without page reloads
export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

// Listen for browser back/forward navigation
window.addEventListener('popstate', router);

// Listen for our custom navigation event
window.addEventListener('navigate', e => {
    navigateTo(e.detail);
});

// Initial call to the router to render the initial page
document.addEventListener('DOMContentLoaded', () => {
    // Intercept all clicks on links with data-link attribute
    document.body.addEventListener('click', e => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.href);
        }
    });

    router();
});