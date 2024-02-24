<template>
  <el-config-provider :locale="locale" :message="msgConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/es/locale/index.mjs';

const locale = zhCn;
const msgConfig = reactive({
  max: 3,
});
</script>

<style scoped></style>
