import { createApp } from "vue";
import { createPinia } from "pinia";

import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/all.scss";
import "bootstrap"; // 引入 bootstrap js

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate"; //引入 VeeValidate 相關模組
import { required, email } from "@vee-validate/rules"; // 驗證規則
import { localize, setLocale } from "@vee-validate/i18n"; // 引入多語言支援相關模組
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json"; // 加仔中文語言包

// 定義驗證規則
defineRule("required", required);
defineRule("email", email);
// 設定繁體中文語言包
localize("zh_TW", zhTW);
setLocale("zh_TW");
// 配置 VeeValidate
configure({
  generateMessage: localize("zh_TW"),
});

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(VueAxios, axios);
// 註冊VeeValidate 元件
app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
