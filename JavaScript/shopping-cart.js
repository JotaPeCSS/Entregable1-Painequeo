// shopping-cart.js

// Función para inicializar el carrito de compras
function initializeCart() {
    const cart = document.getElementById('cart');
    const closeCartButton = document.getElementById('close-cart');

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
    // Aquí iría la lógica para añadir el producto al carrito
    console.log(`Producto ${productId} añadido al carrito`);
}

// Inicializar el carrito de compras al cargar la página
document.addEventListener('DOMContentLoaded', initializeCart);

// Añadir evento a los botones de añadir al carrito
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-button')) {
        const productId = event.target.getAttribute('data-id');
        addToCart(productId);
    }
});
