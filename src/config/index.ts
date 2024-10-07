// api前缀
export const apiPrefix = '';
// api列表
export const apiList = {
  // 权限相关，注册登陆等
  auth: {
    // 获取验证码
    checkCode: '/api/checkCode',
    // 发送邮件验证码
    sendMailCode: '/api/sendEmailCode',
    // 注册
    register: '/api/register',
    // 登陆
    login: '/api/login',
    // 重置密码
    resetPwd: '/api/resetPwd',
  },
  // 用户相关
  user: {
    // 获取头像
    getAvatar: '/api/file/getAvatar',
    // 获取登陆的用户信息
    getLoginUserInfo: '/api/getUserInfo',
  },
  // 菜单相关
  menu: {
    // 获取菜单列表
    getMenuList: '/api/board/loadBoard',
  },
  // 文章相关
  article: {
    // 获取文章列表
    loadArticleList: '/api/forum/loadArticle',
    // 获取文章详情
    getArticleDetail: '/api/forum/getArticleDetail',
    // 文章点赞
    doLike: '/api/forum/doLike',
    // 下载附件
    downloadAttachment: '/api/forum/attachmentDownload',
    // 获取下载信息，积分、是否下载过
    downloadAttachmentInfo: '/api/forum/getUserDownloadInfo',
    // 发布文章
    postArticle: '/api/forum/postArticle',
    // 修改文章
    updateArticle: '/api/forum/updateArticle',
    // 搜索文章
    searchArticle: '/api/forum/search',
    // 获取文章更新信息
    getArticleUpdate: '/api/forum/articleDetail4Update',
  },
  // 评论相关
  comment: {
    // 获取文章评论
    loadComment: '/api/comment/loadComment',
    // 发表评论
    postComment: '/api/comment/postComment',
    // 评论点赞
    doLike: '/api/comment/doLike',
    // 置顶/取消置顶评论
    topComment: '/api/comment/changeTopType',
  },
  // 图片相关
  image: {
    // 上传图片
    upload: '/api/file/uploadImage',
    // 获取图片 /api/file/getImage/{imageFolder}/{imageName}
    getImage: '/api/file/getImage/',
  },
};
