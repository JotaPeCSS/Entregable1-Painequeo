let cart = {
  gorra: 0,
  camiseta: 0,
  chaqueta: 0,
};

const prices = {
  gorra: 5,
  camiseta: 10,
  chaqueta: 25,
};

function addToCart(product) {
  if (cart.gorra + cart.camiseta + cart.chaqueta >= 10) {
    alert("No se pueden agregar más de 10 productos en total");
    return;
  }
  cart[product]++;
  console.log("Cart after addToCart:", cart); // Verifica el estado del carro
  updateCartDisplay();
}

function updateCart(product, action) {
  if (action === "add") {
    if (cart.gorra + cart.camiseta + cart.chaqueta >= 10) {
      alert("No se pueden agregar más de 10 productos en total");
      return;
    }
    cart[product]++;
  } else if (action === "remove") {
    if (cart[product] > 0) {
      cart[product]--;
    }
  }
  console.log("Cart after updateCart:", cart); // Verificar el estado del carro
  updateCartDisplay();
}

function updateCartDisplay() {
  document.getElementById("gorra-count").innerText = cart.gorra;
  document.getElementById("camiseta-count").innerText = cart.camiseta;
  document.getElementById("chaqueta-count").innerText = cart.chaqueta;
  document.getElementById("total").innerText = (
    cart.gorra * prices.gorra +
    cart.camiseta * prices.camiseta +
    cart.chaqueta * prices.chaqueta
  ).toFixed(2);
}

function checkout() {
  alert("Ir a la página de pago (de mentiritas).");
}

function clearCart() {
  cart = {
    gorra: 0,
    camiseta: 0,
    chaqueta: 0,
  };
  console.log("Cart after clearCart:", cart); // Verificar el estado del carro
  updateCartDisplay();
}

// Inicializa la pantalla del carro
updateCartDisplay();
