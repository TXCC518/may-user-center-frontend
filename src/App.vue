<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style></style>

<script setup lang="ts">
import router from "@/router";
import { userLoginStore } from "@/store/user";

const userStore = userLoginStore();

router.beforeEach((to, from, next) => {
  if (!userStore.loginState.id && to.path !== "/user/login")
    next("/user/login");
  else next();
});
</script>
