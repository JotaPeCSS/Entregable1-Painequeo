// fetch-data.js

// Función para obtener los datos de los productos desde el archivo JSON
async function fetchProducts() {
    try {
        const response = await fetch('data/products.json');
        
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en fetchProducts:', error);
        return [];
    }
}

// Función para renderizar los productos en la interfaz
async function renderProducts() {
    try {
        const products = await fetchProducts();
        const productsContainer = document.getElementById('products-container');
        
        if (!productsContainer) {
            throw new Error('No se encontró el contenedor de productos.');
        }

        productsContainer.innerHTML = products.map(product => `
            <div class="product">
                <div class="placeholder">${product.name}</div>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <button data-id="${product.id}" class="add-to-cart">Añadir al carrito</button>
            </div>
        `).join('');

        // Agregar event listeners a los botones de añadir al carrito
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                addToCart(productId);
            });
        });
    } catch (error) {
        console.error('Error en renderProducts:', error);
    }
}

// Llamar a renderProducts cuando el documento esté listo
document.addEventListener('DOMContentLoaded', renderProducts);
