<template>
  <RegForm v-if="showRegisterFrom" :rules="formRules">
    <div class="account-operation">
      <a href="javascript:void(0)" @click="toLogin">已有账号？</a>
    </div>
  </RegForm>
  <LoginForm v-else-if="showLoginFrom" :rules="formRules">
    <div class="account-operation">
      <a href="javascript:void(0)" @click="toForget">忘记密码？</a>
      <a href="javascript:void(0)" @click="toRegister">没有账号？</a>
    </div>
  </LoginForm>
  <ForgetForm v-else-if="showForgetFrom" :rules="formRules">
    <div class="account-operation">
      <a href="javascript:void(0)" @click="toLogin">去登陆？</a>
    </div>
  </ForgetForm>
</template>

<script setup lang="ts">
const formType = ref(AuthFormType.login);
const title = computed(() => {
  switch (formType.value) {
    case AuthFormType.login:
      return '登录';
    case AuthFormType.register:
      return '注册';
    case AuthFormType.forget:
      return '重置密码';
  }
});
defineExpose({ title });
const showLoginFrom = computed(() => formType.value === AuthFormType.login);
const showRegisterFrom = computed(() => formType.value === AuthFormType.register);
const showForgetFrom = computed(() => formType.value === AuthFormType.forget);
const formRules = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  passwordAgin: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
  checkCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  remember: [{ required: false }],
  nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  emailCode: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
};
const toLogin = () => {
  formType.value = AuthFormType.login;
};
const toRegister = () => {
  formType.value = AuthFormType.register;
};
const toForget = () => {
  formType.value = AuthFormType.forget;
};
</script>

<style scoped lang="scss">
.account-operation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  a {
    color: $AColor;
    font-size: 14px;
  }
}
</style>
