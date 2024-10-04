<template>
  <el-image
    class="comment-image"
    :src="src"
    fit="scale-down"
    :zoom-rate="1.2"
    :preview-src-list="imgList || [src]"
    :initial-index="0"
    loading="lazy"
    hide-on-click-modal
    @show="show"
    @close="close"
  ></el-image>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
    imgList?: string[];
  }>(),
  {},
);

function show() {
  toggleHtmlScroll(false);
}
function close() {
  toggleHtmlScroll(true);
}
</script>

<style scoped lang="scss">
.comment-image {
  width: 80px;
  height: 80px;
  background-color: #eee;
}
</style>
