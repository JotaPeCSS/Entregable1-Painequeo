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
    }

    if (cartButton) {
        cartButton.addEventListener('click', () => {
            cart.classList.toggle('cart-hidden');
            cart.classList.toggle('cart-visible');
        });
    }

    if (emptyCartButton) {
        emptyCartButton.addEventListener('click', () => {
            localStorage.removeItem('cartItems');
            renderCart();
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Aquí puedes manejar el proceso de compra
            alert('Proceso de compra no implementado.');
        });
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
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Filtra el carrito para eliminar el producto con el ID proporcionado
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, action) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = cartItems.find(item => item.id === productId);
    
    if (product) {
        if (action === 'increase') {
            product.quantity += 1;
        } else if (action === 'decrease') {
            product.quantity -= 1;
            if (product.quantity <= 0) {
                removeFromCart(productId);
                return;
            }
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    }
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
                <p>${item.name} - $${item.price} (${item.color}, ${item.size})</p>
                <div class="quantity">
                    <button data-id="${item.id}" class="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button data-id="${item.id}" class="increase">+</button>
                </div>
                <button data-id="${item.id}" class="remove">Eliminar</button>
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

// Añadir eventos a los botones dentro del carrito
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('increase')) {
        const productId = event.target.getAttribute('data-id');
        updateQuantity(productId, 'increase');
    } else if (event.target.classList.contains('decrease')) {
        const productId = event.target.getAttribute('data-id');
        updateQuantity(productId, 'decrease');
    } else if (event.target.classList.contains('remove')) {
        const productId = event.target.getAttribute('data-id');
        removeFromCart(productId);
    }
});
