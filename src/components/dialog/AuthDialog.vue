<template>
  <div>
    <CustomDialog
      v-model:visible="dialogVisible"
      :title="title"
      :max-width="maxWidth"
      :min-width="minWidth"
    >
      <AuthForm ref="authFormRef" v-model:type="formType" @complete="AuthFormComplete"></AuthForm>
    </CustomDialog>
  </div>
</template>

<script setup lang="ts">
import type AuthForm from '@/components/auth/form/AuthForm.vue';
import { AuthFormType } from '@/type';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: AuthFormType.login,
  },
  maxWidth: {
    type: String,
    default: '500px',
  },
  minWidth: {
    type: String,
    default: '300px',
  },
});
const emit = defineEmits(['update:visible', 'update:type']);
const dialogVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emit('update:visible', val);
  },
});
const formType = computed({
  get: () => props.type,
  set: (val: string) => {
    emit('update:type', val);
  },
});
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
const authFormRef = ref<InstanceType<typeof AuthForm> | null>(null);
watch(
  () => props.visible,
  (val) => {
    if (val) {
      nextTick(() => {
        authFormRef.value?.reset();
      });
    }
  },
);
const AuthFormComplete = (result: { type: AuthFormType; data: any }) => {
  if (result.type === AuthFormType.login) {
    // 登录成功，关闭面板
    dialogVisible.value = false;
  }
};
</script>

<style scoped lang="scss"></style>
