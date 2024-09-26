<template>
  <div class="menu-panel">
    <span
      class="home"
      :class="{
        active: $route.name === 'ArticlePage',
      }"
      @click="toHome"
      >首页</span
    >
    <MenuList :menuList="menuStore.menuList"></MenuList>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const menuStore = useMenuStore();
onBeforeMount(async () => {
  await menuStore.loadMenuList();
});
const toHome = () => {
  router.push({ name: 'ArticlePage' });
};
</script>

<style scoped lang="scss">
.menu-panel {
  flex: 1;
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-left: 20px;
  .home {
    font-size: 16px;
    transition: all 0.3s;
    padding: 3px 10px;
    border-radius: 100px;
    cursor: pointer;
    z-index: 10;
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
