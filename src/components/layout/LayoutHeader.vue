<template>
  <div class="header" ref="header">
    <div class="header-content">
      <!-- logo -->
      <router-link to="/" class="logo">
        <span v-for="(item, index) in logoText" :key="index">{{ item }}</span>
      </router-link>
      <!-- 板块菜单栏 -->
      <MenuPanel></MenuPanel>
      <!-- 用户栏 -->
      <UserPanel></UserPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
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
      header.value?.style.setProperty('opacity', '0');
    } else {
      // 向上滚动，显示header
      header.value?.style.setProperty('top', '0');
      header.value?.style.setProperty('opacity', '1');
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
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  box-shadow: 0 2px 6px 0 #ddd;
  position: fixed;
  z-index: 1000;
  transition: all 0.3s;
  top: 0;
  background: #fff;
  .header-content {
    height: 50px;
    // width: $LayoutWidth;
    max-width: $LayoutWidth;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .logo {
      display: block;
      margin-right: 5px;
      span {
        font-size: 30px;
        line-height: 1;
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
  }
}
</style>
