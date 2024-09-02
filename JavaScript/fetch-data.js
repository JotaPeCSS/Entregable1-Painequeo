// fetch-data.js

// Función para obtener productos desde un archivo JSON
async function fetchProducts() {
    try {
      const response = await fetch('data/products.json'); // Asegúrate de que esta ruta sea correcta
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error en fetchProducts:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar los productos',
        text: 'No se pudieron cargar los productos. Intenta nuevamente más tarde.',
      });
      return []; // Retorna un array vacío en caso de error
    }
  }
  
  // Función para renderizar productos en el DOM
  async function renderProducts() {
    const products = await fetchProducts();
    const productsContainer = document.getElementById('products-container');
  
    if (!productsContainer) {
      console.error('No se encontró el contenedor de productos en el DOM.');
      return;
    }
  
    productsContainer.innerHTML = '';
  
    // Asegúrate de que products sea un array
    if (Array.isArray(products)) {
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
          <div class="placeholder">
            <img src="${product.imageUrl}" alt="${product.name}" />
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Precio: $${product.price.toFixed(2)}</p>
          <button onclick="addToCart('${product.id}')">Añadir al carrito</button>
        `;
        productsContainer.appendChild(productElement);
      });
    } else {
      console.error('El formato de los productos no es válido.');
    }
  }
  
  // Inicializar la renderización de productos cuando el DOM esté cargado
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
  });
  
