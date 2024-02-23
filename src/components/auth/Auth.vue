<template>
  <div>
    <CustomDialog v-model:visible="dialogVisible" :title="authFormRef?.title || '标题'">
      <AuthForm v-if="dialogVisible" ref="authFormRef"></AuthForm>
    </CustomDialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update:visible']);
const dialogVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emit('update:visible', val);
  },
});
const authFormRef = ref<any | null>(null);
</script>

<style scoped lang="scss"></style>
