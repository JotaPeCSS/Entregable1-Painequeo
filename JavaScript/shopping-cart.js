// shopping-cart.js

let cart = []; // Array para almacenar los productos del carrito

// Función para inicializar el carrito de compras
function initializeCart() {
    const cartElement = document.getElementById('cart');
    const closeCartButton = document.getElementById('close-cart');
    const openCartButton = document.getElementById('open-cart');

    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            cartElement.classList.toggle('cart-hidden');
            cartElement.classList.toggle('cart-visible');
        });
    } else {
        console.error('Botón para cerrar el carrito no encontrado');
    }

    if (openCartButton) {
        openCartButton.addEventListener('click', () => {
            cartElement.classList.toggle('cart-hidden');
            cartElement.classList.toggle('cart-visible');
        });
    } else {
        console.error('Botón para abrir el carrito no encontrado');
    }

    // Renderizar el carrito al inicializar
    renderCart();
}

// Función para añadir un producto al carrito
function addToCart(productId, price) {
    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // Si el producto ya está, incrementar la cantidad
        existingProduct.quantity += 1;
    } else {
        // Si el producto no está, añadirlo al carrito
        cart.push({ id: productId, quantity: 1, price });
    }

    // Renderizar el carrito actualizado
    renderCart();
}

// Función para renderizar el carrito
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    // Limpiar el contenedor del carrito
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemHTML = `
            <div class="cart-item">
                <p>Producto ID: ${item.id}</p>
                <p>Cantidad: ${item.quantity}</p>
                <p>Precio Unitario: $${item.price.toFixed(2)}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);

        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Inicializar el carrito de compras al cargar la página
document.addEventListener('DOMContentLoaded', initializeCart);

// Añadir evento a los botones de añadir al carrito
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-button')) {
        const productId = event.target.getAttribute('data-id');
        const productPrice = parseFloat(event.target.getAttribute('data-price'));

        addToCart(productId, productPrice);
    }
});
