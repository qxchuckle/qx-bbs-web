<template>
  <div v-for="item in commentList" :key="item.commentId">
    <CommentCard :commentInfo="item"></CommentCard>
  </div>
</template>

<script setup lang="ts">
import { CommentType } from '@/type';
const props = defineProps<{
  commentList: CommentType[];
}>();
</script>

<style lang="scss"></style>
