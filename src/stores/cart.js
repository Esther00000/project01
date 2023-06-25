import { defineStore } from "pinia";
import axios from "axios";
const { VITE_URL, VITE_PATH } = import.meta.env;
const cartStore = defineStore("cart", {
  state: () => ({
    carts: [],
    totalQty: 0,
    totalPrice: 0,
  }),
  actions: {
    // 取得購物車
    getCart() {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart`;
      axios
        .get(url)
        .then((res) => {
          this.carts = res.data.data.carts;
          // this.productAmount();
        })
        .catch((err) => {
          alert(err.res.data.message);
        });
    },
    // 加入購物車
    addToCart(dataId, qty = 1) {
      // 要更新的資源的 URL
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart`;
      // 要傳遞的資料,更新的屬性和值
      const cart = {
        product_id: dataId,
        qty: qty,
      };
      axios
        .post(url, { data: cart })
        .then((res) => {
          this.getCart();
          console.log("this.carts:" + this.carts);
          console.log("addToCart" + res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCart(data) {
      // 要更新的資源的 URL
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart/${data.id}`;
      // 要傳遞的資料,更新的屬性和值
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      axios
        .put(url, { data: cart })
        .then((res) => {
          this.getCart();
          console(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // productAmount() {
    //   //加總購買數量
    //   this.totalQty = this.carts.reduce((total, item) => {
    //     return total + item.qty;
    //   }, 0);
    // },
    deletProduct(id) {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`;
      axios
        .delete(url)
        .then((res) => {
          this.getCart();
          console.log("deletProduct" + res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletAllProducts() {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/carts`;
      axios
        .delete(url)
        .then((res) => {
          this.getCart();
          console.log("deletAllProduct" + res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    productAmount() {
      return (this.totalQty = this.carts.reduce((total, item) => {
        return total + item.qty;
      }, 0));
    },
    Pricetotal() {
      return (this.totalPrice = this.carts.reduce((total, item) => {
        return total + item.total;
      }, 0));
    },
  },
});

export default cartStore;
