<template>
  <div class="edit-panel">
    <div class="edit-container">
      <!-- 左板块，放编辑器 -->
      <div class="left-panel">
        <div class="left-container">
          <EditPanel ref="editRef"></EditPanel>
        </div>
      </div>
      <!-- 右板块，放文章信息表单 -->
      <div class="right-panel">
        <div class="right-container">
          <ArticleInfoForm v-model="articleFormData" @submit="handleSubmit"></ArticleInfoForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditPanel from '@/components/edit/EditPanel.vue';
import { apiPrefix } from '@/config';
import ArticleInfoForm from '@/components/edit/ArticleInfoForm.vue';
import {
  EditTypeEnum,
  ArticleFormDataType,
  PublishEditorEnum,
  GetArticleUpdateType,
  PublishArticleFormType,
} from '@/type';
const route = useRoute();

const editRef = ref<InstanceType<typeof EditPanel>>();
const isNewEdit = computed(() => route.name === 'NewArticle');
const articleId = ref(route.params.id as string);

const articleFormData = reactive<ArticleFormDataType>({
  title: '',
  boardId: [],
  cover: null,
  abstract: '',
  attachment: null,
  integral: 0,
});
const attachmentName = ref('');
const coverUrl = ref('');
provide('attachmentName', attachmentName);
provide('coverUrl', coverUrl);

// 文章详情
const article = ref<GetArticleUpdateType>();
onMounted(async () => {
  if (isNewEdit.value) {
    return;
  }
  // 获取文章详情
  article.value = await requestArticleUpdateDetail(articleId.value);
  if (!article.value) {
    return;
  }
  const forumArticle = article.value.forumArticle;
  const attachment = article.value.attachment;
  if (!forumArticle) {
    return;
  }
  // 设置编辑器内容、类型
  if (article.value?.forumArticle.editorType === PublishEditorEnum.Markdown) {
    editRef.value!.editType = EditTypeEnum.Markdown;
    editRef.value!.editValue = forumArticle.markdownContent;
  } else {
    editRef.value!.editType = EditTypeEnum.RichText;
    editRef.value!.editValue = forumArticle.content!;
  }
  // 设置文章信息
  articleFormData.title = forumArticle.title;
  articleFormData.boardId = [
    forumArticle.pBoardId,
    ...(forumArticle.boardId ? [forumArticle.boardId] : []),
  ];
  articleFormData.abstract = forumArticle.summary;
  articleFormData.integral = attachment?.integral || 0;
  attachmentName.value = attachment?.fileName || '';
  coverUrl.value = forumArticle.cover ? `${apiPrefix}/api/file/getImage/${forumArticle.cover}` : '';
});

const handleSubmit = async (data: ArticleFormDataType) => {
  const isMarkdown = editRef.value!.editType === EditTypeEnum.Markdown;
  const msg = isNewEdit.value ? '发布' : '修改';
  try {
    // 文章信息
    const article: PublishArticleFormType = {
      title: data.title,
      content: editRef.value!.htmlContent,
      markdownContent: isMarkdown ? editRef.value!.editValue : undefined,
      editorType: isMarkdown ? PublishEditorEnum.Markdown : PublishEditorEnum.RichText,
      summary: data.abstract,
      pBoardId: data.boardId[0],
      boardId: data.boardId[1],
      integral: data.integral,
    };
    if (data.cover) {
      article.cover = data.cover;
    }
    if (data.attachment) {
      article.attachment = data.attachment;
    }
    // 结果
    let result: string;
    // 判断是新增还是修改
    if (isNewEdit.value) {
      result = await requestPostArticle(article);
    } else {
      result = await requestUpdateArticle({
        ...article,
        articleId: articleId.value,
        attachmentType: attachmentName.value ? 1 : 0,
      });
    }
    // 跳转到文章详情页
    router.push({
      name: 'ArticleDetail',
      params: { id: result },
    });
    nextTick(() => {
      message.success(`文章${msg}成功`);
    });
  } catch {
    message.error(`文章${msg}失败`);
  }
};
</script>

<style scoped lang="scss">
.edit-panel {
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  min-width: 600px;
  .edit-container {
    display: flex;
    gap: 10px;
    padding-top: 10px;
    height: calc(100vh - 55px);
    // 左板块
    .left-panel {
      max-width: 100%;
      width: 100%;
      height: 100%;
      .left-container {
        height: 100%;
        background-color: $White;
        border-radius: 4px;
      }
    }
    // 右板块
    .right-panel {
      max-width: 400px;
      min-width: 300px;
      width: 100%;
      height: 100%;
      .right-container {
        border-radius: 4px;
        height: 100%;
      }
    }
  }
}
</style>
