<template>
  <div>
    <!-- 导航栏 -->
    <LayoutHeader></LayoutHeader>
    <!-- 页面主要部分 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  padding: 50px 0 0;
}
</style>
