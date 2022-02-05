// 1) Defino nodos a utilizar
const productsDOM = document.getElementById('products');
const cartDOM = document.getElementById('cart');
const totalDOM = document.getElementById('total');
// nodos dinamicos
const itemProducts = document.getElementsByClassName('item-product');

// 2) inicializo cart, para utilizar metodos
const cart = new Cart();

// 3) Defino vistas a reutilizar
const viewItemProduct = (item) => {
  return `
  <div class="item-product" data-id="${item.id}">
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
      <input type="number" class="update-cant" value="${item.cant}" data-id="${item.id}">
      <button class="delete" data-id="${item.id}">x</button>
    </div>
  </div>`;
};

function renderProducts() {
  products.forEach((item) => {
    productsDOM.innerHTML += viewItemProduct(item);
  });
}

// 4) ejecuto la function para mostrar todos los productos disponibles
renderProducts();

// 5) si hay datos en carrito los mostramos desde un inicio
updateCart();

function updateCart() {
  // guardar/leer cambios en localstorage y actualizar total/items
  cart.updateChanges();

  renderCartItems();
  renderTotal();
}

function renderTotal() {
  totalDOM.innerHTML = `${cart.total.toFixed(2)} (${cart.numberItems} items)`;
}

function renderCartItems() {
  // limpiar DOM antes de listar
  cartDOM.innerHTML = '';
  // listamos los items
  cart.listItems().forEach((item) => {
    cartDOM.innerHTML += viewItemCart(item);
  });
}

// 6) Evento Click para la lista de productos (Agrega un item al carrito)
if (itemProducts) {
  Array.from(itemProducts).forEach((item) => {
    item.addEventListener('click', () => {
      const idProduct = item.getAttribute('data-id');
      // chekeamos si el producto existe en el carrito
      if (cart.checkIfExistsInList(idProduct)) {
        alert('El Producto ya existe en el carrito');
      } else {
        cart.addItem(idProduct);
      }
      updateCart();
    });
  });
}

// 6) Evento Click para los elementos en el CartDOM
cartDOM.addEventListener('click', (e) => {
  // para eliminar un item del carrito
  if (e.target.matches('.delete')) {
    const idProduct = e.target.getAttribute('data-id');
    cart.deteleItem(idProduct);
    updateCart();
  }
  // para actualizar la cantidad de un item del carrito
  if (e.target.matches('.update-cant')) {
    const idProduct = e.target.getAttribute('data-id');
    const cant = e.target.value;
    cart.updateQuantityItem(idProduct, cant);
    updateCart();
  }
});
