<template>
  <div class="article-card">
    <div class="article-card-inner">
      <div class="article-content">
        <div class="article-info">
          <UserAvatar :userId="data.userId" :size="30"></UserAvatar>
          <router-link
            :to="{
              name: 'UserPage',
              params: { id: data.userId },
            }"
            class="user-name"
            >{{ data.nickName }}</router-link
          >
          <el-divider direction="vertical"></el-divider>
          <div class="article-time">{{ data.postTime }}</div>
          <el-divider direction="vertical"></el-divider>
          <div class="user-address">{{ data.userIpAddress }}</div>
          <el-divider direction="vertical"></el-divider>
          <div class="article-board">
            <router-link
              class="article-board-item"
              :to="{
                name: 'FirstLevelBoard',
                params: { pid: data.pBoardId },
              }"
              >{{ data.pBoardName }}</router-link
            >
            <span v-if="data.boardId">/</span>
            <router-link
              class="article-board-item"
              :to="{
                name: 'SecondLevelBoard',
                params: { pid: data.pBoardId, cid: data.boardId },
              }"
              >{{ data.boardName }}</router-link
            >
          </div>
        </div>
        <div class="article-title">
          <router-link
            :to="{
              name: 'ArticleDetail',
              params: { id: data.articleId },
            }"
          >
            <span class="top" v-if="data.topType">置顶</span>
            <span>{{ data.title }}</span>
          </router-link>
        </div>
        <div class="article-description">{{ data.summary }}</div>
        <div class="article-footer">
          <!-- 浏览量 -->
          <div class="article-footer-item">
            <i class="iconfont icon-eye-solid"></i>
            <span>{{ data.readCount || '浏览' }}</span>
          </div>
          <!-- 点赞数 -->
          <div class="article-footer-item">
            <i class="iconfont icon-good"></i>
            <span>{{ data.goodCount || '点赞' }}</span>
          </div>
          <!-- 评论数 -->
          <div class="article-footer-item">
            <i class="iconfont icon-comment"></i>
            <span>{{ data.commentCount || '评论' }}</span>
          </div>
        </div>
      </div>
      <ArticleCover :src="cover" :width="160" :height="110" v-if="props.data.cover"></ArticleCover>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
const cover = computed(() => `${apiPrefix}/api/file/getImage/${props.data.cover}`);
</script>

<style scoped lang="scss">
.article-card {
  transition: all 0.3s;
  padding: 12px 15px 0;
  animation: progressive 0.3s;
  &:hover {
    background-color: #f7f8fa;
  }
  .article-card-inner {
    border-bottom: 1px solid $LightGray;
    padding-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .article-content {
      color: $FontGrayColor;
      font-size: 1.083333rem;
      max-width: 100%;
      .article-info {
        display: flex;
        align-items: center;
        font-size: 1.166667rem;

        .user-name {
          margin-left: 10px;
          color: $FontGrayColor;
          transition: color 0.3s;
          &:hover {
            color: $AColor;
          }
        }
        .article-board {
          display: flex;
          gap: 5px;
          .article-board-item {
            color: $FontGrayColor;
            transition: color 0.3s;
            &:hover {
              color: $AColor;
            }
          }
        }
      }
      .article-title {
        font-size: 1.333333rem;
        padding: 5px 0 0 0;
        line-height: 1;
        a {
          font-weight: bolder;
          color: $FontColor;
          transition: color 0.3s;
        }
        &:hover a {
          color: $AColor;
        }
        .top {
          color: $Red;
          margin-right: 5px;
          font-size: 1rem;
          border: 1px solid $Red;
          padding: 1px 2px;
          border-radius: 4px;
        }
      }
      .article-description {
        font-size: 1.166667rem;
        padding: 5px 0 5px 0;
      }
      .article-footer {
        display: flex;
        gap: 15px;
        font-size: 1.166667rem;
        .article-footer-item {
          display: flex;
          gap: 5px;
          align-items: center;
          i {
            font-size: 1.25rem;
            line-height: 1;
          }
        }
      }
    }
  }
}
</style>
