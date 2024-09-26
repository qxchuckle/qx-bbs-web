<template>
  <div class="no-data">
    <i class="iconfont icon-empty"></i>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    default: '空空如也',
  },
});
</script>

<style scoped lang="scss">
.no-data {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.333333rem;
  color: $FontGrayColor;
  .iconfont {
    font-size: 2.916667rem;
  }
}
</style>
