export enum EditTypeEnum {
  Markdown = 'markdown',
  RichText = 'richText',
}

// 文章基本信息表单类型
export interface ArticleFormDataType {
  title: string; // 标题
  boardId: number[]; // 板块id
  cover: File | null; // 封面
  abstract: string; // 摘要
  attachment: File | null; // 附件
  integral: number; // 下载附件所需积分
}

export enum PublishEditorEnum {
  Markdown = 1,
  RichText = 0,
}

// 发布文章表单类型
export interface PublishArticleFormType {
  title: string; // 标题
  content: string; // 内容
  markdownContent?: string; // markdown内容,markdown编辑的时候必传
  editorType: PublishEditorEnum; // 编辑器类型
  summary: string; // 摘要
  pBoardId: number; // 父板块id
  boardId?: number; // 板块id
  integral?: number; // 下载附件所需积分
  cover?: File; // 封面
  attachment?: File; // 附件
}
