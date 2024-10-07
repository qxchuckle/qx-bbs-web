<template>
  <FileUpload
    :accept="UploadAcceptEnum.image"
    :type="ReadFileTypeEnum.dataURL"
    @upload="handleUpload"
    :name="name"
    :multiple="multiple"
  >
    <slot><i class="iconfont icon-image"></i></slot>
  </FileUpload>
</template>

<script setup lang="ts">
import { ReadFileTypeEnum, UploadAcceptEnum, ReadFileTypeMap } from '@/type';

const props = withDefaults(
  defineProps<{
    multiple?: boolean; // 是否支持多选
    name?: string; // 上传的文件字段名
  }>(),
  {
    multiple: false,
    name: 'file',
  },
);

type DataType = ReadFileTypeMap[ReadFileTypeEnum.dataURL];

const emit = defineEmits<{
  (e: 'upload', data: DataType, file: File): void;
}>();

const handleUpload = (data: ArrayBuffer | string, file: File) => {
  emit('upload', data as DataType, file);
};
</script>

<style lang="scss"></style>
