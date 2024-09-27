<template>
  <div class="comment-body">
    <!-- 标题和菜单项 -->
    <div class="comment-header">
      <comment-header v-model:orderType="orderType" :comment-data="commentData"></comment-header>
    </div>
    <!-- 发布评论 -->
    <div class="comment-form-panel">
      <CommentForm></CommentForm>
    </div>
    <!-- 评论列表区 -->
    <div class="comment-container">
      <CommentList :comment-list="commentData.list || []"></CommentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticleInfoType, CommentOrderEnum, CommentDataType } from '@/type';
const props = defineProps<{
  articleInfo: ArticleInfoType;
}>();
// 评论数据
const commentData = ref<CommentDataType>({
  list: null,
  totalCount: 0,
  pageSize: 1,
  pageNo: 1,
  pageTotal: 1,
});
// 评论排序类型
const orderType = ref<CommentOrderEnum>(CommentOrderEnum.hot);
// 页码
const currentPage = ref(1);

// 获取评论列表
async function getArticleComments() {
  const result = await requestArticleComments(
    props.articleInfo.articleId,
    currentPage.value,
    orderType.value,
  );
  if (result) {
    commentData.value = result;
  }
}
// 刷新评论
function refreshComments() {
  getArticleComments();
}
// 提供给子组件的方法
provide('refreshComments', refreshComments);

// 初始化
onBeforeMount(() => {
  getArticleComments();
});
</script>

<style lang="scss">
.comment-body {
  font-size: 1.333333rem;
}
</style>
