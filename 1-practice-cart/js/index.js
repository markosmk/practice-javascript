// 1) Defino nodos a utilizar
const productsDOM = document.getElementById('products');
const cartDOM = document.getElementById('cart');
const totalDOM = document.getElementById('total');

// 2) Defino vistas a reutilizar
const viewItemProduct = (item) => {
  return `
  <div class="item-product" onclick="addToCart(${item.id})">
    ${item.id} - ${item.nombre}
    <div>
      <span>Price: $${item.precio.toFixed(2)}</span>
    </div>
  </div>`;
};

const viewItemCart = (item) => {
  return `
  <div class="item-cart">
    <span>${item.nombre}</span>
    <div>
      <input type="number" value="${item.cant}" onchange="updateQuantityItemCart(this,${item.id})">
      <button class="delete" onclick="deleteItemFromCart(${item.id})">x</button>
    </div>
  </div>`;
};

function renderProducts() {
  products.forEach((item) => {
    productsDOM.innerHTML += viewItemProduct(item);
  });
}

// 3) ejecuto la function para mostrar todos los productos disponibles
renderProducts();

// 4) definimos los items del carrito y si hay datos los mostramos en el DOM
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
updateCart();

// 5) Funcion para actualizar datos del DOM Carrito
function updateCart() {
  // guardar en localstorage los cambios
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCartItems();
  renderTotal();
}

function renderCartItems() {
  cartDOM.innerHTML = ''; // limpiar antes de listar
  cartItems.forEach((item) => {
    cartDOM.innerHTML += viewItemCart(item);
  });
}

// calcular y render el total
function renderTotal() {
  let totalPrice = 0,
    totalItems = 0;

  cartItems.forEach((item) => {
    totalPrice += item.precio * item.cant;
    totalItems += item.cant;
  });
  totalDOM.innerHTML = `${totalPrice.toFixed(2)} (${totalItems} items)`;
}

// 6) Creamos las funciones que generan los cambios en el DOM

function addToCart(id) {
  // chekeamos si el producto existe en el carrito
  if (cartItems.some((item) => item.id === id)) {
    alert('El Producto ya existe en el carrito');
  } else {
    const item = products.find((item) => item.id === id);
    cartItems.push({ ...item, cant: 1 });
  }
  updateCart();
}

function updateQuantityItemCart(element, id) {
  cartItems = cartItems.map((item) => {
    let newCant = item.cant;
    if (item.id === id) {
      if (element.value >= 1 && element.value <= item.stock) {
        newCant = Number(element.value);
      }
    }
    return { ...item, cant: newCant };
  });
  updateCart();
}

function deleteItemFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  updateCart();
}
