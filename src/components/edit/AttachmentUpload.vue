<template>
  <div class="attachment-upload">
    <div class="file-show" v-if="fileName || attachmentName">
      <div class="file-name" :title="fileName || attachmentName">
        {{ fileName || attachmentName }}
      </div>
      <div class="iconfont icon-del" @click="handleRemove"></div>
    </div>
    <FileUpload
      v-else
      :accept="UploadAcceptEnum.all"
      :type="ReadFileTypeEnum.arrayBuffer"
      @upload="handleUpload"
    >
      <el-button type="primary">上传附件</el-button>
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import { ReadFileTypeEnum, UploadAcceptEnum, ReadFileTypeMap } from '@/type';
type DataType = ReadFileTypeMap[ReadFileTypeEnum.arrayBuffer];

const props = defineProps<{
  modelValue: File | null;
}>();
const emit = defineEmits(['update:modelValue']);
const attachmentName = inject<Ref<string>>('attachmentName')!;

const fileName = ref('');

const handleUpload = (data: ArrayBuffer | string, file: File) => {
  fileName.value = file.name;
  attachmentName.value = file.name;
  emit('update:modelValue', file);
};

const handleRemove = () => {
  fileName.value = '';
  attachmentName.value = '';
  emit('update:modelValue', null);
};
</script>

<style scoped lang="scss">
.attachment-upload {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  .file-show {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $Blue;
    line-height: 1;
    flex: 1;
    .file-name {
      flex: 1;
    }
    i.iconfont {
      cursor: pointer;
    }
  }
}
</style>
