<template>
  <el-form-item :prop="prop">
    <div class="flex-panel">
      <el-input v-model="value" :placeholder="placeholder" :maxlength="5" size="large" clearable>
        <template #prefix>
          <i class="iconfont icon-checkcode"></i>
        </template>
      </el-input>
      <div class="code-box" @click="changeCheckCode(type)">
        <img :src="checkCodeUrl" alt="验证码" />
      </div>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { CheckCodeType } from '@/type';
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
  type: {
    type: Number,
    default: CheckCodeType.auth,
  },
});
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  },
});
const checkCodeUrl = ref('');
const changeCheckCode = (type: CheckCodeType) => {
  // img需要手动加上apiPrefix前缀
  checkCodeUrl.value = `${apiPrefix}${apiList.auth.checkCode}?type=${type}&time=${Date.now()}`;
};
onBeforeMount(() => {
  changeCheckCode(props.type);
});
defineExpose({
  changeCheckCode,
});
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
