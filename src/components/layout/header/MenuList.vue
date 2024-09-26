<template>
  <div class="menu-list">
    <div
      v-for="(item, index) in menuList"
      :key="index"
      class="menu-item"
      :class="{
        active:
          item.boardId === parseInt($route.params.pid as string) ||
          item.boardId === parseInt($route.params.cid as string),
      }"
      @click.stop="toBoard(item.pBoardId, item.boardId)"
    >
      <div class="menu-item-name">
        <span>{{ item.boardName }}</span>
      </div>
      <!-- 组件递归，渲染多级菜单 -->
      <MenuList v-if="item.children.length" :menu-list="item.children" class="child"></MenuList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuListType } from '@/type';
const router = useRouter();
const props = defineProps<{
  menuList: MenuListType[];
}>();
const toBoard = (pid: number, cid: number) => {
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
.menu-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 5px;
  transition: all 0.3s;
  &:not(.child) {
    gap: 10px;
    font-size: 16px;
    & > .menu-item {
      color: $FontColor;
      // .menu-item-name {
      //   span {
      //     font-weight: bolder;
      //   }
      // }
      background-color: transparent;
    }
  }
  & > .menu-item {
    padding: 3px 10px;
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    transition: all 0.3s;
    width: max-content;
    &.active {
      color: $White;
      background-color: $Green;
    }
    & > .menu-list.child {
      position: absolute;
      top: 110%;
      display: flex;
      visibility: hidden;
      flex-direction: row;
      flex-wrap: nowrap;
      opacity: 0;
      transform: translateY(-10px) scale(0.8);
      background-color: $White;
      padding: 5px;
      border-radius: 100px;
      box-shadow:
        rgb(14 18 22 / 35%) 0px 10px 38px -10px,
        rgb(14 18 22 / 20%) 0px 10px 20px -15px;
      &::before {
        content: '';
        position: absolute;
        top: -15px;
        left: 0;
        width: 100%;
        height: 25px;
      }
      // .menu-item-name {
      //   span {
      //     font-weight: normal;
      //   }
      // }
    }
    &:hover {
      color: $White;
      background-color: $Blue;
      & > .menu-list.child {
        color: $FontColor;
        transform: translateY(0) scale(1);
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
