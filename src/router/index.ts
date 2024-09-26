import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
const Layout = () => import('@/views/Layout.vue');
const UserPage = () => import('@/views/UserPage.vue');
const ArticlePage = () => import('@/views/ArticlePage.vue');
const ArticleDetail = () => import('@/views/ArticleDetail.vue');

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      beforeEnter: async (to, from, next) => {
        await autoLogin();
        next();
      },
      redirect: '/home',
      children: [
        {
          path: 'user/:id',
          name: 'UserPage',
          component: UserPage,
        },
        {
          path: 'home',
          name: 'ArticlePage',
          component: ArticlePage,
        },
        {
          path: 'board/:pid',
          name: 'FirstLevelBoard',
          component: ArticlePage,
        },
        {
          path: 'board/:pid/:cid',
          name: 'SecondLevelBoard',
          component: ArticlePage,
        },
        {
          path: 'article/:id',
          name: 'ArticleDetail',
          component: ArticleDetail,
        },
      ],
    },
  ],
});

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
