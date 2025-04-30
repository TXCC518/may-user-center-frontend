<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="../assets/logo.png" alt="May用户中心" />
          <div class="title">May用户中心</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="100px">
        <a-button v-if="userStore.loginState === {}" type="primary"
          >登录
        </a-button>
        <div v-else>{{ userStore.loginState.username ?? "无名" }}</div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, onMounted, ref } from "vue";
import {
  HomeOutlined,
  CrownOutlined,
  GithubOutlined,
} from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { userLoginStore } from "@/store/user";

const router = useRouter();
const route = useRoute();
const userStore = userLoginStore();

const doMenuClick = ({ key }: { key: string }) => {
  if (key === "others") return;
  router.push({
    path: key,
  });
};

const current = ref<string[]>([]);

// 初始化时设置当前路径
onMounted(() => {
  current.value = [route.path];
});

router.afterEach((to, from, failure) => {
  current.value = [to.path];
  console.log(current.value);
});
const items = ref<MenuProps["items"]>([
  {
    key: "/",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页",
  },
  {
    key: "/admin/userManage",
    icon: () => h(CrownOutlined),
    label: "用户管理",
    title: "用户管理",
  },
  {
    key: "others",
    icon: () => h(GithubOutlined),
    label: h(
      "a",
      {
        href: "https://github.com/TXCC518",
        target: "_blank",
      },
      "May"
    ),
    title: "May",
  },
]);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

#globalHeader .title-bar .logo {
  height: 48px;
}

.title-bar .title {
  color: black;
  margin-left: 16px;
  font-size: 18px;
}
</style>
