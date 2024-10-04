<template>
  <div class="quick-list">
    <el-badge :value="gooCount" type="info">
      <div @click="handleLike(articleId)" class="quick-item" :class="isLike ? 'isLike' : ''">
        <i class="iconfont icon-good"></i>
      </div>
    </el-badge>
    <el-badge :value="commentCount" type="info">
      <div class="quick-item" @click="handleGoToPosition('view-comment')">
        <i class="iconfont icon-comment"></i>
      </div>
    </el-badge>
    <el-badge :value="1" type="info" :hidden="true" v-if="haveAttachment">
      <div class="quick-item" @click="handleGoToPosition('view-attachment')">
        <i class="iconfont icon-attachment"></i>
      </div>
    </el-badge>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  articleId: string;
  gooCount: number;
  commentCount: number;
  haveAttachment: boolean;
  isLike: boolean;
}>();
const emit = defineEmits<{
  (e: 'likeArticle', id: string): void;
}>();

function handleGoToPosition(id: string) {
  goToPosition(id, 120);
}

// 点赞
function handleLike(id: string) {
  requestLikeArticle(id)
    .then(() => {
      emit('likeArticle', id);
    })
    .catch(() => {});
}
</script>

<style lang="scss">
.quick-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .quick-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $White;
    cursor: pointer;
    color: $FontGrayColor;
    i {
      font-size: 1.666667rem;
    }
    &.isLike {
      color: $Red;
    }
  }
  .el-badge__content.is-fixed {
    top: 5px;
    right: 15px;
  }
}
</style>
