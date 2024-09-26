<template>
  <CustomDialog
    v-model:visible="dialogVisible"
    title="发送邮箱验证码"
    max-width="400px"
    :buttons="buttons"
  >
    <el-form :model="formData" :rules="formRules" ref="formRef" @submit.prevent>
      <el-form-item label="邮箱" required>{{ email }}</el-form-item>
      <CheckCode v-model="formData.checkCode" :type="checkCodeType" ref="checkCodeRef"></CheckCode>
    </el-form>
  </CustomDialog>
</template>

<script setup lang="ts">
import { DialogButton } from '@/type';
import { ElForm } from 'element-plus';
import CheckCode from '@/components/auth/formItem/CheckCode.vue';

const checkCodeType = CheckCodeType.email;
const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    default: '',
  },
  type: {
    type: Number,
    default: EMailCodeType.register,
  },
});
const emit = defineEmits(['update:visible']);
const dialogVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emit('update:visible', val);
  },
});
// 重置表单
const reset = () => {
  formRef.value?.resetFields();
  checkCodeRef.value?.changeCheckCode(checkCodeType);
};
// 关闭面板
const close = () => {
  formRef.value?.resetFields();
  dialogVisible.value = false;
};
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const checkCodeRef = ref<InstanceType<typeof CheckCode> | null>(null);
const formData = reactive({
  checkCode: '',
});
const formRules = {
  checkCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 5, max: 5, message: '验证码长度为5', trigger: 'blur' },
  ],
};
// 当面板重新打开，重置表单
watch(
  () => props.visible,
  (val) => {
    if (val) {
      reset();
    }
  },
);
const buttons: DialogButton[] = [
  {
    text: '发送邮箱验证码',
    type: ButtonType.primary,
    click() {
      formValidate(formRef.value)
        .then(async () => {
          const result = await request({
            url: apiList.auth.sendMailCode,
            params: {
              email: props.email,
              checkCode: formData.checkCode,
              type: props.type,
            },
            errorCallback() {
              reset();
            },
          });
          if (!result) return;
          // 邮箱验证码发送成功
          message.success('邮箱验证码发送成功');
          close(); // 关闭面板
        })
        .catch(() => {});
    },
  },
];
</script>

<style scoped lang="scss"></style>
