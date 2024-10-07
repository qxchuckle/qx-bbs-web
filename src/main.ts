import '@/assets/css/main.scss';
import '@/assets/icon/iconfont.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueCookies from 'vue-cookies';
import App from '@/App.vue';
import router from '@/router';
import VMdEditor from '@kangc/v-md-editor';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueCookies);
app.use(VMdEditor);

app.mount('#app');
