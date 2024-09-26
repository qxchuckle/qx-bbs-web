<template>
  <!-- 文章详情页 -->
  <div class="article-detail-body">
    <!-- 文章详情面板 -->
    <div class="article-detail-panel" v-if="articleInfo">
      <!-- 板块分类面包屑 -->
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
      <!-- 文章容器 -->
      <div class="article-container">
        <div class="main-panel">
          <!-- 文章详情 -->
          <div class="article-detail">
            <!-- 文章的基本信息 -->
            <ArticleInfo :articleInfo="articleInfo"></ArticleInfo>
            <!-- 文章内容 -->
            <ArticleContent :articleInfo="articleInfo" v-if="articleInfo.content"></ArticleContent>
          </div>
          <!-- 附件 -->
          <div class="attachment-box" v-if="attachment">
            <Attachment :attachment="attachment"></Attachment>
          </div>
        </div>
        <!-- 侧边栏 -->
        <div class="sidebar"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleDetailType, ArticleInfoType, AttachmentType } from '@/type';

const route = useRoute();
// 文章信息
const articleInfo = ref<ArticleInfoType | null>(null);
// 附件信息
const attachment = ref<AttachmentType | null>(null);
// 是否已经点赞
const isLike = ref(false);

// 获取文章详情
const getArticleDetail = async () => {
  const result = await request<getArticleDetailType>({
    url: apiList.article.getArticleDetail,
    params: {
      articleId: route.params.id,
    },
  });
  if (!result) return;
  console.log(result.data);
  articleInfo.value = result.data?.forumArticle;
  attachment.value = result.data?.attachment;
  isLike.value = result.data?.haveLike;
};
// 初始化
onBeforeMount(() => {
  getArticleDetail();
});
</script>

<style scoped lang="scss">
.article-detail-body {
  max-width: $LayoutWidth;
  margin: 10px auto;
  width: 100%;
  .article-detail-panel {
    .breadcrumb {
      padding: 10px 0;
      padding-left: 3px;
      font-size: 1.333333rem;
    }
    .article-container {
      display: flex;
      gap: 20px;
      .main-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        .article-detail {
          padding: 0 15px;
          background-color: $White;
          border-radius: 4px;
          width: 100%;
        }
        .attachment-box {
          padding: 15px;
          background-color: $White;
          width: 100%;
        }
      }

      .sidebar {
        position: sticky;
        top: 60px;
        width: 300px;
        height: 400px;
        background-color: $White;
        border-radius: 4px;
      }
    }
  }
}
</style>
