import { ArticleInfoType, AttachmentType } from './article';

// 获取文章详情
export interface getArticleDetailType {
  forumArticle: ArticleInfoType;
  attachment: AttachmentType;
  haveLike: boolean;
}
