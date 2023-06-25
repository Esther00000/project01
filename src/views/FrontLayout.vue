<script>
    import { RouterView, RouterLink } from 'vue-router'
    import { mapActions, mapState } from 'pinia'; 
    import cartStore from '../stores/cart';
    export default {
      components:{ 
        RouterView,
        RouterLink,
      },
      computed:{
        ...mapState(cartStore,['carts','totalQty']),
      },
      methods: {
        ...mapActions(cartStore,['getCart']),
      },
      mounted() {
        this.getCart()
      },
    }
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div class="container">
          <!-- logo -->
          <RouterLink to="/" class="navbar-brand text-primary"><img src="/images/navbar/logo.png" class="w-50 " alt="" /></RouterLink>
          <!-- <a class="navbar-brand text-primary" href="#">
            <img src="/images/navbar/logo.png" class="w-50 " alt="">
          </a> -->
          <!-- menu-btn for mobile -->
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- menu content -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- menu List -->
            <!-- ms-auto : 列表向右靠 -->
            <ul class="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
              <li class="nav-item mx-3">
                <RouterLink to="/" class="nav-link fs-3">首頁</RouterLink>
              </li>
              <li class="nav-item mx-3">
                <RouterLink to="/products" class="nav-link fs-3">產品列表</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/cart" class="btn btn-outline-primary border-0 ">
                  <i class="bi bi-cart-fill fs-2 position-relative">
                    <span class="position-absolute top-50 start-50 translate-middle  badge rounded-pill fs-5">
                    {{ totalQty }}
                  </span>
                  </i>
                  <span class="d-lg-none">購物車</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
    </nav>
    
    <RouterView></RouterView>

    <footer>
      <div class="container pt-5">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h2 class="text-primary text-center mb-4">\ 鬆餅專賣店 /</h2>
            <div class="text-center">
              <img src="/images/navbar/logo.png" class="img-fluid" alt="" />
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="my-3">
              <ul class="list-unstyled">
                <li class="mb-2">聯絡專線 : <span>0800-123-456</span></li>
                <li class="mb-2">服務店址 : <span>XX市XX區XX路XX巷</span></li>
                <li class="mb-2">
                  營業時間 : <span>10: 30～21:00（每週四公休）</span>
                </li>
              </ul>
              <div class="row row-cols-1">
                <div class="col">
                  <ul class="list-unstyled d-flex">
                    <li><span class="me-2">Follow Us</span></li>
                    <li><i class="bi bi-instagram p-1"></i></li>
                    <li><i class="bi bi-facebook p-1"></i></li>
                    <li><i class="bi bi-envelope p-1"></i></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- copyright -->
          <div class="col-12 text-center mt-3">
            <h5>Copyright © 2023 僅個人作品使用，無任何商業用途</h5>
          </div>
        </div>
      </div>
    </footer>
</template>

<style>
  .overlay {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
      }

      .card:hover .overlay {
        opacity: 1;
      }
</style>
                