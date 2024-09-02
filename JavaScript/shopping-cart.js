// shopping-cart.js

// Función para inicializar el carrito de compras
function initializeCart() {
    const cart = document.getElementById('cart');
    const closeCartButton = document.getElementById('close-cart');
    const cartButton = document.getElementById('cart-button'); // Botón para abrir el carrito

    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            cart.classList.remove('cart-visible');
            cart.classList.add('cart-hidden');
        });
    } else {
        console.error('Botón para cerrar el carrito no encontrado');
    }

    if (cartButton) {
        cartButton.addEventListener('click', () => {
            cart.classList.toggle('cart-hidden');
            cart.classList.toggle('cart-visible');
        });
    } else {
        console.error('Botón para abrir el carrito no encontrado');
    }
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productElement = document.getElementById(`add-${productId}`);
    const productName = productElement.closest('.product').querySelector('p').textContent;
    const productPrice = parseFloat(productElement.closest('.product').querySelector('p').textContent.split('$')[1]);
    const productColor = document.getElementById(`color-${productId}`).value;
    const productSize = document.getElementById(`size-${productId}`).value;
    
    // Verificar si el producto ya está en el carrito
    const existingProduct = cartItems.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            color: productColor,
            size: productSize,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    renderCart();
}

// Función para vaciar el carrito
function emptyCart() {
    localStorage.removeItem('cartItems');
    renderCart();
}

// Función para realizar la compra
function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Aquí podrías integrar una lógica para procesar la compra
    alert('Compra realizada con éxito.');

    // Vaciar el carrito después de la compra
    emptyCart();
}

// Función para renderizar el carrito
function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    cartContainer.innerHTML = '';

    let total = 0;

    cartItems.forEach(item => {
        const itemHTML = `
            <div class="cart-item">
                <p>${item.name} - $${item.price} (${item.color}, ${item.size}) x ${item.quantity}</p>
                <button data-id="${item.id}" class="remove-from-cart">Eliminar</button>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);
        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Inicializar el carrito de compras al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
    renderCart();
});

// Añadir eventos a los botones de añadir al carrito
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-button')) {
        const productId = event.target.getAttribute('data-id');
        addToCart(productId);
    } else if (event.target.classList.contains('remove-from-cart')) {
        const productId = event.target.getAttribute('data-id');
        removeFromCart(productId);
    }
});

// Añadir eventos a los botones de vaciar carrito y realizar compra
document.addEventListener('click', (event) => {
    if (event.target.id === 'empty-cart') {
        emptyCart();
    } else if (event.target.id === 'checkout') {
        checkout();
    }
});
