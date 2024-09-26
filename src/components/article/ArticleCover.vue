<template>
  <el-image
    class="img"
    :src="src"
    fit="cover"
    :preview-src-list="[src]"
    :preview-teleported="true"
    :zoom-rate="1.2"
    :max-scale="7"
    :min-scale="0.2"
    :hide-on-click-modal="true"
    :z-index="9999"
    :close-on-press-escape="true"
    :teleported="true"
    loading="lazy"
    :style="`width: ${width}px; height: ${height}px`"
  >
    <template #error>
      <div>FAILED</div>
    </template>
  </el-image>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  preview: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.img {
  border-radius: 4px;
  border: 1px solid $LightGray;
}
</style>
