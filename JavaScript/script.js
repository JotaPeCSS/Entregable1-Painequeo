class ShoppingCart {
  constructor() {
    // Inicializa el carrito con los productos y sus cantidades
    this.cart = {
      gorra: 0,
      camiseta: 0,
      chaqueta: 0,
    };

    // Define los precios de los productos
    this.prices = {
      gorra: 5,
      camiseta: 10,
      chaqueta: 25,
    };

    // Actualiza la visualización del carrito
    this.updateCartDisplay();

    // Carga el carrito desde localStorage si existe
    this.loadCartFromLocalStorage();
  }

  // Agrega un producto al carrito
  addToCart(product) {
    // Si el total de productos es 10, muestra un mensaje de alerta
    if (this.getTotalItems() >= 10) {
      alert("No se pueden agregar más de 10 productos en total");
      return;
    }

    // Incrementa la cantidad del producto seleccionado
    this.cart[product]++;
    this.updateCartDisplay();
    this.saveCartToLocalStorage();
    this.checkCheckoutButton(); // Revisa si activar el botón de checkout
  }

  // Calcula el total de productos en el carrito
  getTotalItems() {
    return Object.values(this.cart).reduce((sum, count) => sum + count, 0);
  }

  // Actualiza la visualización del carrito en el DOM
  updateCartDisplay() {
    document.getElementById("gorra-count").innerText = this.cart.gorra;
    document.getElementById("camiseta-count").innerText = this.cart.camiseta;
    document.getElementById("chaqueta-count").innerText = this.cart.chaqueta;
    document.getElementById("total").innerText =
      this.calculateTotal().toFixed(2);
  }

  // Calcula el total en precio del carrito
  calculateTotal() {
    return (
      this.cart.gorra * this.prices.gorra +
      this.cart.camiseta * this.prices.camiseta +
      this.cart.chaqueta * this.prices.chaqueta
    );
  }

  // Muestra un mensaje de checkout en el DOM
  checkout() {
    const messageElement = document.getElementById("message");
    messageElement.innerText = "Ir a la página de pago (de mentiritas).";
    messageElement.style.display = "block";

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      messageElement.style.display = "none";
    }, 3000);
  }

  // Vacía el carrito de compras
  clearCart() {
    this.cart = {
      gorra: 0,
      camiseta: 0,
      chaqueta: 0,
    };
    this.updateCartDisplay();
    this.saveCartToLocalStorage();
    this.checkCheckoutButton(); // Revisa si desactivar el botón de checkout
  }

  // Guarda el carrito en localStorage
  saveCartToLocalStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
  }

  // Carga el carrito desde localStorage
  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("shoppingCart");
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.updateCartDisplay();
    }
    this.checkCheckoutButton(); // Revisa si activar el botón de checkout
  }

  // Activa o desactiva el botón de checkout según el estado del carrito
  checkCheckoutButton() {
    const checkoutButton = document.getElementById("checkout");
    if (this.getTotalItems() > 0) {
      checkoutButton.disabled = false;
    } else {
      checkoutButton.disabled = true;
    }
  }
}

// Inicializa el carrito de compras
const cart = new ShoppingCart();

// Asigna los eventos a los botones
document
  .getElementById("add-gorra")
  .addEventListener("click", () => cart.addToCart("gorra"));
document
  .getElementById("add-camiseta")
  .addEventListener("click", () => cart.addToCart("camiseta"));
document
  .getElementById("add-chaqueta")
  .addEventListener("click", () => cart.addToCart("chaqueta"));
document
  .getElementById("checkout")
  .addEventListener("click", () => cart.checkout());
document
  .getElementById("clear-cart")
  .addEventListener("click", () => cart.clearCart());
