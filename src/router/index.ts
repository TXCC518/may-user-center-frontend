import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UserLoginPage from "@/pages/user/UserLoginPage.vue";
import BasicLayout from "@/layouts/BasicLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import AdminManagePage from "@/pages/admin/AdminManagePage.vue";
import UserRegisterPage from "@/pages/user/UserRegisterPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "basicLayout",
    component: BasicLayout,
    children: [
      {
        path: "",
        name: "homePage",
        component: HomePage,
      },
      {
        path: "/admin/userManage",
        name: "adminUserManage",
        component: AdminManagePage,
      },
    ],
  },
  {
    path: "/user/login",
    name: "userLoginPage",
    component: UserLoginPage,
  },
  {
    path: "/user/register",
    name: "userRegister",
    component: UserRegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
