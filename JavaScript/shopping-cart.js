// shopping-cart.js

// Variables globales
const cart = document.getElementById('cart');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const totalElement = document.getElementById('total');

let cartItems = []; // Array para almacenar los productos del carrito
let products = []; // Array para almacenar los datos de los productos

// Función para inicializar el carrito de compras
function initializeCart() {
    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            cart.classList.toggle('cart-hidden');
            cart.classList.toggle('cart-visible');
        });
    } else {
        console.error('Botón para cerrar el carrito no encontrado');
    }
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    // Buscar el producto en el array de productos
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Verificar si el producto ya está en el carrito
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    // Actualizar el carrito
    updateCart();
}

// Función para actualizar la visualización del carrito
function updateCart() {
    // Limpiar el contenedor de productos del carrito
    cartItemsContainer.innerHTML = '';

    // Añadir los productos al carrito
    let total = 0;
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemHTML = `
            <div class="cart-item">
                <p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    // Actualizar el total
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para cargar los productos y configurar los eventos de añadir al carrito
async function initializeProducts() {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos de los productos');
        }
        products = await response.json();
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los productos. Por favor, inténtelo más tarde.',
        });
    }
}

// Inicializar el carrito de compras y cargar los productos al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    initializeCart();
    await initializeProducts();

    // Añadir evento a los botones de añadir al carrito
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-button')) {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        }
    });
});
