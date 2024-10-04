<template>
  <div>
    <!-- 占位骨架 -->
    <el-skeleton :rows="5" animated v-if="loading" style="animation: progressive 0.3s" />
    <!-- 数据列表 -->
    <div v-else-if="dataSource.length > 0">
      <slot v-for="(item, index) in dataSource" :data="item" :index="index"></slot>
    </div>
    <!-- 没有数据 -->
    <NoData v-else></NoData>
  </div>
</template>

<script setup lang="ts" generic="T">
const props = defineProps<{
  dataSource: T[];
  loading: boolean;
}>();
const emit = defineEmits<{
  (e: 'loadData'): void;
}>();
</script>

<style scoped></style>
