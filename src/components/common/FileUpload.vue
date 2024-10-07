<template>
  <el-upload
    :name="name"
    :show-file-list="false"
    :http-request="selectFile"
    :accept="accept"
    :multiple="multiple"
  >
    <slot></slot>
  </el-upload>
</template>

<script setup lang="ts">
import { ReadFileTypeEnum, UploadAcceptEnum, ReadFileTypeMap } from '@/type';
import type { UploadRequestHandler } from 'element-plus';

const props = withDefaults(
  defineProps<{
    accept?: UploadAcceptEnum; // 上传文件类型
    multiple?: boolean; // 是否支持多选
    name?: string; // 上传的文件字段名
    type?: ReadFileTypeEnum;
  }>(),
  {
    accept: UploadAcceptEnum.all,
    multiple: false,
    name: 'file',
    type: ReadFileTypeEnum.arrayBuffer,
  },
);

const emit = defineEmits<{
  (e: 'upload', data: ReadFileTypeMap[typeof props.type], file: File): void;
}>();

const selectFile: UploadRequestHandler = async (option) => {
  try {
    const file = option.file;
    const fileReader = new FileReader();
    fileReader[props.type](file);
    fileReader.onload = (ev: ProgressEvent<FileReader>) => {
      const result = ev.target?.result;
      if (result) {
        emit('upload', result, file);
      }
    };
  } catch (error) {
    return;
  }
};
</script>

<style lang="scss"></style>
