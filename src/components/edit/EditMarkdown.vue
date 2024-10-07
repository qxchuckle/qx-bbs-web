<template>
  <div class="edit-markdown">
    <v-md-editor
      v-model="markdown"
      height="100%"
      :disabled-menus="[]"
      :include-level="[1, 2, 3, 4, 5, 6]"
      @upload-image="handleUploadImage"
      @change="handleChange"
    ></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'htmlContent', html: string): void;
}>();
const markdown = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value);
  },
});

// 上传图片
const handleUploadImage = async (event: any, insertImage: any, files: File[]) => {
  try {
    const file = files[0];
    const { fileName } = await requestImageUpload(file);
    if (fileName) {
      insertImage({
        url: apiList.image.getImage + fileName.replace(/^\//g, ''),
        desc: file.name,
      });
    }
  } catch (error) {
    message.error('上传图片失败');
  }
};

// markdown内容变化
const handleChange = (markdown: string, html: string) => {
  emit('htmlContent', html);
};
</script>

<style scoped lang="scss">
.edit-markdown {
  height: 100%;
  .v-md-editor {
    box-shadow: none;
  }
}
</style>
