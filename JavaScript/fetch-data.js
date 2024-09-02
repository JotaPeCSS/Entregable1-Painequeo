// Fetch Products Data
async function fetchProducts() {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos de los productos');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos. Por favor, inténtelo más tarde.',
        });
    }
}

// Render Products
async function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    const products = await fetchProducts();

    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <div class="placeholder"><img src="${product.image}" alt="${product.name}"></div>
                <p>${product.name} - $${product.price}</p>
                <label for="color-${product.id}">Color:</label>
                <select id="color-${product.id}">
                    <option value="rojo">Rojo</option>
                    <option value="azul">Azul</option>
                    <option value="verde">Verde</option>
                    <option value="amarillo">Amarillo</option>
                </select>
                <label for="size-${product.id}">Tamaño:</label>
                <select id="size-${product.id}">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <button class="add-to-cart-button" data-id="${product.id}" data-price="${product.price}">Añadir al carrito</button>
            </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}

// Initialize Products
renderProducts();
