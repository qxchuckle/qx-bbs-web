<template>
  <div>{{ commentInfo.content }}</div>
</template>

<script setup lang="ts">
import { CommentType } from '@/type';
const props = defineProps<{
  commentInfo: CommentType;
}>();
</script>

<style lang="scss"></style>
