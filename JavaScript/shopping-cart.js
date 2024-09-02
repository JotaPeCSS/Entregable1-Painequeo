// shopping-cart.js

// Object to manage the shopping cart state
const shoppingCart = {
    items: [],

    // Initialize the cart functionality
    initializeCart() {
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
    },

    // Add a product to the cart
    addToCart(productId) {
        // Fetch product details from the products.json file
        fetch('./data/products.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    this.items.push(product);
                    this.updateCart();
                }
            })
            .catch(error => {
                console.error('Error al añadir el producto al carrito:', error);
            });
    },

    // Update the cart display and total price
    updateCart() {
        const cartContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total');
        cartContainer.innerHTML = ''; // Clear existing items

        let total = 0;
        this.items.forEach(item => {
            const itemHTML = `
                <div class="cart-item">
                    <p>${item.name} - $${item.price}</p>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', itemHTML);
            total += item.price;
        });

        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
};

// Initialize the cart when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    shoppingCart.initializeCart();

    // Event delegation to handle clicks on "Add to Cart" buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-button')) {
            const productId = event.target.getAttribute('data-id');
            shoppingCart.addToCart(productId);
        }
    });
});
