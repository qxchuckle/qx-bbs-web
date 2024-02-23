<template>
  <el-form-item prop="submit">
    <el-button type="primary" size="default" @click="submit" style="width: 100%"
      >{{ text }}
    </el-button>
  </el-form-item>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: 'Submit',
  },
  prop: {
    type: String,
    default: 'submit',
  },
});
const emit = defineEmits(['submit']);
const submit = () => {
  emit('submit');
};
</script>

<style scoped lang="scss"></style>
