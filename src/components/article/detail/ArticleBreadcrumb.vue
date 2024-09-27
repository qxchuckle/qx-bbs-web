<template>
  <el-breadcrumb separator=">" class="breadcrumb">
    <el-breadcrumb-item
      v-if="articleInfo.pBoardName"
      :to="{
        name: 'FirstLevelBoard',
        params: { pid: articleInfo.pBoardId },
      }"
      >{{ articleInfo.pBoardName }}</el-breadcrumb-item
    >
    <el-breadcrumb-item
      v-if="articleInfo.boardName"
      :to="{
        name: 'SecondLevelBoard',
        params: { pid: articleInfo.pBoardId, cid: articleInfo.boardId },
      }"
      >{{ articleInfo.boardName }}</el-breadcrumb-item
    >
    <el-breadcrumb-item>{{ articleInfo.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArticleInfoType } from '@/type';
const props = defineProps<{
  articleInfo: ArticleInfoType;
}>();
</script>

<style lang="scss">
.breadcrumb {
  font-size: 1.333333rem;
}
</style>
