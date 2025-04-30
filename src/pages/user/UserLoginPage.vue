<template>
  <div v-scale id="userLoginPage">
    <h1 class="title">
      <img class="logo" src="@/assets/logo.png" alt="May用户中心" />
      May用户中心
    </h1>
    <div class="userForm">
      <div class="userFormLeft">
        <div class="welcome">Welcome!</div>
        <div class="signTitle">
          <span class="signTo">Sign in to</span><br />
          <span class="signSim">User Center is simply</span>
        </div>
        <a-form
          hide-required-mark="true"
          :layout="'vertical'"
          style="width: 400px"
          :model="formState"
          name="basic"
          :label-col="{
            span: 8,
            style: { textAlign: 'left', fontSize: '16px' },
          }"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
          @finish="fetchLogin"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            class="formLabel"
            label="User Account"
            name="userAccount"
            :rules="[{ required: true, message: '账号不能为空！' }]"
          >
            <a-input
              placeholder="Enter your user account"
              class="formInput"
              v-model:value="formState.userAccount"
            />
          </a-form-item>

          <a-form-item
            class="formLabel"
            label="Password"
            name="userPassword"
            :rules="[{ required: true, message: '密码不能为空！' }]"
          >
            <a-input-password
              class="formInput"
              v-model:value="formState.userPassword"
              placeholder="Enter your password"
            />
          </a-form-item>

          <a-form-item
            v-if="!isLogin"
            class="formLabel"
            label="checkPassword"
            name="checkPassword"
            :rules="[{ required: true, message: '确认密码不能为空！' }]"
          >
            <a-input-password
              class="formInput"
              v-model:value="formState.checkPassword"
              placeholder="Confrim your  password"
            />
          </a-form-item>

          <a-form-item v-if="isLogin">
            <a-form-item name="remember" no-style>
              <a-checkbox
                class="remember"
                style="height: 18px; line-height: 18px"
                >Remember me
              </a-checkbox>
            </a-form-item>
            <a class="forgotPassword" style="float: right" href=""
              >Forgot password?</a
            >
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button
              class="formButton"
              size="large"
              block="true"
              type="primary"
              html-type="submit"
              ><span v-if="isLogin">Login</span><span v-else>Register</span>
            </a-button>
          </a-form-item>
        </a-form>
        <div v-if="isLogin" class="toRegister">
          Don't have an account ? <span @click="toRegister">Register</span>
        </div>
        <div v-else class="toRegister">
          Already have an account ?
          <span @click="toRegister">Login</span>
        </div>
      </div>
      <div class="userFormRight">
        <img src="@/assets/loginBg.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { userLogin, userRegister } from "@/request/user";
import { message } from "ant-design-vue";
import { userLoginStore } from "@/store/user";
import { useRouter } from "vue-router";
import defaultProps from "ant-design-vue/es/vc-slick/default-props";

interface FormState {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
}

const formState = reactive<FormState>({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});

const toRegister = () => {
  isLogin.value = !isLogin.value;
  formState.userAccount = "";
  formState.userPassword = "";
  formState.checkPassword = "";
};

const formLogin = ref({
  userAccount: "",
  userPassword: "",
});

const isLogin = ref(true);

const userStore = userLoginStore();
const router = useRouter();

const fetchLogin = async (values: any) => {
  let res = null;
  if (isLogin.value) {
    formLogin.value.userAccount = values.userAccount;
    formLogin.value.userPassword = values.userPassword;
    res = await userLogin(values);
    if (res.data.code === 0 && res.data.data) {
      userStore.setLoginState(res.data.data);
      console.log(res.data.data, 1);
      router.push({
        path: "/",
        replace: true,
      });
      message.success("登录成功！");
    } else {
      message.error("登录失败！");
    }
  } else {
    res = await userRegister(values);
    if (res.data.code === 0 && res.data.data) {
      message.success("注册成功");
      toRegister();
    } else {
      message.error("注册失败");
    }
  }
};

const onFinishFailed = (errorInfo: any) => {
  // message.error("登录失败！");
};
</script>

<style scoped>
#userLoginPage {
  overflow: hidden;
}

#userLoginPage .title {
  position: absolute;
  left: 42px;
  top: 31px;
  font-weight: bolder;
  font-size: 20px;
}

.userFormLeft {
  position: relative;
  left: 111px;
  top: 114px;
  width: 505px;
  max-height: 757px;
  border-radius: 8px; /* 可选圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 35px 36px;
}

.userFormLeft .welcome {
  font-weight: lighter;
  font-size: 25px;
}

.userFormLeft .signTitle {
  margin-top: 29px;
  margin-bottom: 48px;

  .signTo {
    color: #000;
    font-size: 31px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    height: 47px;
    display: inline-block;
  }

  .signSim {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

.title img {
  height: 50px;
}

:deep(.formLabel .ant-form-item-label label) {
  font-size: 16px;
}

.formInput {
  height: 59px;
  padding: 19px 27px;
  font-size: 16px;
}

.formButton {
  background-color: #000;
}

.toRegister {
  text-align: center;
  color: #7d7d7d;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  span {
    color: #000;
    font-weight: 600;
    cursor: pointer;
  }
}

.userForm {
  display: flex;
}

.userFormRight {
  position: absolute;
  top: 127px;
  left: 598px;
  width: 827px;
  height: 650px;
}

.remember {
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.forgotPassword {
  color: #4d4d4d;
  font-size: 12px;
  font-weight: 300;
}
</style>
