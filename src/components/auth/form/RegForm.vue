<template>
  <el-form :model="formData" :rules="rules" ref="formRef" size="large">
    <!-- 账号 -->
    <Account v-model="formData.account"></Account>
    <!-- 邮箱验证码 -->
    <EmailCode v-model="formData.emailCode"></EmailCode>
    <!-- 用户名 -->
    <Nickname v-model="formData.nickname"></Nickname>
    <!-- 密码 -->
    <Password v-model="formData.password"></Password>
    <!-- 再次输入密码 -->
    <Password
      v-model="formData.passwordAgin"
      prop="passwordAgin"
      placeholder="请再次输入密码"
    ></Password>
    <!-- 图形验证码 -->
    <CheckCode v-model="formData.checkCode"></CheckCode>
    <slot></slot>
    <!-- 提交 -->
    <SubmitForm text="注册" @submit="submitForm"></SubmitForm>
  </el-form>
</template>

<script setup lang="ts">
const formData = reactive({
  account: '',
  password: '',
  passwordAgin: '',
  checkCode: '',
  nickname: '',
  emailCode: '',
});
const props = defineProps({
  rules: {
    type: Object,
  },
});
const formRef = ref<any | null>(null);

const submitForm = () => {};
</script>

<style scoped lang="scss">
.el-form-item {
  &:last-child {
    margin-bottom: 0px;
  }
}
</style>
