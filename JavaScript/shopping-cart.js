// shopping-cart.js

// Función para inicializar el carrito de compras
function initializeCart() {
    const cart = document.getElementById('cart');
    const closeCartButton = document.getElementById('close-cart');
    const cartButton = document.getElementById('cart-button');
    const emptyCartButton = document.getElementById('empty-cart');
    const checkoutButton = document.getElementById('checkout');

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

    if (emptyCartButton) {
        emptyCartButton.addEventListener('click', () => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡Esto vaciará todos los productos del carrito!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, vaciar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('cartItems');
                    renderCart();
                    Swal.fire(
                        '¡Vacío!',
                        'El carrito ha sido vaciado.',
                        'success'
                    );
                }
            });
        });
    } else {
        console.error('Botón para vaciar el carrito no encontrado');
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            Swal.fire({
                title: '¡Compra realizada!',
                text: 'Gracias por tu compra. ¡Que tengas un buen día!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                localStorage.removeItem('cartItems');
                renderCart();
            });
        });
    } else {
        console.error('Botón para realizar la compra no encontrado');
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
                <button data-id="${item.id}" class="increase-quantity">+</button>
                <button data-id="${item.id}" class="decrease-quantity">-</button>
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

// Añadir eventos a los botones de añadir al carrito y los botones de carrito
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-button')) {
        const productId = event.target.getAttribute('data-id');
        addToCart(productId);
    }

    if (event.target.classList.contains('remove-from-cart')) {
        const productId = event.target.getAttribute('data-id');
        removeFromCart(productId);
    }

    if (event.target.classList.contains('increase-quantity')) {
        const productId = event.target.getAttribute('data-id');
        updateQuantity(productId, 1);
    }

    if (event.target.classList.contains('decrease-quantity')) {
        const productId = event.target.getAttribute('data-id');
        updateQuantity(productId, -1);
    }
});
