<template>
  <!-- 分类板块的二级导航菜单 -->
  <div class="secondary-menu" v-if="$route.name !== 'ArticlePage'">
    <div
      class="secondary-menu-item"
      :class="{
        active: !parseInt($route.params.cid as string),
      }"
      @click="toBoard(0, parseInt($route.params.pid as string))"
    >
      全部
    </div>
    <div
      class="secondary-menu-item"
      v-for="(item, index) in secondaryMenuList"
      :key="index"
      @click="toBoard(item.pBoardId, item.boardId)"
      :class="{
        active:
          item.boardId === parseInt($route.params.pid as string) ||
          item.boardId === parseInt($route.params.cid as string),
      }"
    >
      {{ item.boardName }}
    </div>
  </div>
</template>

<script setup lang="ts">
const menuStore = useMenuStore();
const route = useRoute();
const secondaryMenuList = computed(() => {
  let list;
  if (route.params.pid && route.params.cid) {
    list = menuStore.menuList.find((item) => item.boardId === parseInt(route.params.pid as string));
  } else {
    list = menuStore.menuList.find((item) => item.boardId === parseInt(route.params.pid as string));
  }
  return list?.children || [];
});
const toBoard = (pid: number, cid?: number) => {
  if (pid && cid) {
    router.push({
      name: 'SecondLevelBoard',
      params: {
        cid,
        pid,
      },
    });
  } else {
    router.push({
      name: 'FirstLevelBoard',
      params: {
        pid: cid,
      },
    });
  }
};
</script>

<style scoped lang="scss">
.secondary-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.166667rem;
  margin-bottom: 10px;
  margin-left: 5px;
  .secondary-menu-item {
    padding: 2px 8px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s;
    background-color: $White;
    animation: progressive 0.3s;
    &:hover {
      color: $White;
      background-color: $Blue;
    }
    &.active {
      color: $White;
      background-color: $Green;
    }
  }
}
</style>
