<template>
  <!-- 文章列表页 -->
  <div class="article-body">
    <!-- 分类板块的二级导航菜单 -->
    <SecondaryMenu></SecondaryMenu>
    <!-- 文章列表容器 -->
    <div class="article-panel">
      <!-- 顶部栏 -->
      <div class="top-nav">
        <!-- 切换排序 -->
        <div class="nav-item" :class="navTab === 0 && 'active'" @click="changeNavTab(0)">热榜</div>
        <el-divider direction="vertical" />
        <div class="nav-item" :class="navTab === 2 && 'active'" @click="changeNavTab(2)">最新</div>
        <el-divider direction="vertical" />
        <div class="nav-item" :class="navTab === 1 && 'active'" @click="changeNavTab(1)">发布</div>
      </div>
      <!-- 文章列表 -->
      <div class="article-list">
        <!-- 占位骨架 -->
        <el-skeleton
          :rows="5"
          animated
          v-if="loading"
          style="padding: 15px; animation: progressive 0.3s"
        />
        <!-- 文章项 -->
        <div
          class="article-item"
          v-else-if="articleList.length"
          v-for="(item, index) in articleList"
          :key="index"
        >
          <!-- 文章卡片 -->
          <article-card :data="item"></article-card>
        </div>
        <!-- 没有文章 -->
        <NoData v-else></NoData>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <DataPagination
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :total="totalCount"
        ></DataPagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
// 更新当前菜单信息
const menuStore = useMenuStore();
// 文章列表信息
const articleListInfo = ref<any>({
  totalCount: 0,
  pageSize: 0,
  pageNo: 1,
  list: [],
});
// 文章列表
const articleList = computed(() => articleListInfo.value.list);
// 当前页，set时触发加载
const currentPage = computed({
  get: () => articleListInfo.value.pageNo,
  set: (val: number) => {
    loadActive(val, pageSize.value);
  },
});
// 每页条数，set时触发加载
const pageSize = computed({
  get: () => articleListInfo.value.pageSize,
  set: (val: number) => {
    loadActive(currentPage.value, val);
  },
});
// 总条数
const totalCount = ref(0);
// 是否加载中，用于控制骨架动画
const loading = ref(false);
// 导航栏tab
const navTab = ref(0); // 0:热门1:发布时间2:最新发布
// 切换导航栏tab
const changeNavTab = (tab: number) => {
  navTab.value = tab;
  // 将页码重置为1，触发加载
  currentPage.value = 1;
};
// 加载文章列表
const loadActive = async (page: number, size: number) => {
  // 加载中
  loading.value = true;
  // 请求参数
  const params: {
    pageNo: number;
    pageSize: number;
    orderType: number;
    pBoardId?: number;
    boardId?: number;
  } = {
    pageNo: page,
    pageSize: size,
    orderType: navTab.value,
  };
  // 如果有板块id，加入请求参数
  if (route.params.pid && route.params.cid) {
    params.pBoardId = parseInt(route.params.pid as string);
    params.boardId = parseInt(route.params.cid as string);
  } else if (route.params.pid) {
    params.pBoardId = parseInt(route.params.pid as string);
  }
  // 发出请求
  const result = await request({
    url: apiList.article.loadArticleList,
    params,
    showLoading: false,
  });
  // 加载完毕
  if (!result) return;
  // 更新文章列表信息
  articleListInfo.value = result.data;
  // 更新总条数
  totalCount.value = result.data.totalCount;
  // 加载完毕
  loading.value = false;
};
// 初始化加载
onBeforeMount(() => {
  loadActive(currentPage.value, pageSize.value);
});
onUpdated(() => {
  menuStore.updateCurMenu(
    parseInt(route.params.pid as string),
    parseInt(route.params.cid as string),
  );
});
// 监听路由变化，重置页码，触发加载，主要是为了切换板块时重新加载文章
watch(
  () => [route.params],
  () => {
    currentPage.value = 1;
  },
);
</script>

<style scoped lang="scss">
.article-body {
  max-width: $LayoutWidth;
  margin: 10px auto;
  width: 100%;
  .article-panel {
    background-color: $White;
    border-radius: 4px;
    .top-nav {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: row;
      align-content: center;
      justify-content: flex-start;
      position: relative;
      border-bottom: 1px solid $LightGray;
      .nav-item {
        padding: 8px 15px;
        position: relative;
        display: flex;
        justify-content: center;
        font-size: 1.25rem;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: $Blue;
        }
        &.active::after {
          display: block;
          content: '';
          position: absolute;
          width: 30%;
          height: 3px;
          background-color: $Blue;
          bottom: 0;
          border-radius: 2px;
        }
      }
    }
    // .article-list {
    //   min-height: calc(100vh - 200px);
    // }
    .pagination {
      padding: 10px 15px;
    }
  }
}
</style>
