<template>
  <div>
    <CustomDialog v-model:visible="dialogVisible" :buttons="buttons">
      <div style="height: 1500px">1231312313231332</div>
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
const buttons = reactive<DialogButton[]>([
  {
    text: '确定',
    type: 'primary',
  },
  {
    text: '123',
    type: 'default',
  },
]);
</script>

<style scoped lang="scss"></style>
