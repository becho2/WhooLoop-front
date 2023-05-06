import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import HelloWorld from "../components/HelloWorld.vue";
import CreateUser from "../components/user/CreateUser.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/hello", name: "HelloWorld", component: HelloWorld },
  { path: "/create-user", name: "CreateUser", component: CreateUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
