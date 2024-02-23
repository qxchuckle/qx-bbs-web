<template>
  <el-form-item :prop="prop">
    <div class="flex-panel">
      <el-input v-model="value" :placeholder="placeholder">
        <template #prefix>
          <i class="iconfont icon-checkcode"></i>
        </template>
      </el-input>
      <div class="code-box" @click="changeCheckCode(0)">
        <img :src="checkCodeUrl" alt="验证码" />
      </div>
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
    default: 'checkCode',
  },
  placeholder: {
    type: String,
    default: '请输入验证码',
  },
});
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  },
});
const checkCodeUrl = ref(authApi.checkCode);
const changeCheckCode = (type: number | string) => {
  checkCodeUrl.value = `${authApi.checkCode}?type=${type}&time=${Date.now()}`;
};
</script>

<style scoped lang="scss">
.code-box {
  cursor: pointer;
  width: 130px;

  img {
    display: block;
    border-radius: 4px;
  }
}
.flex-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0px 8px;
}
</style>
