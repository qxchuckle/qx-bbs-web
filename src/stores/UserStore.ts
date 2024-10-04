import { defineStore } from 'pinia';

// 创建并暴露一个store
export const useUserStore = defineStore('userStore', {
  // 类似data，存储状态
  // 在 Pinia 中，状态被定义为返回初始状态的函数
  state: (): {
    // 用户账号
    account: string;
    // 用户名
    username: string;
    // 用户密码
    password: string;
    // 是否记住密码
    remember: boolean;
    // 用户id
    userId: string;
    // 是否是管理员
    isAdmin: boolean;
    // 用户所在省份
    province: string;
    // 是否登录
    isLogin: boolean;
  } => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
    if (new Date().getTime() - parseInt(userInfo.lastLogin) > 1000 * 60 * 60 * 24 * 7) {
      userInfo = {
        ...userInfo,
        userId: '',
        password: '',
      };
      localStorage.setItem('userInfo', userInfo);
    }
    return {
      account: userInfo.account || '',
      username: userInfo.username || '',
      password: userInfo.password || '',
      remember: userInfo.remember || false,
      userId: userInfo.userId || '',
      isAdmin: false,
      province: '未知',
      // isLogin: userInfo.userId ? true : false,
      isLogin: false,
    };
  },
  // 对状态的操作
  actions: {},
  // 相当于计算属性，传入一个store的state作为参数
  getters: {},
});
