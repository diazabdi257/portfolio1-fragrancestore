document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Hawas Ice",
        img: "hawasice.jpg",
        price: 100000,
        dprice: 150000,
      },
      {
        id: 2,
        name: "Hawas For Him",
        img: "hawashim.jpg",
        price: 50000,
        dprice: 150000,
      },
      {
        id: 3,
        name: "Monaco Royale",
        img: "monacoroyale.jpg",
        price: 70000,
        dprice: 150000,
      },
      {
        id: 4,
        name: "Afnan 9PM",
        img: "9pm.jpg",
        price: 40000,
        dprice: 150000,
      },
      {
        id: 5,
        name: "Turathi Electric",
        img: "electric.jpg",
        price: 80000,
        dprice: 150000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masih kosong
      if(!cartItem){
        this.items.push({...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if(item.id !== newItem.id) {
            return item;
          } else{
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        })
      }
    },
  });
});

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
