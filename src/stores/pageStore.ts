import { defineStore } from 'pinia';

// 创建并暴露一个store
export const usePageStore = defineStore('pageStore', {
  state: (): {
    // 是否显示登陆框
    isShowLogin: boolean;
  } => {
    return {
      isShowLogin: false,
    };
  },
  // 对状态的操作
  actions: {
    // 显示登陆框
    showLogin() {
      this.isShowLogin = true;
    },
    // 隐藏登陆框s
    hideLogin() {
      this.isShowLogin = false;
    },
  },
  // 相当于计算属性，传入一个store的state作为参数
  getters: {},
});
