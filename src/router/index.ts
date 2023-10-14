import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Info from "../views/Info.vue";
import Section from "../views/Section.vue";
import Transaction from "../views/Transaction.vue";
import HelloWorld from "../components/HelloWorld.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/info", name: "Info", component: Info },
  { path: "/sections", name: "Section", component: Section },
  { path: "/transactions", name: "Transaction", component: Transaction },
  { path: "/hello", name: "HelloWorld", component: HelloWorld },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
