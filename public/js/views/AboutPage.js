export default () => {
    const pageElement = document.createElement('div');
    pageElement.classList.add('about-page-container');
    pageElement.innerHTML = `
        <div class="page-header">
            <h1>Engineering Performance</h1>
            <p>We're not just selling parts; we're building the future of high-performance computing.</p>
        </div>

        <section class="about-content">
            <div class="about-section">
                <img src="https://via.placeholder.com/800x400/1a202c/4299e1?text=DRE+Workspace" alt="DRE Workspace">
                <h2>Our Philosophy</h2>
                <p>
                    At DRE Computer Center, we believe that a computer is more than just a tool. It's the heart of your digital life—your gateway to new worlds, your canvas for creation, and your partner in productivity. That's why we obsess over every detail. From the quiet hum of a perfectly tuned fan to the seamless snap of a window opening, we are dedicated to crafting an unparalleled user experience.
                </p>
                <p>
                    Our approach is simple: curate the best components, test them rigorously for compatibility and performance, and provide transparent, expert guidance to help you build the machine of your dreams.
                </p>
            </div>

            <div class="why-dre-section">
                <div class="feature-box">
                    <div class="feature-icon">⚙️</div>
                    <h3>Expertly Curated</h3>
                    <p>Every component in our catalog is hand-picked and tested by our team of enthusiasts for maximum performance and reliability.</p>
                </div>
                <div class="feature-box">
                    <div class="feature-icon">🚀</div>
                    <h3>Built for Speed</h3>
                    <p>We engineer systems designed to push the limits, delivering the power you need for modern gaming, streaming, and content creation.</p>
                </div>
                <div class="feature-box">
                    <div class="feature-icon">🛠️</div>
                    <h3>Lifetime Support</h3>
                    <p>Our relationship doesn't end at checkout. We're here to provide expert support for the entire life of your machine.</p>
                </div>
            </div>
        </section>
    `;
    return pageElement;
};