import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// 创建并暴露一个store
export const useCounterStore = defineStore('counter', {
  // 类似data，存储状态
  // 在 Pinia 中，状态被定义为返回初始状态的函数
  state: () => ({
    count: 0,
  }),
  // 对状态的操作
  actions: {
    increment() {
      this.count++;
    },
  },
  // 相当于计算属性，传入一个store的state作为参数
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
