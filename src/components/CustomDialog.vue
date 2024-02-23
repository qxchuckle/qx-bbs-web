<template>
  <div class="dialog">
    <el-dialog
      v-model:model-value="showDialog"
      title="Tips"
      :show-close="showClose"
      :draggable="false"
      :close-on-click-modal="false"
      width="fit-content"
    >
      <el-scrollbar max-height="calc(100vh - 160px)">
        <div class="dialog-body">
          <slot></slot>
        </div>
      </el-scrollbar>
      <template v-if="showCancel || (buttons && buttons.length)">
        <div class="dialog-footer">
          <el-button v-if="showCancel" @click="close" size="small" type="default">取消</el-button>
          <el-button
            v-for="(button, index) in buttons"
            :key="index"
            size="small"
            :type="button.type || 'primary'"
            @click="button.click"
          >
            {{ button.text }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
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
});
const emit = defineEmits(['update:visible']);

const showDialog = computed({
  get: () => props.visible,
  set: (val: boolean) => {
    emit('update:visible', val);
  },
});
const close = () => {
  showDialog.value = false;
};
</script>

<style lang="scss">
.dialog {
  .el-dialog {
    margin: 50px auto 0px;
    padding: 0;
    .el-dialog__header {
      padding: 10px 20px;
      border-bottom: 1px solid #add;
    }
    .dialog-body {
      min-width: 300px;
      min-height: 100px;
      padding: 5px 10px;
    }
    .dialog-footer {
      padding: 10px 20px;
      text-align: right;
      border-top: 1px solid #add;
    }
  }
}
</style>
