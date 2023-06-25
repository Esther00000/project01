<template>
    <div class="container position-relative py-5 " style="top: 56px">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent px-0 mb-0 py-3">
                <li class="breadcrumb-item"> <RouterLink to="/products" class="text-muted">產品列表</RouterLink></li>
                <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
        </nav>
        <div class="row justify-content-between" >
          <div class="col-md-6">
            <div>
              <img :src="product.imageUrl" class="w-100" style="height: 400px; object-fit: cover;" alt="">
            </div>
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-between">
            <h3 class="fw-bold text-primary">{{ product.title }}</h3>
            <div>
              <h5 class="fw-bold mb-2">商品介紹</h5>
              <p class="text-muted lh-lg">{{ product.description }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <div class="input-group mb-3 w-auto">
              <div class="input-group-prepend">
                <button type="button" class="btn btn-outline-secondary rounded-circle me-2" @click="decreaseQuantity" >
                  <i class="bi bi-dash"></i>
                </button>
              </div>
              <div style="width: 100px;">
                <input type="text" class="form-control text-center " v-model="quantity">
              </div>
              <div class="input-group-append">
                <button type="button" class="btn btn-outline-secondary rounded-circle ms-2"  @click="increaseQuantity" >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>

            <div class="fs-3 fw-bold">NT ${{ product.price }}</div>
            </div>
            <button type="button" class="col-md-6 btn btn-outline-primary" @click="addCart(product.id,quantity)">加入購物車</button>

          </div>
        </div>
      </div>
</template>

<script>
    const {VITE_URL,VITE_PATH} = import.meta.env
    import { RouterLink } from 'vue-router'
    import { mapActions, mapState} from 'pinia'; 
    import cartStore from '../../stores/cart';
    export default {
        data() {
            return {
                product:{},
                quantity: 1
            }
        },
        components:{
          RouterLink
        },
        methods: {
            getProduct() {
                console.log(this.$route.params.id)
                const { id } = this.$route.params
                this.$http
                    .get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`)
                    .then((res) => {
                        console.log(res)
                        this.product = res.data.product
                    })
            },
            decreaseQuantity() {
              if (this.quantity > 1) {
                this.quantity--; // 减少数量，但最低为1
              }
            },
            increaseQuantity() {
              if (this.quantity < 20) {
                this.quantity++;
              }
            },
            ...mapActions(cartStore, ['addToCart']),
            addCart(productId,quantity) {
              this.addToCart(productId,quantity); // 调用 store 的 addToCart 方法
            }
        },
        computed:{
          ...mapState(cartStore, ['carts'])
        },
        mounted() {
            this.getProduct()
        },
    }

</script>