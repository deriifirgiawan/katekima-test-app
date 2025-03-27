import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import FormPage from "../pages/FormPage.vue";
import ProductPage from "../pages/ProductPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/add-form',
    name: 'Add Form',
    component: FormPage,
    props: false,
  },

  {
    path: '/edit-form/:id',
    name: 'Edit Form',
    component: FormPage,
    props: true,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductPage
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
})