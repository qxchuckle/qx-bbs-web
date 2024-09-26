import { defineStore } from 'pinia';
import { MenuListType } from '@/type';

// 创建并暴露一个store
export const useMenuStore = defineStore('menuStore', {
  // 类似data，存储状态
  // 在 Pinia 中，状态被定义为返回初始状态的函数
  state: (): {
    // 存储板块菜单信息
    menuList: MenuListType[];
  } => {
    return {
      menuList: [],
    };
  },
  // 对状态的操作
  actions: {
    async loadMenuList() {
      const result = await request({
        url: apiList.menu.getMenuList,
      });
      if (!result) return;
      this.menuList = result.data || [];
    },
  },
  // 相当于计算属性，传入一个store的state作为参数
  getters: {},
});
