export default () => {
    const pageElement = document.createElement('div');
    pageElement.classList.add('builds-page-container');
    pageElement.innerHTML = `
        <div class="page-header">
            <h1>Pre-Configured Blueprints</h1>
            <p>Engineered for excellence. Ready for deployment.</p>
        </div>

        <div class="builds-grid">
            <!-- Build Card 1: The Competitor -->
            <div class="build-card">
                <div class="build-card-header">
                    <h3>The Competitor</h3>
                    <span class="build-price">₱55,000</span>
                </div>
                <img src="https://via.placeholder.com/400x300/1a202c/FFFFFF?text=Competitor+Build" alt="The Competitor Build">
                <ul class="build-specs">
                    <li><strong>CPU:</strong> Ryzen 5 5600X</li>
                    <li><strong>GPU:</strong> NVIDIA RTX 3060</li>
                    <li><strong>RAM:</strong> 16GB DDR4 3200MHz</li>
                    <li><strong>Ideal for:</strong> High-FPS 1080p Gaming</li>
                </ul>
                <button class="btn btn-secondary">View Details</button>
            </div>

            <!-- Build Card 2: The Creator -->
            <div class="build-card">
                <div class="build-card-header">
                    <h3>The Creator</h3>
                    <span class="build-price">₱85,000</span>
                </div>
                <img src="https://via.placeholder.com/400x300/1a202c/FFFFFF?text=Creator+Build" alt="The Creator Build">
                <ul class="build-specs">
                    <li><strong>CPU:</strong> Intel Core i7-12700K</li>
                    <li><strong>GPU:</strong> NVIDIA RTX 3070</li>
                    <li><strong>RAM:</strong> 32GB DDR4 3600MHz</li>
                    <li><strong>Ideal for:</strong> 4K Video Editing & Streaming</li>
                </ul>
                <button class="btn btn-secondary">View Details</button>
            </div>
            
            <!-- Build Card 3: The Juggernaut -->
            <div class="build-card">
                <div class="build-card-header">
                    <h3>The Juggernaut</h3>
                    <span class="build-price">₱150,000</span>
                </div>
                <img src="https://via.placeholder.com/400x300/1a202c/FFFFFF?text=Juggernaut+Build" alt="The Juggernaut Build">
                <ul class="build-specs">
                    <li><strong>CPU:</strong> Ryzen 9 5900X</li>
                    <li><strong>GPU:</strong> NVIDIA RTX 3080 Ti</li>
                    <li><strong>RAM:</strong> 32GB DDR4 3600MHz</li>
                    <li><strong>Ideal for:</strong> Max-Setting 4K Gaming</li>
                </ul>
                <button class="btn btn-secondary">View Details</button>
            </div>
        </div>
    `;
    return pageElement;
};