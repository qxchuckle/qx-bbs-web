<template>
  <!-- 文章内容 -->
  <div class="article-content" v-html="articleContent" @click="handleContentClick"></div>
  <ImageViewer
    v-model:visible="isImageViewerShow"
    :index="imageIndex"
    :imageList="imageList"
  ></ImageViewer>
</template>

<script setup lang="ts">
import { ArticleInfoType } from '@/type';
// import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // 你可以选择其他样式

const props = defineProps<{
  articleInfo: ArticleInfoType;
}>();

const isImageViewerShow = ref(false);
const imageIndex = ref(0);
const imageList = computed(() => {
  if (props.articleInfo.content) {
    return getImgSrcFromHtml(props.articleInfo.content);
  }
  return [];
});

function handleContentClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.tagName === 'IMG') {
    const src = target.getAttribute('src');
    if (src) {
      viewImage(src);
    }
  }
}
// 浏览图片
function viewImage(src: string) {
  imageIndex.value = imageList.value.indexOf(src);
  isImageViewerShow.value = true;
}

const articleContent = ref(highlightCode());

// 代码高亮
function highlightCode() {
  const content = props.articleInfo.content;
  if (!content) return '';
  // 匹配代码块
  return content;
}
</script>

<style lang="scss">
.article-content {
  font-size: 1.333333rem;
  line-height: 1.5;
  padding: 10px 0;
  p {
    margin-bottom: 15px;
  }
  img {
    border-radius: 4px;
    max-width: 100%;
    cursor: pointer;
  }
  .v-md-pre-wrapper {
    overflow-x: auto;
    background-color: #333;
    border-radius: 4px;
    border: 10px solid #333;
    border-width: 5px 10px 3px 10px;
    .v-md-hljs-js {
      color: #fff;
      font-size: 12px;
      code {
        font-size: 12px;
      }
    }
  }
}
</style>
