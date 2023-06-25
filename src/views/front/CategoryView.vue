<script>
const {VITE_URL,VITE_PATH} = import.meta.env
import { mapActions } from 'pinia';
import cartStore from '../../stores/cart';
import { RouterLink } from 'vue-router'
export default {
  data() {
    return {
      products:[]
    }
  },
  components:{ 
    RouterLink,
  },
  methods: {
    // 取得所有產品資料
    getProducts(){
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
        .then((res) => {
            this.products = res.data.products
        })
    },
    ...mapActions(cartStore,['addToCart'])
  },
  computed:{
    filteredProducts() {
      const category = this.$route.params.category; //從 ProductView.vue 取得參數
      if (category === '全部' || !category) { //當 category === '全部' , 直接返回完整的this.products
        return this.products;
      } else {
        return this.products.filter(product => product.category === category); //找出符合的category,回傳一個新陣列,不影響原陣列
      }
    },
    
  },
  mounted() {
    this.getProducts()
  },
}
</script>

<template>
    <!-- 商品內容 -->
    <div class="col">
            <div
              class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4"
            >
              <div class="col mb-5" v-for="product in filteredProducts" :key="product.id">
                <div class="card h-100 shadow-sm">
                  <div style="height: 200px;">
                    <img
                    :src="product.imageUrl"
                    class="card-img-top w-100 h-100"
                    alt="product.title"
                    style="object-fit: cover;"
                  />
                  </div>
                  

                  <div class="card-body text-center">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="card-text">NT ${{ product.price }}</p>
                  </div>
                  <div class="card-body">
                    <RouterLink :to="`/product/${product.id}`" class="card-link btn btn-primary btn-sm float-start"><i class="bi bi-search pe-1"></i>查看更多</RouterLink>
                    <button
                      type="button"
                      class="card-link btn btn-primary btn-sm float-end"
                      @click="addToCart(product.id)"
                    >
                      <i class="bi bi-cart-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>