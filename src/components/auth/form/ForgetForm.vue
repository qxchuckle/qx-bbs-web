<template>
  <el-form :model="formData" :rules="rules" ref="formRef">
    <!-- 账号 -->
    <Account v-model="formData.account"></Account>
    <!-- 邮箱验证码 -->
    <EmailCode
      v-model="formData.emailCode"
      :emil="formData.account"
      :formRef="formRef!"
      :type="emailCodeType"
    ></EmailCode>
    <!-- 密码 -->
    <Password v-model="formData.password"></Password>
    <!-- 再次输入密码 -->
    <Password
      v-model="formData.rePassword"
      prop="rePassword"
      placeholder="请再次输入密码"
    ></Password>
    <!-- 图形验证码 -->
    <CheckCode v-model="formData.checkCode" ref="checkCodeRef"></CheckCode>
    <slot></slot>
    <!-- 提交 -->
    <SubmitForm text="重置密码" @submit="submitForm"></SubmitForm>
  </el-form>
</template>

<script setup lang="ts">
import type { AuthFormData } from '@/type';
import type { ElForm } from 'element-plus';
import type CheckCode from '../formItem/CheckCode.vue';

const formData = reactive<AuthFormData>({
  account: '',
  password: '',
  rePassword: '',
  checkCode: '',
  emailCode: '',
});
const emailCodeType = EMailCodeType.forget;
const props = defineProps({
  rules: {
    type: Object,
  },
});
const emit = defineEmits(['complete']);
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const checkCodeRef = ref<InstanceType<typeof CheckCode> | null>(null);
const reset = () => {
  formRef.value?.resetFields();
  checkCodeRef.value?.changeCheckCode(CheckCodeType.auth);
};
const submitForm = () => {
  formValidate(formRef.value)
    .then(async () => {
      const result = await request({
        url: authApi.resetPwd,
        params: {
          email: formData.account,
          password: formData.password,
          emailCode: formData.emailCode,
          checkCode: formData.checkCode,
        },
        errorCallback: () => {
          checkCodeRef.value?.changeCheckCode(CheckCodeType.auth);
        },
      });
      if (!result) return;
      // 重置密码成功
      message.success('重置密码完成，请登录');
      emit('complete', {
        switch: AuthFormType.login,
        data: null,
      });
    })
    .catch(() => {});
};
defineExpose({
  formData,
  reset,
});
</script>

<style scoped lang="scss">
.el-form-item {
  &:last-child {
    margin-bottom: 0px;
  }
}
</style>
