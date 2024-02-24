<template>
  <el-form-item prop="emailCode">
    <div class="flex-panel">
      <el-input v-model="value" :placeholder="placeholder" size="large" clearable>
        <template #prefix>
          <i class="iconfont icon-checkcode"></i>
        </template>
      </el-input>
      <el-button type="primary" size="large" @click="showEmailCodeDialog">获取验证码</el-button>
    </div>
    <el-popover
      :width="350"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
      trigger="click"
    >
      <template #reference>
        <span class="tip">未收到邮件验证码？</span>
      </template>
      <div class="tip-content">
        <p>1、在垃圾箱中查找邮箱验证码</p>
        <p>2、在邮箱中 头像->设置->反垃圾->白名单->设置邮件地址白名单</p>
        <p>3、将邮箱【qxchuckle@qq.com】添加到白名单</p>
      </div>
    </el-popover>
  </el-form-item>
  <EmailCodeDialog
    v-model:visible="emailCodeDialogVisible"
    :email="emil"
    :type="type"
  ></EmailCodeDialog>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  prop: {
    type: String,
    default: 'emailCode',
  },
  placeholder: {
    type: String,
    default: '请输入邮箱验证码',
  },
  emil: {
    type: String,
    default: '',
  },
  formRef: {
    type: (Object as PropType<InstanceType<typeof ElForm>>) || null,
    default: null,
  },
  type: {
    type: Number,
    default: EMailCodeType.register,
  },
});
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  },
});
// 发送邮箱验证码
const checkCodeType = CheckCodeType.email;
const emailCodeDialogVisible = ref(false);
const showEmailCodeDialog = () => {
  // 校验邮箱是否正确
  props.formRef?.validateField('account', (valid) => {
    if (!valid) {
      return;
    }
    emailCodeDialogVisible.value = true;
  });
};
</script>

<style scoped lang="scss">
.flex-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0px 8px;
}
.tip {
  cursor: pointer;
  color: #409eff;
  line-height: 1;
  font-size: 12px;
}
</style>
