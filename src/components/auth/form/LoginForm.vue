<template>
  <el-form :model="formData" :rules="formRules" ref="formRef" size="large">
    <!-- 账号 -->
    <Account v-model="formData.account" placeholder="请输入用户名或邮箱"></Account>
    <!-- 密码 -->
    <Password v-model="formData.password"></Password>
    <!-- 图形验证码 -->
    <CheckCode v-model="formData.checkCode"></CheckCode>
    <!-- 记住我 -->
    <Remember v-model="formData.remember"></Remember>
    <slot></slot>
    <!-- 提交 -->
    <SubmitForm text="登陆" @submit="submitForm"></SubmitForm>
  </el-form>
</template>

<script setup lang="ts">
const formData = reactive({
  account: '',
  password: '',
  checkCode: '',
  remember: false,
});
const props = defineProps({
  rules: {
    type: Object,
  },
});
const formRules = computed(() => {
  return {
    ...props.rules,
    account: [{ required: true, message: '请输入用户名或邮箱', trigger: 'blur' }],
  };
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
.el-checkbox {
  height: fit-content;
  margin-left: 1px;
}
</style>
