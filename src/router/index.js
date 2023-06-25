import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/FrontLayout.vue"),
      children: [
        {
          path: "/",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "about",
          component: () => import("../views/front/AboutView.vue"),
        },
        {
          path: "products",
          component: () => import("../views/front/ProductsView.vue"),
          children: [
            {
              path: "/category/:category",
              component: () => import("../views/front/CategoryView.vue"),
            },
          ],
        },
        {
          path: "/product/:id",
          component: () => import("../views/front/ProductView.vue"),
        },
        {
          path: "cart",
          component: () => import("../views/front/CartView.vue"),
        },
        {
          path: "form",
          component: () => import("../views/front/FormView.vue"),
        },
        {
          path: "ordered",
          component: () => import("../views/front/OrderedView.vue"),
        },
      ],
    },
  ],
});

export default router;
