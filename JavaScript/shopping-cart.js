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
        // Verificar si no se excede el límite de productos
        if (existingProduct.quantity < 10) {
            existingProduct.quantity += 1;
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Límite alcanzado',
                text: 'Solo puedes añadir hasta 10 unidades de un producto.',
            });
            return;
        }
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

// Función para eliminar una unidad de un producto del carrito
function decrementProductQuantity(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = cartItems.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
    } else if (product && product.quantity === 1) {
        removeFromCart(productId);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Función para vaciar el carrito
function emptyCart() {
    Swal.fire({
        title: 'Vaciar carrito',
        text: '¿Estás seguro de que quieres vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cartItems');
            renderCart();
            Swal.fire({
                icon: 'success',
                title: 'Carrito vacío',
                text: 'El carrito ha sido vaciado.',
            });
        }
    });
}

// Función para realizar la compra
function completePurchase() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'No puedes realizar una compra sin productos en el carrito.',
        });
        return;
    }
    
    // Redirigir a la página de venta (simulada)
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: 'Tu compra ha sido realizada con éxito.',
    }).then(() => {
        // Redirige a la página de venta (cambiar URL según sea necesario)
        window.location.href = './thank-you.html';
    });
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
                <button class="decrement-quantity" data-id="${item.id}">-</button>
                <button class="increment-quantity" data-id="${item.id}">+</button>
                <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
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
    } else if (event.target.classList.contains('decrement-quantity')) {
        const productId = event.target.getAttribute('data-id');
        decrementProductQuantity(productId);
    } else if (event.target.classList.contains('increment-quantity')) {
        const productId = event.target.getAttribute('data-id');
        addToCart(productId); // Reutiliza la función de añadir al carrito
    }
});

// Añadir eventos a los botones de vaciar carrito y realizar compra
document.getElementById('empty-cart-button').addEventListener('click', emptyCart);
document.getElementById('complete-purchase-button').addEventListener('click', completePurchase);
