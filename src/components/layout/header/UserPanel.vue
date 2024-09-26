<template>
  <div>
    <div class="user-panel">
      <el-space wrap :size="8">
        <el-button type="primary">发帖<i class="iconfont icon-add"></i></el-button>
        <el-button type="primary">搜索<i class="iconfont icon-search"></i></el-button>
        <div class="user-info" v-if="userStore.isLogin">
          <el-dropdown>
            <div class="message">
              <el-badge :value="12" :max="99" class="badge">
                <i class="iconfont icon-message"></i>
              </el-badge>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>回复我的</el-dropdown-item>
                <el-dropdown-item>赞了我的</el-dropdown-item>
                <el-dropdown-item>下载了我的附件</el-dropdown-item>
                <el-dropdown-item>赞了评论</el-dropdown-item>
                <el-dropdown-item>系统消息</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown>
            <UserAvatar :userId="userStore.userId" :addLink="false">
              {{ userStore.username }}
            </UserAvatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>我的主页</el-dropdown-item>
                <el-dropdown-item>退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-button-group v-else>
          <el-button type="primary" plain @click="login">登录</el-button>
          <el-button type="primary" plain @click="register">注册</el-button>
        </el-button-group>
      </el-space>
    </div>
    <!-- 注册登录面板 -->
    <AuthDialog
      v-model:visible="authVisible"
      v-model:type="type"
      max-width="460px"
      min-width="300px"
    ></AuthDialog>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
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
.user-panel {
  width: fit-content;
  text-align: right;
  .iconfont {
    margin-left: 3px;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 10px;
    .message {
      color: #8a919f;
      transition: color 0.3s;
      margin-top: 2px;
      &:hover {
        color: #409eff;
      }
      .iconfont {
        font-size: 26px;
        margin-left: 0;
      }
    }
  }
}
</style>
