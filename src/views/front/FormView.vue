
<script>
  const {VITE_URL,VITE_PATH} = import.meta.env
  export default {
    data() {
      return {
          form: {
            user:{
              name: "",
              tel: "",
              email: "",
              payment: "",
              delivery: "",
              address: "",
            }
        },
      }
    },
    computed:{
      requiredIfDelivery() {
      if (this.form.user.delivery === 'delivery') {
        return 'required';
      } else {
        return '';
      }
    },
    },
    methods: {
      createOrder() {
        const url = `${VITE_URL}/v2/api/${VITE_PATH}/order`;
        const order = this.form;
        this.$http
          .post(url, { data: order })
          .then((res) => {
            // alert(res.data.message);
            //this.$refs.form.resetForm(); //用於清除表單驗證錯誤並重置表單的值，必須搭配表單的 ref 屬性
            this.$router.push('/ordered'); //跳轉至其他頁面

          })
          .catch((err) => {
            // alert(err.response.data.message);
            this.$refs.form.resetForm();
          });
      }
    },
  }

</script>

<template>
    <header
        class="d-flex align-items-center justify-content-center position-relative py-5"
        style="top: 56px"
      >
        <div class="text-primary m-auto">
          <h3 class="fw-bold text-center">訂購資料</h3>
        </div>
      </header>
    <div class="container p-4 my-4 shadow" style="max-width: 500px">
        <v-form ref="form" v-slot="{errors}" @submit="createOrder">
          <!-- 姓名 -->
          <div class="mb-3">
            <label for="name" class="form-label">姓名</label>
            <v-field type="text" class="form-control" id="name" name="姓名" :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"></v-field>
                <error-message
                name="姓名"
                class="invalid-feedback"
              ></error-message>
          </div>
          <!-- 電子信箱 -->
          <div class="mb-3">
              <label for="email" class="form-label">電子信箱</label>
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              ></v-field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
          </div>
          <!-- 電話  -->
          <div class="mb-3">
            <label for="tel" class="form-label">電話</label>
            <v-field
              type="text"
              id="tel"
              name="電話"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required"
              v-model="form.user.tel"
            ></v-field>
            <error-message
              name="電話"
              class="invalid-feedback"
            ></error-message>
          </div>
          <!-- 支付方式 -->
          <div class="mb-3">
            <label for="payment" class="form-label">支付方式</label>
            <v-field
              as="select"
              id="payment"
              name="payment"
              class="form-select"
              :class="{ 'is-invalid': errors['payment'] }"
              rules="required"
              v-model="form.user.payment"
            >
              <option value="">選擇支付方式</option>
              <option value="credit">現金</option>
              <option value="debit">LINE PAY</option>
              <option value="paypal">信用卡</option>
            </v-field>
            <error-message name="payment" class="invalid-feedback">請選擇支付方式</error-message>
          </div>
         <!-- 配送方式 -->
          <div class="mb-3">
            <label for="delivery" class="form-label">配送方式</label>
            <v-field
              as="select"
              id="delivery"
              name="delivery"
              class="form-select"
              :class="{ 'is-invalid': errors['delivery'] }"
              rules="required"
              v-model="form.user.delivery"
            >
              <option value="">選擇配送方式</option>
              <option value="pickup">自取</option>
              <option value="delivery">外送</option>
            </v-field>
            <error-message name="delivery" class="invalid-feedback">請選擇配送方式</error-message>
          </div>
          <div v-if="form.user.delivery === 'delivery'" class="mb-3">
            <label for="address" class="form-label">送貨地址</label>
            <v-field
              type="text"
              id="address"
              name="address"
              class="form-control"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="請輸入送貨地址"
              :rules="[requiredIfDelivery]"
              v-model="form.user.address"
            ></v-field>
            <error-message name="address" class="invalid-feedback">請輸入送貨地址</error-message>
          </div>

          <button type="submit" class="btn btn-primary w-100">提交</button>
        </v-form>
      </div>
</template>

