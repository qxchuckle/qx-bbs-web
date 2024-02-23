<template>
  <el-form-item prop="emailCode">
    <div class="flex-panel">
      <el-input v-model="value" :placeholder="placeholder">
        <template #prefix>
          <i class="iconfont icon-checkcode"></i>
        </template>
      </el-input>
      <el-button type="primary" size="large">获取验证码</el-button>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
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
});
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  },
});
</script>

<style scoped lang="scss">
.flex-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0px 8px;
}
</style>
