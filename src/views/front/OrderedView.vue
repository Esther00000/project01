<template>
  <header
  class="d-flex align-items-center justify-content-center position-relative py-5"
  style="top: 56px"
>
  <div class="text-primary m-auto">
    <h3 class="fw-bold text-center">訂購資料</h3>
  </div>
</header>
<div class="container">
  <div class="card my-5 mx-auto shadow" style="max-width: 500px;">
    <div class="card-body text-center">
      <div class="display-3 text-success"><i class="bi bi-check-circle"></i></div>
      <h2 class="card-text my-4">訂購成功</h2>
      <RouterLink to="/products" class="btn btn-primary">繼續購物</RouterLink>
      <!-- <a href="#" class="btn btn-primary">繼續購物</a> -->
    </div>
  </div>
</div>
    
</template>

<script>
  import { RouterLink } from 'vue-router';
  export default {
    components:{
      RouterLink
    }
  }
</script>