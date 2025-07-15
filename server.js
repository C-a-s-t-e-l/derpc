const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); // Allow our frontend to make requests to this server



app.use(express.static(path.join(__dirname, 'public')));

// --- MOCK DATABASE ---
const mockProducts = [
    { id: 1, name: 'Ryzen 7 5800X', category: 'CPU', price: '12,500', isFeatured: true, imageUrl: 'https://via.placeholder.com/300/0a0a14/FFFFFF?text=CPU' },
    { id: 2, name: 'NVIDIA RTX 3070', category: 'GPU', price: '28,000', isFeatured: true, imageUrl: 'https://via.placeholder.com/300/0a0a14/FFFFFF?text=GPU' },
    { id: 3, name: 'Corsair Vengeance 16GB', category: 'RAM', price: '3,500', isFeatured: false, imageUrl: 'https://via.placeholder.com/300/0a0a14/FFFFFF?text=RAM' },
    { id: 4, name: 'Samsung 980 Pro 1TB', category: 'Storage', price: '5,500', isFeatured: true, imageUrl: 'https://via.placeholder.com/300/0a0a14/FFFFFF?text=SSD' },
    { id: 5, name: 'ASUS ROG Strix B550-F', category: 'Motherboard', price: '9,800', isFeatured: false, imageUrl: 'https://via.placeholder.com/300/0a0a14/FFFFFF?text=MOBO' },
    { id: 6, name: 'NZXT H510 Flow', category: 'Case', price: '4,200', isFeatured: true, imageUrl: 'https://via.placeholder.com/300/0a0a14/FFFFFF?text=CASE' }
];

// --- API ENDPOINTS ---

// Endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(mockProducts);
});

// Endpoint to get only featured products
app.get('/api/products/featured', (req, res) => {
    const featured = mockProducts.filter(p => p.isFeatured);
    res.json(featured);
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Mock API server is running on http://localhost:${PORT}`);
});