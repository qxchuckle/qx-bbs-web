import '@/assets/css/main.scss';
import '@/assets/icon/iconfont.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueCookies from 'vue-cookies';
import App from '@/App.vue';
import router from '@/router';
import CustomDialog from '@/components/CustomDialog.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueCookies);

// 全局注册组件
app.component('GDialog', CustomDialog);

app.mount('#app');
