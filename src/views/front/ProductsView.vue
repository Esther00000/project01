<script>
import cartStore from '../../stores/cart';
import { mapState, mapActions } from 'pinia';
import { RouterView, RouterLink } from 'vue-router'
export default {
  data() {
    return {
      categories: ['全部', '鬆餅', '熟食', '飲料'],
    }
  },
  components:{ 
    RouterView,
    RouterLink,
  },
  computed:{
    ...mapState(cartStore,['carts'])
  },
  methods: {
    ...mapActions(cartStore,['addToCart'])
  },
  mounted() {
    if (this.$route.path === '/products') {  //跳轉至產品列表頁面時顯示全部產品
    this.$router.push('/category/全部');
    }
  },
}
</script>

<template>
    <div>
      <header
        class="d-flex align-items-center justify-content-center position-relative py-5"
        style="top: 56px"
      >
        <div class="container text-center text-primary m-auto">
          <p class="fs-5">專屬於您的美味體驗，讓您的味蕾陶醉其中</p>
          <h3 class="fw-bold text-center">品味獨特，令人難以忘懷</h3>
        </div>
      </header>
      <section class="container py-5">
        <div class="row row-cols-1">
          <!-- 商品分類 -->
          <div class="col py-3">
            <ul class="nav nav-pills justify-content-center">
              <li class="nav-item btn btn-primary me-3 p-0" v-for="category in categories" :key="category">
                <RouterLink class="nav-link text-white " :to="`/category/${category}`">{{ category }}</RouterLink>
              </li>
            </ul>
          </div>
          <RouterView></RouterView>
        </div>
        
      </section>
    </div>
</template>