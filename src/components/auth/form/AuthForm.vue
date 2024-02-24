<template>
  <RegForm
    v-if="showRegisterFrom"
    :rules="formRules"
    ref="formRef"
    class="form"
    @complete="formComplete"
  >
    <div class="account-operation">
      <a href="javascript:void(0)" @click="toLogin">已有账号？</a>
    </div>
  </RegForm>
  <LoginForm
    v-else-if="showLoginFrom"
    :rules="formRules"
    ref="formRef"
    class="form"
    @complete="formComplete"
  >
    <div class="account-operation">
      <a href="javascript:void(0)" @click="toForget">忘记密码？</a>
      <a href="javascript:void(0)" @click="toRegister">没有账号？</a>
    </div>
  </LoginForm>
  <ForgetForm
    v-else-if="showForgetFrom"
    :rules="formRules"
    ref="formRef"
    class="form"
    @complete="formComplete"
  >
    <div class="account-operation">
      <a href="javascript:void(0)" @click="toLogin">去登录？</a>
    </div>
  </ForgetForm>
</template>

<script setup lang="ts">
import type ForgetForm from './ForgetForm.vue';
import type LoginForm from './LoginForm.vue';
import type RegForm from './RegForm.vue';
import { AuthFormType } from '@/type';

const props = defineProps({
  type: {
    type: String,
    default: AuthFormType.login,
  },
});
const emit = defineEmits(['update:type', 'complete']);
const formComplete = (result?: { switch?: AuthFormType; data: any }) => {
  emit('complete', {
    type: formType.value,
    data: result?.data,
  });
  result?.switch && switchPanel(result.switch);
};
const formType = computed({
  get() {
    return props.type;
  },
  set(val: string) {
    emit('update:type', val);
  },
});
const formRef = ref<InstanceType<typeof LoginForm | typeof RegForm | typeof ForgetForm> | null>(
  null,
);
const checkRePassword = (rule: any, value: string, callback: Function) => {
  if (value && value !== formRef.value?.formData.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};
const formRules = {
  // 只有在登录时，account才能既是邮箱又是用户名，其余情况下，account只能是邮箱
  account: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    // { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
    { validator: createValidate(regExpName.email), message: '请输入正确的邮箱', trigger: 'blur' },
    { max: 100, message: '邮箱长度不能超过100个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码长度不能小于8个字符', trigger: 'blur' },
    { max: 100, message: '密码长度不能超过100个字符', trigger: 'blur' },
    {
      validator: createValidate(regExpName.password),
      message: '密码必须同时包含字母和数字',
      trigger: 'blur',
    },
  ],
  rePassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: checkRePassword, trigger: 'blur' },
  ],
  checkCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 5, max: 5, message: '验证码长度为5', trigger: 'blur' },
  ],
  remember: [{ required: false }],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 30, message: '用户名长度不能超过30个字符', trigger: 'blur' },
    { min: 2, message: '用户名长度不能小于2个字符', trigger: 'blur' },
  ],
  emailCode: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
};
const showLoginFrom = computed(() => formType.value === AuthFormType.login);
const showRegisterFrom = computed(() => formType.value === AuthFormType.register);
const showForgetFrom = computed(() => formType.value === AuthFormType.forget);
// 切换面板
const switchPanel = (type: AuthFormType) => {
  formType.value = type;
};
const toLogin = () => {
  switchPanel(AuthFormType.login);
};
const toRegister = () => {
  switchPanel(AuthFormType.register);
};
const toForget = () => {
  switchPanel(AuthFormType.forget);
};
const reset = () => {
  formRef.value?.reset();
};
defineExpose({ reset });
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
