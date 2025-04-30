import { defineStore } from "pinia";

export const userLoginStore = defineStore("userLoginState", {
  state: () => ({
    loginState: {},
  }),
  actions: {
    setLoginState(user: any) {
      this.loginState = user;
    },
  },
  persist: true,
});
