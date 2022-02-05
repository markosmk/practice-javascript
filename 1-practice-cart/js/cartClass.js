class Cart {
  constructor() {
    this.list = JSON.parse(localStorage.getItem('cart')) || [];
    this.total = 0;
    this.numberItems = 0;
  }

  listItems() {
    return this.list;
  }

  // comprobar si existe item en el carrito
  checkIfExistsInList(ide) {
    const id = Number(ide);
    return this.list.some((item) => item.id === id);
  }

  addItem(id) {
    // chekeamos si el producto existe
    const item = products.find((item) => item.id === Number(id));
    if (item) {
      //const newItem = Object.assign(item, { cant: 1 });
      //this.list.push(newItem); {
      this.list.push({ ...item, cant: 1 });
    }
    this.updateChanges();
  }

  updateQuantityItem(id, cant) {
    let cartItems = this.list.map((item) => {
      if (item.id === Number(id)) {
        if (cant >= 1 && cant <= item.stock) {
          item.cant = Number(cant);
        }
      }
      return item;
    });

    this.updateChanges(cartItems);
  }

  deteleItem(id) {
    let newCartItems = this.list.filter((item) => item.id !== Number(id));
    this.updateChanges(newCartItems);
  }

  calculateTotal() {
    // 1) Opcion con forEach
    /*
    let totalPrice = 0 = totalItems = 0;
    this.list.forEach((item) => {
      totalPrice += item.precio * item.cant;
      totalItems += item.cant;
    });
    this.total = totalPrice;
    this.numberItems = totalItems;

    // 2) Opcion con Doble Reduce
    // para obtener el precio total
    this.total = this.list.reduce((item, val) => {
      return item + (val.precio * val.cant);
    }, 0);
    // para obtener el total de items
    this.numberItems = this.list.reduce((item, val) => {
      return item.cant + val.cant;
    });
  */
    // 3) Opcion con 1 reduce -> return { total: 000.00, items: 00 }
    let amount = this.list.reduce(
      function (item, val) {
        item.total = item.total + val.precio * val.cant;
        item.items = item.items + val.cant;
        return item;
      },
      { total: 0, items: 0 }
    );
    this.total = amount.total;
    this.numberItems = amount.items;

    /*
    // 4) Opcion con 1 reduce -> return [ totalPrice, totalItems]
    let amount = this.list.reduce(
      function (item, val) {
        item[0] = item[0] + val.precio * val.cant;
        item[1] = item[1] + val.cant;
        return item;
      },
      [0, 0]
    );
    this.total = amount[0];
    this.numberItems = amount[1];
   */
  }

  updateChanges(newList = null) {
    // si recibo una nueva lista la actualizo
    this.list = newList || this.list;
    // calculamos el total
    this.calculateTotal();
    // actualizamos datos el localStorage
    localStorage.setItem('cart', JSON.stringify(this.list));
  }
}
