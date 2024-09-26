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
  },
};
