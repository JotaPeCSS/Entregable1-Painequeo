// script.js

// Variables globales
let cart = []; // Array para almacenar los productos en el carrito

// Función para actualizar el carrito
function updateCart() {
    const cartContainer = document.querySelector('#cart-items');
    const totalElement = document.querySelector('#total');

    // Vacía el contenedor del carrito antes de actualizarlo
    cartContainer.innerHTML = '';

    // Calcula el total
    let total = 0;

    cart.forEach(product => {
        // Crea el HTML para cada producto en el carrito
        const cartItemHTML = `
            <div class="cart-item">
                <span>${product.name}</span>
                <span>${product.price} USD</span>
                <button data-id="${product.id}" class="remove-from-cart">Eliminar</button>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);

        // Suma el precio al total
        total += product.price;
    });

    // Actualiza el total en la interfaz de usuario
    totalElement.textContent = `Total: ${total.toFixed(2)} USD`;
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    // Busca el producto en el array de productos
    const product = products.find(p => p.id === productId);

    // Verifica si el producto existe
    if (product) {
        // Añade el producto al carrito
        cart.push(product);
        // Actualiza el carrito en la interfaz de usuario
        updateCart();
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    // Filtra el carrito para eliminar el producto con el ID proporcionado
    cart = cart.filter(p => p.id !== productId);
    // Actualiza el carrito en la interfaz de usuario
    updateCart();
}

// Función para manejar los clics en el carrito
function handleCartActions(event) {
    const button = event.target;

    // Verifica si el botón clickeado es un botón para eliminar del carrito
    if (button.classList.contains('remove-from-cart')) {
        const productId = parseInt(button.getAttribute('data-id'), 10);
        removeFromCart(productId);
    }
}

// Función para manejar los clics en los botones de añadir al carrito
function handleAddToCartButtons(event) {
    const button = event.target;

    // Verifica si el botón clickeado es un botón para añadir al carrito
    if (button.tagName === 'BUTTON') {
        const productId = parseInt(button.getAttribute('data-id'), 10);
        addToCart(productId);
    }
}

// Inicializa la interfaz de usuario
function initialize() {
    // Maneja los clics en el carrito
    document.querySelector('#cart-items').addEventListener('click', handleCartActions);
    // Maneja los clics en los botones de añadir al carrito
    document.querySelector('.products-container').addEventListener('click', handleAddToCartButtons);

    // Llama a renderProducts para mostrar los productos al cargar la página
    renderProducts();
}

// Llama a initialize cuando la página esté cargada
document.addEventListener('DOMContentLoaded', initialize);
