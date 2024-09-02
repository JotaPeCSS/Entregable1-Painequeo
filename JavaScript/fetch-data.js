// fetch-data.js

// Función para obtener los productos desde el archivo JSON
async function fetchProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en fetchProducts:', error);
        // Mostrar mensaje UX si se desea
    }
}

// Función para renderizar los productos en la página
async function renderProducts() {
    const products = await fetchProducts();
    if (products) {
        const container = document.getElementById('products-container');
        container.innerHTML = products.map(product => `
            <div class="product">
                <div class="placeholder">${product.name}</div>
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-button" data-id="${product.id}">Añadir al carrito</button>
            </div>
        `).join('');
    }
}

// Renderizar productos al cargar la página
document.addEventListener('DOMContentLoaded', renderProducts);
