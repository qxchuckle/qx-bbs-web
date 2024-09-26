<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    layout="prev, pager, next, jumper, total"
    :background="background"
    :hide-on-single-page="false"
  ></el-pagination>
</template>

<script setup lang="ts">
const props = defineProps({
  // 当前页码
  currentPage: {
    type: Number,
    required: true,
  },
  // 每页显示的数据条数
  pageSize: {
    type: Number,
    required: true,
  },
  // 数据总数
  total: {
    type: Number,
    required: true,
  },
  background: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update:currentPage', 'update:pageSize']);
const currentPage = computed({
  get: () => props.currentPage,
  set: (val: number) => {
    console.log(val);
    emit('update:currentPage', val);
  },
});
const pageSize = computed({
  get: () => props.pageSize,
  set: (val: number) => {
    console.log(val);
    emit('update:pageSize', val);
  },
});
</script>

<style scoped></style>
