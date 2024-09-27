<template>
  <!-- 文章详情页 -->
  <div class="article-detail-body">
    <!-- 文章详情面板 -->
    <div class="article-detail-panel" v-if="articleInfo">
      <!-- 板块分类面包屑 -->
      <div class="breadcrumb-box">
        <ArticleBreadcrumb :articleInfo="articleInfo"></ArticleBreadcrumb>
      </div>
      <!-- 文章容器 -->
      <div class="article-container">
        <div class="main-panel">
          <!-- 文章详情 -->
          <div class="article-detail child-panel">
            <!-- 文章的基本信息 -->
            <ArticleInfo :articleInfo="articleInfo"></ArticleInfo>
            <!-- 文章内容 -->
            <ArticleContent :articleInfo="articleInfo" v-if="articleInfo.content"></ArticleContent>
          </div>
          <!-- 附件 -->
          <div class="attachment-box child-panel" v-if="attachment" id="view-attachment">
            <Attachment :attachment="attachment" @download-attachment="refresh"></Attachment>
          </div>
          <!-- 评论区 -->
          <div class="comment-panel child-panel" id="view-comment">
            <ArticleComment :article-info="articleInfo"></ArticleComment>
          </div>
        </div>
        <!-- 侧边栏 -->
        <div class="sidebar-panel">
          <ArticleSidebar class="sticky"></ArticleSidebar>
        </div>
        <!-- 左侧快捷操作栏 -->
        <div class="quick-panel sticky">
          <QuickList
            :article-info="articleInfo"
            :attachment="attachment"
            :is-like="isLike"
            @like-article="refresh"
          ></QuickList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticleInfoType, AttachmentType } from '@/type';

const route = useRoute();
// 文章信息
const articleInfo = ref<ArticleInfoType | null>(null);
// 附件信息
const attachment = ref<AttachmentType | null>(null);
// 是否已经点赞
const isLike = ref(false);

// 获取文章详情
const getArticleDetail = async () => {
  const result = await requestArticleDetail(route.params.id as string);
  if (!result) return;
  articleInfo.value = result.forumArticle;
  attachment.value = result.attachment;
  isLike.value = result.haveLike;
};
// 初始化
onBeforeMount(() => {
  getArticleDetail();
});

// 刷新
const refresh = (id: string) => {
  getArticleDetail();
};

// 更新菜单项
const menuStore = useMenuStore();
onUpdated(() => {
  menuStore.updateCurMenu(articleInfo.value?.pBoardId || null, articleInfo.value?.boardId || null);
});
</script>

<style scoped lang="scss">
.article-detail-body {
  max-width: $LayoutWidth;
  margin: 10px auto;
  padding: 0 10px;
  width: 100%;
  .article-detail-panel {
    .breadcrumb-box {
      padding: 10px 0;
      padding-left: 3px;
    }
    .article-container {
      display: flex;
      gap: 20px;
      position: relative;
      .main-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: calc(100% - 320px);
        .child-panel {
          background-color: $White;
          border-radius: 4px;
          width: 100%;
        }
        .article-detail {
          padding: 0 15px;
        }
        .attachment-box {
          padding: 15px;
        }
        .comment-panel {
          padding: 15px;
        }
      }

      .sticky {
        position: sticky;
      }

      .sidebar-panel {
        width: 300px;
        min-width: 300px;
      }

      .quick-panel {
        order: -1;
        top: 80px;
        left: 0;
        margin-right: 10px;
        margin-left: -80px;
        height: fit-content;
        border-radius: 4px;
        margin-top: 60px;
      }
    }
  }
}
</style>
