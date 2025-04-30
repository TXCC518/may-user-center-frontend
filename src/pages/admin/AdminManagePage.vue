<template>
  <div id="adminManagePage">
    <a-input-search
      v-model:value="searchUsername"
      placeholder="根据用户名搜索"
      enter-button
      @search="onSearch"
      size="large"
      class="searchUser"
    />
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'Id'">
          <span> 序号 </span>
        </template>
        <template v-if="column.key === 'Username'">
          <span> 用户名 </span>
        </template>
        <template v-if="column.key === 'Avatar'">
          <span> 头像 </span>
        </template>
        <template v-if="column.key === 'tags'">
          <span> 身份 </span>
        </template>
        <template v-if="column.key === 'action'">
          <span> 操作 </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'Id'">
          <a>
            {{ record.id }}
          </a>
        </template>
        <template v-if="column.key === 'Username'">
          <a>
            {{ record.username }}
          </a>
        </template>
        <template v-if="column.key === 'Avatar'">
          <img
            style="width: 50px"
            :src="record.avatarUrl"
            alt="record.username"
          />
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-if="record.userRole === 1" color="success"> 管理员 </a-tag>
            <a-tag v-else color="processing"> 普通用户 </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>删除</a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { searchUsers } from "@/request/user";
import { userLoginStore } from "@/store/user";
import { message } from "ant-design-vue";

const searchUsername = ref("");

const columns = [
  {
    name: "Id",
    dataIndex: "Id",
    key: "Id",
  },
  {
    name: "Username",
    dataIndex: "Username",
    key: "Username",
  },
  {
    title: "Avatar",
    dataIndex: "Avatar",
    key: "Avatar",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
  },
];

const data = ref([]);

onMounted(async () => {
  const res = await searchUsers({ username: searchUsername.value });
  if (res.data.code === 0 && res.data.data) {
    data.value = res.data.data;
  }
});

const onSearch = async (value: any) => {
  const res = await searchUsers({ username: value });
  if (res.data.code === 0 && res.data.data) {
    data.value = res.data.data;
    message.success("搜索成功");
  } else {
    message.error(res.data.message);
  }
};
</script>

<style scoped>
#adminManagePage {
  width: 100%;
  height: 100%;
}

.searchUser {
  max-width: 400px;
  float: right;
  margin-bottom: 20px;
}
</style>
