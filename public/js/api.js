const API_BASE_URL = '/api';

async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch from API:", error);
        return null;
    }
}

export const getFeaturedProducts = () => fetchAPI('/products/featured');
export const getAllProducts = () => fetchAPI('/products');