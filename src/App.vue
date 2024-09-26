<template>
  <!-- el配置 -->
  <el-config-provider :locale="locale" :message="msgConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
// 语言包
import { zhCn } from 'element-plus/es/locale/index.mjs';
// 语言配置
const locale = zhCn;
// 消息提示配置
const msgConfig = reactive({
  max: 3, // 最多存在3个提示
});
</script>

<style scoped></style>
