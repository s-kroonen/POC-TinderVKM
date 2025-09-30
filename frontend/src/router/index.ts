import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginRegister from "../views/LoginRegister.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home

  },
  { path: "/auth", name: "Auth", component: LoginRegister }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
