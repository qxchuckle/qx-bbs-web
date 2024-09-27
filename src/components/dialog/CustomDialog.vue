<template>
  <teleport to="body">
    <el-dialog
      v-model:model-value="showDialog"
      :title="title"
      :show-close="showClose"
      :draggable="false"
      :close-on-click-modal="false"
      width="100%"
      class="dialog-panel"
      :style="{ 'max-width': maxWidth }"
    >
      <el-scrollbar max-height="calc(100vh - 160px)">
        <div class="dialog-body" :style="{ 'min-width': minWidth }">
          <slot></slot>
        </div>
      </el-scrollbar>
      <template v-if="showCancel || (buttons && buttons.length)">
        <div class="dialog-footer">
          <el-button v-if="showCancel" @click="close" size="default" type="default">取消</el-button>
          <el-button
            v-for="(button, index) in buttons"
            :key="index"
            size="default"
            :type="button.type || 'primary'"
            @click="button.click"
          >
            {{ button.text }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>

<script setup lang="ts">
import { DialogButton } from '@/type/index';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '标题',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  buttons: {
    type: Array<DialogButton>,
    default: () => [],
  },
  // 面板最大宽度
  maxWidth: {
    type: String,
    default: '500px',
  },
  // 内容最小宽度，超出滚动
  minWidth: {
    type: String,
    default: '300px',
  },
});
const emit = defineEmits(['update:visible']);

const showDialog = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emit('update:visible', val);
  },
});

// 在显示对话框时禁止页面滚动
watch(
  () => showDialog.value,
  (val) => {
    toggleHtmlScroll(!val);
  },
);

const close = () => {
  showDialog.value = false;
};
</script>

<style lang="scss">
.dialog-panel {
  margin: 0 auto;
}
.el-dialog {
  margin: 50px auto 0px;
  padding: 0;
  .el-dialog__header {
    padding: 15px 20px 10px;
    border-bottom: 1px solid #add;
    .el-dialog__headerbtn {
      top: 6px;
    }
  }
  .dialog-body {
    min-height: 100px;
    padding: 15px;
  }
  .dialog-footer {
    padding: 10px 20px;
    text-align: right;
    border-top: 1px solid #add;
  }
}
</style>
