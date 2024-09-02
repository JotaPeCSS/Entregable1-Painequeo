// Clase del Carrito de Compras
class ShoppingCart {
  constructor() {
    this.cart = {}; // Usa un objeto para almacenar los artículos dinámicamente
    this.init();
  }

  init() {
    this.loadCartFromLocalStorage();
    this.updateCartDisplay();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById("checkout").addEventListener("click", () => this.checkout());
    document.getElementById("clear-cart").addEventListener("click", () => this.clearCart());
    document.getElementById("cart-button").addEventListener("click", () => this.toggleCart());
    document.getElementById("close-cart").addEventListener("click", () => this.closeCart());
  }

  generateKey(product, color, size) {
    return `${product}-${color}-${size}`;
  }

  addToCart(product) {
    const color = document.getElementById(`color-${product}`).value;
    const size = document.getElementById(`size-${product}`).value;
    const key = this.generateKey(product, color, size);

    if (!this.cart[key]) {
      this.cart[key] = { quantity: 0, product, color, size };
    }

    this.cart[key].quantity++;
    this.updateCartDisplay();
    this.saveCartToLocalStorage();
    this.toggleCart(); // Mostrar carrito cuando se agrega un artículo
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = '';

    let total = 0;

    for (const [key, details] of Object.entries(this.cart)) {
      if (details && details.quantity > 0) {
        const item = document.createElement("div");

        const productName = details.product ? details.product.charAt(0).toUpperCase() + details.product.slice(1) : 'Producto';
        const color = details.color ? details.color : 'No especificado';
        const size = details.size ? details.size : 'No especificado';
        const quantity = details.quantity || 0;
        const price = details.price || 0;
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

    document.getElementById("checkout").disabled = Object.keys(this.cart).length === 0; // Deshabilitar pago si el carrito está vacío

    if (Object.keys(this.cart).length === 0) {
      cartItemsContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
  }

  loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('shoppingCart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.classList.toggle("cart-hidden");
    cartContainer.classList.toggle("cart-visible");
  }

  closeCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.classList.add("cart-hidden");
    cartContainer.classList.remove("cart-visible");
  }

  clearCart() {
    this.cart = {};
    this.updateCartDisplay();
    this.saveCartToLocalStorage();
    Swal.fire({
      icon: 'info',
      title: 'Carrito vaciado',
      text: 'El carrito ha sido vaciado.',
    });
  }

  checkout() {
    // Aquí deberías implementar el proceso de pago
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada',
      text: 'Gracias por tu compra.',
    });
    this.clearCart();
  }
}

// Instancia del carrito
const shoppingCart = new ShoppingCart();

// Función para eliminar del carrito desde el DOM
function removeFromCart(key) {
  delete shoppingCart.cart[key];
  shoppingCart.updateCartDisplay();
  shoppingCart.saveCartToLocalStorage();
}
