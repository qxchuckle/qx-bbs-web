import { CommentDataType, CommentOrderEnum, CommentType, CommentTopType } from '@/type';
import type { UploadRawFile } from 'element-plus';

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
  if (!result) return Promise.reject(false);
  return result.data;
};

// 发表评论
export const requestPostComment = async (
  articleId: string,
  content: string,
  pCommentId: number,
  replyUserId?: string,
  image?: UploadRawFile,
) => {
  const result = await request<CommentType>({
    url: apiList.comment.postComment,
    params: {
      articleId,
      content,
      pCommentId,
      replyUserId,
      image,
    },
    needLogin: true,
    showLoading: false,
  });
  if (!result) return Promise.reject(false);
  return result.data;
};

// 点赞评论
export const requestLikeComment = async (commentId: number) => {
  const result = await request<CommentType>({
    url: apiList.comment.doLike,
    params: {
      commentId,
    },
    needLogin: true,
    showLoading: false,
  });
  if (!result) return Promise.reject(false);
  return result.data;
};

// 置顶/取消置顶评论
export const requestTopComment = async (commentId: number, topType: CommentTopType) => {
  const result = await request<CommentType>({
    url: apiList.comment.topComment,
    params: {
      commentId,
      topType,
    },
    needLogin: true,
    showLoading: false,
  });
  if (!result) return Promise.reject(false);
  return result.data;
};
