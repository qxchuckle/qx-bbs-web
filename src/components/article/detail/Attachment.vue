<template>
  <div class="attachment">
    <div class="title">附件</div>
    <div class="attachment-info">
      <div class="file-box">
        <i class="iconfont icon-zip"></i>
        <span class="file-name">{{ attachment.fileName }}</span>
      </div>
      <div class="file-size">{{ fileSize }}</div>
      <div class="file-price">
        需要<span>{{ attachment.integral }}</span
        >积分
      </div>
      <div class="file-download-count">
        已下载<span>{{ attachment.downloadCount }}</span
        >次
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" size="large" @click="handleDownloadAttachment">下载</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AttachmentType } from '@/type';
const props = defineProps<{
  attachment: AttachmentType;
}>();
const emit = defineEmits<{
  (e: 'downloadAttachment', fileId: string): void;
}>();
const fileSize = computeFileSize(props.attachment.fileSize);

// 下载附件
function handleDownloadAttachment() {
  requestDownloadAttachment(props.attachment.fileId, props.attachment.integral).then(() => {
    emit('downloadAttachment', props.attachment.fileId);
  });
}
</script>

<style lang="scss">
.attachment {
  position: relative;
  .title {
    font-size: 1.666667rem;
    margin-bottom: 10px;
  }
  .attachment-info {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 1.333333rem;
    color: $FontGrayColor;
    line-height: 1;

    .file-box {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      color: $Blue;
    }

    .file-price {
      span {
        margin: 0 5px;
        color: $Red;
      }
    }
    .file-download-count {
      span {
        margin: 0 5px;
        color: $Green;
      }
    }
  }
  .btn {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    .el-button {
      font-size: 1.333333rem;
    }
  }
}
</style>
