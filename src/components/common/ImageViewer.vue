<template>
  <div class="image-viewer" v-if="visible">
    <el-image-viewer
      :initial-index="index"
      hide-on-click-modal
      :url-list="imageList"
      @close="handleClose"
    ></el-image-viewer>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    visible: boolean; // 是否显示
    index: number; // 初始浏览的图片索引
    imageList: Array<string>; // 图片链接列表
  }>(),
  {
    visible: false,
    index: 0,
    imageList: () => [],
  },
);

watch(
  () => props.visible,
  (val) => {
    toggleHtmlScroll(!val);
  },
);

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

function handleClose() {
  emit('update:visible', false);
}
</script>

<style lang="scss">
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  .el-image-viewer__mask {
    height: calc(100% + 50px);
  }
}
</style>
