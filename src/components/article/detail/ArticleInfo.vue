<template>
  <!-- 文章信息 -->
  <div class="article-info">
    <!-- 标题 -->
    <div class="title">{{ articleInfo.title }}</div>
    <div class="author">
      <!-- 作者头像 -->
      <UserAvatar :user-id="articleInfo.userId" :size="50"></UserAvatar>
      <!-- 作者名称 -->
      <div class="info">
        <div class="username">
          <router-link
            class="username"
            :to="{
              name: 'UserPage',
              params: { id: articleInfo.userId },
            }"
            >{{ articleInfo.nickName }}</router-link
          >
        </div>
        <div class="miscellaneous">
          <!-- 发布时间 -->
          <div class="time">{{ articleInfo.postTime }}</div>
          <!-- 地点 -->
          <div class="location">{{ articleInfo.userIpAddress }}</div>
          <!-- 浏览量 -->
          <div class="view">
            <i class="iconfont icon-eye-solid"></i>
            <span>{{ articleInfo.readCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticleInfoType } from '@/type';
const props = defineProps<{
  articleInfo: ArticleInfoType;
}>();
</script>

<style scoped lang="scss">
.article-info {
  padding: 15px 0 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  div.title {
    width: 100%;
    font-size: 1.666667rem;
    font-weight: bold;
  }
  .author {
    display: flex;
    gap: 15px;
    align-items: center;
    .info {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      font-size: 1.166667rem;
      color: $FontGrayColor;
      div.username {
        width: 100%;
        font-size: 1.333333rem;
      }
      .miscellaneous {
        display: flex;
        gap: 10px;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
