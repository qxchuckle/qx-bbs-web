import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
const Layout = () => import('@/views/Layout.vue');
const UserPage = () => import('@/views/UserPage.vue');
const ArticlePage = () => import('@/views/ArticlePage.vue');
const ArticleDetail = () => import('@/views/ArticleDetail.vue');
const EditArticle = () => import('@/views/EditArticle.vue');

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout', // 基本布局
      component: Layout,
      beforeEnter: async (to, from, next) => {
        await autoLogin();
        next();
      },
      redirect: '/home',
      children: [
        {
          path: 'user/:id',
          name: 'UserPage', // 用户主页
          component: UserPage,
        },
        {
          path: 'home',
          name: 'ArticlePage', // 首页
          component: ArticlePage,
        },
        {
          path: 'board/:pid',
          name: 'FirstLevelBoard', // 一级板块
          component: ArticlePage,
        },
        {
          path: 'board/:pid/:cid',
          name: 'SecondLevelBoard', // 二级板块
          component: ArticlePage,
        },
        {
          path: 'article/:id',
          name: 'ArticleDetail', // 文章详情
          component: ArticleDetail,
        },
        {
          path: 'new',
          name: 'NewArticle', // 新建文章
          component: EditArticle,
          beforeEnter: (to, from, next) => {
            const userStore = useUserStore();
            const pageStore = usePageStore();
            if (userStore.isLogin) {
              next();
            } else {
              if (!from.name) {
                next({ name: 'ArticlePage' });
              }
              message.warning('登录后才能发帖');
              pageStore.showLogin();
            }
          },
        },
        {
          path: 'edit/:id',
          name: 'EditArticle', // 编辑文章
          component: EditArticle,
        },
      ],
    },
  ],
});

// 自动登录
async function autoLogin() {
  const userStore = useUserStore();
  if (userStore.remember && !userStore.isLogin) {
    const result = await request({
      url: apiList.user.getLoginUserInfo,
    });
    if (!result) return;
    if (result.data) {
      userStore.$patch((state) => {
        state.username = result.data?.nickName;
        state.userId = result.data?.userId;
        state.isAdmin = result.data?.isAdmin ?? false;
        state.province = result.data?.province ?? '未知';
        state.isLogin = true;
      });
    }
  }
}

export default router;
