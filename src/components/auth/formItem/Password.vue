<template>
  <el-form-item :prop="prop">
    <el-input v-model="value" :placeholder="placeholder" show-password clearable size="large">
      <template #prefix>
        <i class="iconfont icon-password"></i>
      </template>
    </el-input>
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
    default: 'password',
  },
  placeholder: {
    type: String,
    default: '请输入密码',
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

<style scoped lang="scss"></style>
