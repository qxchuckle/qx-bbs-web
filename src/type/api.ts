import { ArticleInfoType, AttachmentType } from './article';

// 获取文章详情
export interface GetArticleDetailType {
  forumArticle: ArticleInfoType;
  attachment: AttachmentType;
  haveLike: boolean;
}

// 文章点赞
export type GoodArticleType = null;

// 获取附件下载信息
export interface DownloadAttachmentInfoType {
  userIntegral: number; // 用户积分
  haveDownload: boolean; // 是否下载过、购买过
}

// 评论信息
export interface CommentType {
  commentId: number; // 评论ID
  pCommentId: number; // 父级评论ID
  articleId: string; // 文章ID
  content: string; // 评论内容
  imgPath: string | null; // 评论图片
  userId: string; // 评论人ID
  nickName: string; // 评论人昵称
  userIpAddress: string; // 评论人所在地
  replyUserId: string | null; // 回复他人ID
  replyNickName: string | null; // 回复他人昵称
  topType: number; // 置顶类型 0:未置顶 1:置顶
  postTime: string; // 发布时间
  goodCount: number; // 点赞数
  status: number; // 状态
  likeType: number | null; // 登录用户是否已经点赞 null未点赞 1:已点赞
  children: Comment[] | null; // 下级评论
}

// 评论列表
export interface CommentDataType {
  totalCount: number; //总记录数
  pageSize: number; //分页大小
  pageNo: number; //页码
  pageTotal: number; //总页数
  list: CommentType[] | null; //评论列表
}
