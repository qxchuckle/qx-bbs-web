import { PublishArticleFormType } from '@/type';

// 上传图片
export const requestImageUpload = async (file: File) => {
  const result = await request<{
    fileName: string;
  }>({
    url: apiList.image.upload,
    params: {
      file,
    },
    showLoading: false,
    needLogin: true,
  });
  if (!result) return Promise.reject(false);
  return result.data;
};

// 发布文章
export const requestPostArticle = async (article: PublishArticleFormType) => {
  const result = await request<string>({
    url: apiList.article.postArticle,
    params: article,
    showLoading: true,
    needLogin: true,
  });
  if (!result) return Promise.reject(false);
  return result.data;
};

// 更新文章
export const requestUpdateArticle = async (
  article: PublishArticleFormType & { articleId: string; attachmentType: 0 | 1 },
) => {
  const result = await request<string>({
    url: apiList.article.updateArticle,
    params: article,
    showLoading: true,
    needLogin: true,
  });
  if (!result) return Promise.reject(false);
  return result.data;
};
