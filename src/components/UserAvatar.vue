<template>
  <div class="user-avatar" @click="toUserPage">
    <el-avatar :shape="shape" :size="size" :src="src" fit="cover">
      <slot></slot>
    </el-avatar>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps({
  // 用户id，用于获取用户头像
  userId: {
    type: String,
    required: true,
  },
  // 是否可以点击跳转至用户详情页
  addLink: {
    type: Boolean,
    default: true,
  },
  // 头像大小
  size: {
    type: Number,
    default: 40,
  },
  // 头像形状
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle',
  },
});
// 头像地址
const src = computed(() => {
  return `${apiPrefix}${apiList.user.getAvatar}/${props.userId}`;
});
// 前往用户详情页
const toUserPage = () => {
  props.addLink && router.push({ name: 'UserPage', params: { id: props.userId } });
};
</script>

<style scoped lang="scss">
.user-avatar {
  line-height: 1;
}
</style>
