<template>
  <el-form :model="formData" :rules="formRules" ref="formRef">
    <!-- 账号 -->
    <Account v-model="formData.account" placeholder="请输入用户名或邮箱"></Account>
    <!-- 密码 -->
    <Password v-model="formData.password"></Password>
    <!-- 图形验证码 -->
    <CheckCode v-model="formData.checkCode" ref="checkCodeRef"></CheckCode>
    <!-- 记住我 -->
    <Remember v-model="formData.remember"></Remember>
    <slot></slot>
    <!-- 提交 -->
    <SubmitForm text="登录" @submit="submitForm"></SubmitForm>
  </el-form>
</template>

<script setup lang="ts">
import type { AuthFormData } from '@/type';
import type { ElForm } from 'element-plus';
import type CheckCode from '../formItem/CheckCode.vue';
import { md5 } from 'js-md5';
import { VueCookies } from 'vue-cookies';
const cookie = inject<VueCookies>('$cookies');

const userStore = useUserStore();
const formData = reactive<AuthFormData>({
  account: '',
  password: '',
  checkCode: '',
  remember: false,
});
const initFormData = () => {
  userStore.$patch((state) => {
    if (state.remember) {
      formData.account = state.account;
      formData.password = state.password;
      formData.remember = state.remember;
    }
  });
};
onBeforeMount(() => {
  initFormData();
});
const props = defineProps({
  rules: {
    type: Object,
  },
});
const emit = defineEmits(['complete']);
const formRules = computed(() => {
  return {
    ...props.rules,
    account: [{ required: true, message: '请输入用户名或邮箱', trigger: 'blur' }],
  };
});
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const checkCodeRef = ref<InstanceType<typeof CheckCode> | null>(null);
const reset = () => {
  formRef.value?.resetFields();
  checkCodeRef.value?.changeCheckCode(CheckCodeType.auth);
  initFormData();
};
const submitForm = () => {
  const md5Password = md5(formData.password);
  formValidate(formRef.value)
    .then(async () => {
      const result = await request({
        url: apiList.auth.login,
        params: {
          email: formData.account,
          password: md5Password,
          checkCode: formData.checkCode,
        },
        errorCallback: () => {
          checkCodeRef.value?.changeCheckCode(CheckCodeType.auth);
        },
      });
      if (!result) return;
      userStore.$patch((state) => {
        state.username = result.data.nickName;
        state.remember = formData.remember!;
        state.isLogin = true;
        state.userId = result.data.userId;
        state.isAdmin = result.data.isAdmin ?? false;
        state.province = result.data.province ?? '未知';
      });
      // 登录成功
      message.success(`欢迎${result.data.nickName}`);
      if (formData.remember) {
        // 记住账号密码
        userStore.$patch((state) => {
          state.account = formData.account;
          state.password = md5Password;
        });
        cookie?.set(
          'loginInfo',
          {
            email: formData.account,
            password: md5Password,
            rememberMe: formData.remember,
          },
          '7d',
        );
        // 保存到本地
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            account: formData.account,
            password: md5Password,
            lastLogin: new Date().getTime(),
            remember: formData.remember,
            userId: result.data.userId,
          }),
        );
      } else {
        // 移除记住
        userStore.$patch((state) => {
          state.account = '';
          state.password = '';
        });
        // 移除本地
        localStorage.removeItem('userInfo');
        initFormData();
      }
      emit('complete', {
        switch: null,
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
.el-checkbox {
  height: fit-content;
  margin-left: 1px;
}
</style>
