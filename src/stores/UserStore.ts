import { defineStore } from 'pinia';

// 创建并暴露一个store
export const useUserStore = defineStore('counter', {
  // 类似data，存储状态
  // 在 Pinia 中，状态被定义为返回初始状态的函数
  state: () => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
    if (new Date().getTime() - parseInt(userInfo.lastLogin) > 1000 * 60 * 60 * 24 * 7) {
      userInfo = {
        ...userInfo,
        password: '',
      };
      localStorage.setItem('userInfo', userInfo);
    }
    return {
      account: userInfo.account || '',
      username: userInfo.username || '',
      password: userInfo.password || '',
      remember: userInfo.remember || false,
    };
  },
  // 对状态的操作
  actions: {},
  // 相当于计算属性，传入一个store的state作为参数
  getters: {},
});
