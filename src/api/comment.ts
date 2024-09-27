import { CommentDataType, CommentOrderEnum } from '@/type';

// 获取文章评论
export const requestArticleComments = async (
  articleId: string,
  page: number = 1,
  orderType: CommentOrderEnum = CommentOrderEnum.hot,
) => {
  const result = await request<CommentDataType>({
    url: apiList.comment.loadComment,
    params: {
      articleId,
      orderType,
      page,
    },
    showLoading: false,
  });
  if (!result) return;
  return result.data;
};
