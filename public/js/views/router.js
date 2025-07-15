import HomePage from './views/HomePage.js';

const mainContent = document.getElementById('app');

const routes = {
    '/': HomePage,
    // Make sure there are no stray characters or incorrect paths here
};

const router = async () => {
    const path = window.location.pathname;
    const view = routes[path] || (() => mainContent.innerHTML = '<h1>404 Not Found</h1>');
    mainContent.innerHTML = '';
    mainContent.appendChild(view());
};

export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});