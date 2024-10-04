// 文章信息类型
export interface ArticleInfoType {
  articleId: string; // 文章ID
  boardId: number; // 板块ID
  boardName: string; // 板块名称
  pBoardId: number; // 父级板块ID
  pBoardName: string; // 父级板块名称
  userId: string; // 用户ID
  nickName: string; // 昵称
  userIpAddress: string; // 所在地
  title: string; // 标题
  cover: string; // 封面
  content: string | null; // 内容 列表内容为空
  summary: string; // 简介
  postTime: string; // 发布时间
  readCount: number; // 阅读数
  goodCount: number; // 点赞数
  commentCount: number; // 评论数
  topType: number; // 置顶类型 0:未置顶 1:已置顶
  attachmentType: number; // 附件类型 0:没附件 1:有附件
  status: number; // 状态 1 已审核
}

// 附件类型
export interface AttachmentType {
  fileId: string; // 文件ID
  fileSize: number; // 文件大小
  fileName: string; // 文件名称
  downloadCount: number; // 下载次数
  fileType: number; // 文件类型 0:压缩包
  integral: number; // 所需积分
}

// 评论排序枚举
export enum CommentOrderEnum {
  new = 1,
  hot = 0,
}

// 评论置顶类型
export enum CommentTopType {
  top = 1,
  cancel = 0,
}
