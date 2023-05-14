import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Section from "../views/Section.vue";
import Transaction from "../views/Transaction.vue";
import HelloWorld from "../components/HelloWorld.vue";
import CreateUser from "../views/user/CreateUser.vue";
import EditUser from "../views/user/EditUser.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/sections", name: "Section", component: Section },
  { path: "/transactions", name: "Transaction", component: Transaction },
  { path: "/hello", name: "HelloWorld", component: HelloWorld },
  { path: "/create-user", name: "CreateUser", component: CreateUser },
  { path: "/edit-user", name: "EditUser", component: EditUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
