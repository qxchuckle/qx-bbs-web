<template>
  <div class="comment-list">
    <!-- 数据列表 -->
    <DataList :dataSource="commentList" :loading="loading">
      <template v-slot="{ data }">
        <!-- 渲染每个评论 -->
        <CommentCard
          :commentInfo="data"
          :key="data.commentId"
          @show-reply="handleShowReply"
          :showReply="showReplyId === data.commentId"
        ></CommentCard>
      </template>
    </DataList>
    <!-- 分页 -->
    <div class="pagination">
      <DataPagination
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
        :total="totalCount"
      ></DataPagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommentType } from '@/type';
const props = defineProps<{
  commentList: CommentType[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  loading: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:pageSize', size: number): void;
  (e: 'update:currentPage', page: number): void;
}>();

// 页码和每页条数
const currentPage = computed({
  get() {
    return props.currentPage;
  },
  set(val) {
    emit('update:currentPage', val);
  },
});
const pageSize = computed({
  get() {
    return props.pageSize;
  },
  set(val) {
    emit('update:pageSize', val);
  },
});

const showReplyId = ref<null | number>(null);
// 显示回复框
const handleShowReply = (commentInfo: CommentType | null) => {
  showReplyId.value = commentInfo ? commentInfo.commentId : null;
};
</script>

<style lang="scss">
.comment-list {
  .pagination {
    margin-top: 15px;
    padding: 5px 10px;
  }
}
</style>
