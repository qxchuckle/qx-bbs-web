<template>
  <div class="edit-html">
    <Toolbar
      style="border-bottom: 1px solid #ddd"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      class="edit-noumenon"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'; // 引入编辑器组件
import { IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
type InsertFnType = (url: string, alt: string, href: string) => void;
const mode = 'default'; // 编辑器模式

const editorRef = shallowRef(); // 编辑器实例
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['uploadVideo', 'insertVideo', 'group-video'],
};
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: apiList.image.upload,
      fieldName: 'file',
      compress: true,
      withCredentials: true,
      customInsert(res: any, insertFn: InsertFnType) {
        if (res.code !== 200) {
          message.error('上传图片失败');
          return;
        }
        const data = res.data;
        const url = apiList.image.getImage + data.fileName.replace(/^\//g, '');
        insertFn(url, '', '');
      },
    },
  },
};

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'htmlContent', html: string): void;
}>();
const valueHtml = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value);
  },
});

// 记录编辑器实例
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 内容变化
const handleChange = () => {
  emit('htmlContent', editorRef.value?.getHtml() || '');
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  editorRef.value?.destroy();
});
</script>

<style scoped lang="scss">
.edit-html {
  z-index: 1001;
  height: 100%;
  .edit-noumenon {
    height: calc(100% - 80px) !important;
    overflow-y: hidden;
  }
  @media screen and (max-width: 1090px) {
    .edit-noumenon {
      height: calc(100% - 120px) !important;
    }
  }
}
</style>
