<template>
  <div>
    <div class="header" ref="header">
      <div class="header-content">
        <!-- logo -->
        <router-link to="/" class="logo">
          <span v-for="(item, index) in logoText" :key="index">{{ item }}</span>
        </router-link>
        <!-- 板块菜单栏 -->
        <div class="menu-panel"></div>
        <!-- 用户栏 -->
        <div class="user-panel">
          <el-space wrap :size="8">
            <el-button type="primary">发帖<i class="iconfont icon-add"></i></el-button>
            <el-button type="primary">搜索<i class="iconfont icon-search"></i></el-button>
            <el-button-group>
              <el-button type="primary" plain @click="login">登录</el-button>
              <el-button type="primary" plain @click="register">注册</el-button>
            </el-button-group>
          </el-space>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 注册登录 -->
    <AuthDialog
      v-model:visible="authVisible"
      v-model:type="type"
      max-width="460px"
      min-width="300px"
    ></AuthDialog>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const logoText = 'QXBBS'.split('');
const header = ref<HTMLDivElement | null>(null);

// 获取页面滚动高度
function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;
}

// 创建监听滚动回调
function createHandleScroll() {
  if (!header.value) return null;
  let lastScrollTop = 0;
  const handleScroll = () => {
    const scrollTop = getScrollTop();
    if (scrollTop > lastScrollTop && scrollTop > 60) {
      // 向下滚动，隐藏header
      header.value?.style.setProperty('top', '-60px');
    } else {
      // 向上滚动，显示header
      header.value?.style.setProperty('top', '0');
    }
    lastScrollTop = scrollTop;
  };
  return handleScroll;
}
let handleScroll: (() => void) | null = null;

onMounted(() => {
  handleScroll = createHandleScroll();
  handleScroll && window.addEventListener('scroll', createThrottle(handleScroll, 100));
});
onUnmounted(() => {
  handleScroll && window.removeEventListener('scroll', handleScroll);
});

const authVisible = ref(false);
const type = ref(AuthFormType.login);
const login = () => {
  type.value = AuthFormType.login;
  authVisible.value = true;
};
const register = () => {
  type.value = AuthFormType.register;
  authVisible.value = true;
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  box-shadow: 0 2px 6px 0 #ddd;
  position: fixed;
  z-index: 1000;
  transition: all 0.3s;
  top: 0;
  .header-content {
    height: 60px;
    // width: $LayoutWidth;
    max-width: $LayoutWidth;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .logo {
      display: block;
      margin-right: 5px;
      span {
        font-size: 30px;
        // 每个文字颜色不同
        @for $i from 1 through 5 {
          &:nth-child(#{$i}) {
            // 从颜色列表中取出颜色
            color: nth(
              rgb(50, 133, 255)
                rgb(251, 54, 36)
                rgb(255, 186, 2)
                rgb(50, 133, 255)
                rgb(37, 178, 78),
              $i
            );
          }
        }
      }
    }
    .menu-panel {
      flex: 1;
    }
    .user-panel {
      width: fit-content;
      text-align: right;
      .iconfont {
        margin-left: 3px;
      }
    }
  }
}
.main {
  height: 1500px;
}
</style>
