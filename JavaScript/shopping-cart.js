// shopping-cart.js

// Inicialización del carrito de compras
class ShoppingCart {
    constructor() {
      this.cart = {};
      this.prices = {
        gorra: 5,
        camiseta: 10,
        chaqueta: 25
      };
      this.initializeCart();
    }
  
    initializeCart() {
      this.loadCartFromLocalStorage();
      this.updateCartDisplay();
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      document.getElementById("add-gorra")?.addEventListener("click", () => this.addToCart('gorra'));
      document.getElementById("add-camiseta")?.addEventListener("click", () => this.addToCart('camiseta'));
      document.getElementById("add-chaqueta")?.addEventListener("click", () => this.addToCart('chaqueta'));
      document.getElementById("checkout")?.addEventListener("click", () => this.checkout());
      document.getElementById("clear-cart")?.addEventListener("click", () => this.clearCart());
      document.getElementById("cart-button")?.addEventListener("click", () => this.toggleCart());
      document.getElementById("close-cart")?.addEventListener("click", () => this.closeCart());
    }
  
    generateKey(product, color, size) {
      return `${product}-${color}-${size}`;
    }
  
    addToCart(product) {
      const color = document.getElementById(`color-${product}`)?.value;
      const size = document.getElementById(`size-${product}`)?.value;
      if (!color || !size) return; // Exit if color or size is not selected
  
      const key = this.generateKey(product, color, size);
  
      if (!this.cart[key]) {
        this.cart[key] = { quantity: 0, product, color, size };
      }
  
      this.cart[key].quantity++;
      this.updateCartDisplay();
      this.saveCartToLocalStorage();
      this.toggleCart(); // Show cart when an item is added
    }
  
    updateCartDisplay() {
      const cartItemsContainer = document.getElementById("cart-items");
      cartItemsContainer.innerHTML = '';
  
      let total = 0;
  
      for (const [key, details] of Object.entries(this.cart)) {
        if (details && details.quantity > 0) {
          const item = document.createElement("div");
  
          // Ensure all properties exist and have values
          const productName = details.product ? details.product.charAt(0).toUpperCase() + details.product.slice(1) : 'Producto';
          const color = details.color || 'No especificado';
          const size = details.size || 'No especificado';
          const quantity = details.quantity || 0;
          const price = this.prices[details.product] || 0;
          const itemTotal = quantity * price;
  
          item.innerHTML = `
            <p>${productName}</p>
            <p>Color: ${color}</p>
            <p>Tamaño: ${size}</p>
            <p>Cantidad: ${quantity} x $${price} = $${itemTotal.toFixed(2)}</p>
            <button onclick="removeFromCart('${key}')">Eliminar</button>
          `;
          cartItemsContainer.appendChild(item);
          total += itemTotal;
        }
      }
  
      const totalElement = document.getElementById("total");
      if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
      }
  
      document.getElementById("checkout")?.disabled = Object.keys(this.cart).length === 0; // Disable checkout if cart is empty
  
      // Show message if cart is empty
      if (Object.keys(this.cart).length === 0) {
        cartItemsContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
      }
    }
  
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  
    loadCartFromLocalStorage() {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.cart = JSON.parse(cartData);
      }
    }
  
    clearCart() {
      this.cart = {};
      this.updateCartDisplay();
      this.saveCartToLocalStorage();
    }
  
    checkout() {
      if (Object.keys(this.cart).length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Carrito vacío',
          text: 'No puedes proceder al pago sin productos en el carrito.',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Compra exitosa',
          text: '¡Gracias por tu compra! Ahora serás redirigido a la página de pagos.',
        }).then(() => {
          this.closeCart(); // Close cart when checkout is complete
          localStorage.removeItem('cart'); // Clear cart from local storage after checkout
          window.location.href = 'https://example.com/pago'; // Replace with actual payment page URL
        });
      }
    }
  
    toggleCart() {
      const cartContainer = document.getElementById("cart-container");
      if (cartContainer) {
        if (cartContainer.classList.contains('cart-hidden')) {
          cartContainer.classList.remove('cart-hidden');
          cartContainer.classList.add('cart-visible');
        }
      }
    }
  
    closeCart() {
      const cartContainer = document.getElementById("cart-container");
      if (cartContainer) {
        cartContainer.classList.remove('cart-visible');
        cartContainer.classList.add('cart-hidden');
      }
    }
  }
  
  const shoppingCart = new ShoppingCart();
  
  function removeFromCart(key) {
    if (shoppingCart.cart[key]) {
      shoppingCart.cart[key].quantity--;
      if (shoppingCart.cart[key].quantity <= 0) {
        delete shoppingCart.cart[key];
      }
      shoppingCart.updateCartDisplay();
      shoppingCart.saveCartToLocalStorage();
    }
  }
  
