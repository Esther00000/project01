<template>
    <header
        class="d-flex align-items-center justify-content-center position-relative py-5"
        style="top: 56px"
      >
        <div class="text-primary m-auto">
          <h3 class="fw-bold text-center">購物車</h3>
        </div>
      </header>

      <div class="container py-4 px-0">
        <div class="row py-5">
          <div class="col">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <div class="text-end">
                  <button class="btn btn-outline-light" type="button" @click="deletAllProducts">
                    清空購物車
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr class="align-middle">
                        <th scope="col"></th>
                        <th scope="col" class="text-wrap" style="width: 25%">
                          產品名稱
                        </th>
                        <th scope="col" class="text-nowrap">單價</th>
                        <th scope="col" class="text-nowrap" style="width: 30%">
                          數量
                        </th>
                        <th class="text-center text-nowrap" scope="col">
                          價格
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-nowrap">
                      <tr>
                        <td colspan="3" v-if="carts.length === 0" class="text-end border-0 fs-3">購物車目前無商品</td>
                      </tr>
                      <tr v-for="item in carts" :key="item.product_id">
                        <td>
                          <button type="button" class="btn btn-danger btn-sm" @click="deletProduct(item.id)">
                            <i class="bi bi-x-lg"></i>
                          </button>
                        </td>
                        <td scope="row">{{item.product.title}}</td>
                        <td>$ {{ item.product.price }}</td>
                        <td>
                          <select
                            class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            v-model="item.qty"
                            style="width: 70px"
                            @change="updateCart(item)"
                          >
                          <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                          </select>
                        </td>
                        <td class="text-center">
                          <div>$ {{ item.qty * item.product.price }}</div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="5" class="text-end">總計 {{ totalPrice }} 元</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container d-flex justify-content-end gap-3">
        <RouterLink to="/products" class="btn btn-primary">繼續購物</RouterLink>
        <!-- <a class="btn btn-primary" href="#" role="button">繼續購物</a> -->
        <RouterLink to="/form" class="btn btn-primary">下一步</RouterLink>
        <!-- <a class="btn btn-primary" href="#" role="button">下一步</a> -->
      </div>

</template>

<script>
    import cartStore from '../../stores/cart';
    import { mapState, mapActions } from 'pinia';
    import { RouterLink } from 'vue-router'
    export default {
      components:{
        RouterLink
      },
      computed:{
        ...mapState(cartStore,['carts','totalPrice']),

      },
      methods: {
        ...mapActions(cartStore,['deletProduct','deletAllProducts','updateCart']),
      },
    }

</script>