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
      this.list.push({ ...item, cant: 1 });
    }
    this.updateChanges();
  }

  updateQuantityItem(id, cant) {
    let cartItems = this.list.map((item) => {
      let newCant = item.cant;
      if (item.id === Number(id)) {
        if (cant >= 1 && cant <= item.stock) {
          newCant = Number(cant);
        }
      }
      return { ...item, cant: newCant };
    });

    this.updateChanges(cartItems);
  }

  deteleItem(id) {
    let newCartItems = this.list.filter((item) => item.id !== Number(id));
    this.updateChanges(newCartItems);
  }

  calculateTotal() {
    let totalPrice = 0,
      totalItems = 0;
    // TODO: intentar hacerlo mas simple con reduce()
    this.list.forEach((item) => {
      totalPrice += item.precio * item.cant;
      totalItems += item.cant;
    });
    this.numberItems = totalItems;
    this.total = totalPrice;
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
