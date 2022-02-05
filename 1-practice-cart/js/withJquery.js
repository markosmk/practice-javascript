// 1) inicializo cart, para utilizar metodos
const cart = new Cart();

// 2) Defino vistas a reutilizar
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
    $('#products').append(viewItemProduct(item));
  });
}

// 3) ejecuto la function para mostrar todos los productos disponibles
renderProducts();

function updateCart() {
  // guardar/leer cambios en localstorage y actualizar total/items
  cart.updateChanges();
  renderCartItems();
  renderTotal();
}

// 4) si hay datos en carrito los mostramos desde un inicio
updateCart();

function renderTotal() {
  $('#total').html(`${cart.total.toFixed(2)} (${cart.numberItems} items)`);
}

function renderCartItems() {
  // limpiar DOM antes de listar
  $('#cart').empty();
  // listamos los items
  cart.listItems().forEach((item) => {
    $('#cart').append(viewItemCart(item));
  });
}

// 5) Eventos para agregar, eliminar y actualizar

// para eliminar un item del carrito
$('#products').on('click', '.item-product', function (e) {
  const idProduct = $(this).attr('data-id');
  // chekeamos si el producto existe en el carrito con metodo en POO
  if (cart.checkIfExistsInList(idProduct)) {
    alert('El Producto ya existe en el carrito');
  } else {
    cart.addItem(idProduct);
  }
  updateCart();
});

// para eliminar un item del carrito
$('#cart').on('click', 'button.delete', function (e) {
  const idProduct = $(this).attr('data-id');
  cart.deteleItem(idProduct);
  updateCart();
});

// para actualizar la cantidad de un item del carrito
$('#cart').on('change', 'input.update-cant', function (e) {
  const idProduct = $(this).attr('data-id');
  const cant = $(this).val();
  cart.updateQuantityItem(idProduct, cant);
  updateCart();
});
