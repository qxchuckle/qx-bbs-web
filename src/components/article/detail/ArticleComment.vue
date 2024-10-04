<template>
  <div class="comment-body">
    <!-- 标题和菜单项 -->
    <div class="comment-header">
      <comment-header v-model:orderType="orderType" :comment-data="commentData"></comment-header>
    </div>
    <!-- 发布评论 -->
    <div class="comment-form-panel">
      <CommentForm :user-id="userStore.userId" :show-insert-img="!!userStore.userId"></CommentForm>
    </div>
    <!-- 评论列表区 -->
    <div class="comment-container">
      <CommentList
        :comment-list="commentData.list || []"
        v-model:current-page="currentPage"
        :total-count="commentData.totalCount"
        v-model:page-size="commentData.pageSize"
        :loading="loading"
      ></CommentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticleInfoType, CommentOrderEnum, CommentDataType } from '@/type';
const userStore = useUserStore();
const props = defineProps<{
  articleInfo: ArticleInfoType;
}>();
// 将当前文章ID提供给子组件
provide('activeUserId', props.articleInfo.userId);
provide('articleId', props.articleInfo.articleId);
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
// 加载
const loading = ref(false);

// 获取评论列表
async function getArticleComments(showLoading = true) {
  showLoading && (loading.value = true);
  const result = await requestArticleComments(
    props.articleInfo.articleId,
    currentPage.value,
    orderType.value,
  );
  if (result) {
    commentData.value = result;
  }
  showLoading && (loading.value = false);
}
// 刷新评论
function refreshComments(showLoading = true) {
  getArticleComments(showLoading);
}
// 提供给子组件的方法
provide('refreshComments', refreshComments);

// 初始化
onBeforeMount(() => {
  getArticleComments();
});

// 监听页码变化，刷新评论
watch(currentPage, () => {
  refreshComments();
});

// 将评论数量暴露出去
const commentCount = computed(() => commentData.value.totalCount);
defineExpose({
  commentCount,
});
</script>

<style lang="scss">
.comment-body {
  font-size: 1.333333rem;
}
</style>
