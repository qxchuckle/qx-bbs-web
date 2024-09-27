<template>
  <div class="comment-header">
    <div class="comment-title">
      评论
      <span class="comment-count">{{ commentData.totalCount }}</span>
    </div>
    <div class="comment-menu">
      <template v-for="(item, index) in commentMenu" :key="item.type">
        <el-divider v-if="index % 2 === 1" direction="vertical" />
        <div
          class="menu-item"
          :class="item.type === orderType ? 'active' : ''"
          @click="changeOrderType(item.type)"
        >
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommentOrderEnum, CommentDataType } from '@/type';
const refreshComments = inject<() => void>('refreshComments')!;
const props = defineProps<{
  orderType: CommentOrderEnum;
  commentData: CommentDataType;
}>();
const emit = defineEmits<{
  (e: 'update:orderType', type: CommentOrderEnum): void;
}>();
const commentMenu = [
  { type: CommentOrderEnum.hot, name: '热门' },
  { type: CommentOrderEnum.new, name: '最新' },
];
function changeOrderType(type: CommentOrderEnum) {
  emit('update:orderType', type);
  refreshComments();
}
</script>

<style lang="scss">
.comment-header {
  display: flex;
  margin-bottom: 10px;
  line-height: 1;
  align-items: center;
  .comment-title {
    font-size: 1.5rem;
    margin-right: 30px;
    .comment-count {
      font-size: 1.166667rem;
      color: $FontGrayColor;
    }
  }
  .comment-menu {
    display: flex;
    gap: 5px;
    padding-top: 5px;
    .menu-item {
      font-size: 1.166667rem;
      color: $FontGrayColor;
      transition: color 0.3s;
      cursor: pointer;
      &:hover {
        color: $FontColor;
      }
      &.active {
        color: $AColor;
      }
    }
  }
}
</style>
