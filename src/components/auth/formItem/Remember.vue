<template>
  <el-form-item style="margin-bottom: 15px" prop="prop" size="large">
    <el-checkbox v-model="value" class="check">记住我</el-checkbox>
  </el-form-item>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  prop: {
    type: String,
    default: 'remember',
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
.check {
  height: fit-content;
}
</style>
