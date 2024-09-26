<template>
  <!-- 文章内容 -->
  <div class="article-content" v-html="articleInfo.content"></div>
</template>

<script setup lang="ts">
import { ArticleInfoType } from '@/type';
const props = defineProps<{
  articleInfo: ArticleInfoType;
}>();
</script>

<style lang="scss">
.article-content {
  font-size: 1.333333rem;
  line-height: 1.5;
  p {
    margin-bottom: 15px;
  }
  img {
    cursor: pointer;
  }
}
</style>
