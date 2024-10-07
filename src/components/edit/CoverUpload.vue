<template>
  <div class="cover-upload">
    <ImageUpload @upload="handleUpload">
      <div class="view-image" v-if="imgSrc || coverUrl">
        <img :src="imgSrc || coverUrl" alt="封面" />
        <i class="iconfont icon-remove" @click.stop="handleRemove"></i>
      </div>
      <div class="cover-upload-btn" v-else>
        <i class="iconfont icon-add"></i>
      </div>
    </ImageUpload>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: File | null;
}>();
const imgSrc = ref('');
const emit = defineEmits(['update:modelValue']);
const coverUrl = inject<Ref<string>>('coverUrl')!;

const handleUpload = (data: string, file: File) => {
  imgSrc.value = data;
  coverUrl.value = data;
  emit('update:modelValue', file);
};
const handleRemove = () => {
  imgSrc.value = '';
  coverUrl.value = '';
  emit('update:modelValue', null);
};
</script>

<style lang="scss">
.cover-upload {
  $width: 150px;
  $height: 150px;
  height: $height;
  .cover-upload-btn {
    width: $width;
    height: $height;
    background: url(@/assets/img/upload-bg.png) repeat center center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    i.iconfont {
      font-size: 48px;
      color: #999;
    }
  }
  .view-image {
    position: relative;
    max-width: 100%;
    height: $height;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    i.icon-remove {
      cursor: pointer;
      position: absolute;
      right: -9px;
      top: -9px;
      color: $Red;
      font-size: 20px;
    }
  }
}
</style>
