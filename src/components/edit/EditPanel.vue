<template>
  <div class="edit-panel">
    <div class="header">
      <div class="title">正文</div>
      <div class="switch-edit" @click="handleSwitchEdit">
        <i class="iconfont icon-change"></i>
        <span v-if="editType === EditTypeEnum.RichText">切换为markdown编辑器</span>
        <span v-else>切换为富文本编辑器</span>
      </div>
    </div>
    <div class="edit">
      <EditMarkdown
        v-model="editValue"
        @htmlContent="handleHtmlContent"
        v-if="editType === EditTypeEnum.Markdown"
      ></EditMarkdown>
      <EditRichText v-model="editValue" @htmlContent="handleHtmlContent" v-else></EditRichText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EditTypeEnum } from '@/type';

// 编辑器内容
const editValue = ref('');
// 编辑器内容转换后的html
const htmlContent = ref('');
const handleHtmlContent = (html: string) => {
  htmlContent.value = html;
};

// 切换编辑器
const editType = ref(EditTypeEnum.Markdown);
const handleSwitchEdit = () => {
  messageBox
    .confirm('切换编辑器后，当前编辑器内容将会清空，是否继续？', '提示', 'info')
    .then(() => {
      editValue.value = '';
      htmlContent.value = '';
      editType.value =
        editType.value === EditTypeEnum.Markdown ? EditTypeEnum.RichText : EditTypeEnum.Markdown;
    });
};

// 提供给父组件的数据
defineExpose({
  editValue,
  htmlContent,
  editType,
});
</script>

<style scoped lang="scss">
.edit-panel {
  height: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid $Gray;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    font-size: 1.333333rem;
    border-bottom: 1px solid $Gray;
    .title {
      font-weight: bold;
    }
    .switch-edit {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: $Blue;
      font-size: 1.166667rem;
      i.iconfont {
        margin-right: 5px;
        font-size: 1.166667rem;
      }
    }
  }
  .edit {
    height: calc(100% - 30px);
  }
}
</style>
