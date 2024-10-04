<template>
  <div class="comment-form-container">
    <UserAvatar :userId="userId" :size="avatarSize">
      <template #default>
        <span>未登录</span>
      </template>
    </UserAvatar>
    <!-- 评论表单 -->
    <div class="comment-form">
      <el-form :model="formData" :rules="rules" ref="formRef" class="form">
        <el-form-item prop="content" class="textarea">
          <el-input
            v-model="formData.content"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            :placeholder="placeholder"
            show-word-limit
            maxlength="999"
            resize="none"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="submitForm" class="submit-btn">评论</el-button>
        </el-form-item>
      </el-form>
      <!-- 上传图片 -->
      <div class="image-upload" v-if="showInsertImg">
        <div class="view-image" v-if="imageSrc">
          <CommentImage :src="imageSrc || ''"></CommentImage>
          <i class="iconfont icon-remove" @click="handleRemoveImage"></i>
        </div>
        <el-upload
          name="file"
          :show-file-list="false"
          :http-request="selectImage"
          accept=".png,.jpg,.webp"
          :multiple="false"
          v-else
        >
          <i class="iconfont icon-image"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm, UploadRequestHandler, UploadRawFile } from 'element-plus';
const refreshComments = inject<(showLoading: boolean) => void>('refreshComments')!;
const articleId = inject<string>('articleId')!;

const props = withDefaults(
  defineProps<{
    userId: string; // 当前用户ID
    showInsertImg?: boolean; // 是否显示插入图片按钮
    avatarSize?: number; // 头像大小
    placeholder?: string; // 输入框提示
    pCommentId?: number; // 父评论ID
    replyUserId?: string; // 回复用户ID
  }>(),
  {
    showInsertImg: true,
    avatarSize: 50,
    placeholder: '请输入评论内容',
    pCommentId: 0, // 默认为0，表示评论文章
  },
);
const emit = defineEmits<{
  (e: 'postComment'): void;
}>();
const formData = reactive<{
  content: string;
  imageFile: UploadRawFile | undefined;
}>({
  content: '',
  imageFile: undefined,
});
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const rules = {
  content: [{ required: true, min: 5, message: '', trigger: 'blur' }],
};
// 提交评论表单
const submitForm = async () => {
  try {
    // 表单验证
    await formValidate(formRef.value);
    // 提交评论
    await requestPostComment(
      articleId,
      formData.content,
      props.pCommentId,
      props.replyUserId,
      formData.imageFile,
    );
    formData.content = '';
    handleRemoveImage();
    message.success('评论成功');
    emit('postComment');
    refreshComments(false); // 刷新评论但不显示加载动画
  } catch (error) {
    if (error === false) {
      message.warning('评论失败');
      return;
    }
    message.warning('评论内容不能少于5个字符');
  }
};

// 选择图片
const imageSrc = ref<string | null>(null);
const selectImage: UploadRequestHandler = async (option) => {
  const file = option.file;
  let img = new FileReader();
  img.readAsDataURL(file);
  img.onload = (ev: ProgressEvent<FileReader>) => {
    const data = ev.target?.result as string;
    imageSrc.value = data;
    formData.imageFile = file;
  };
};

// 移除图片
const handleRemoveImage = () => {
  formData.imageFile = undefined;
  imageSrc.value = null;
};
</script>

<style lang="scss">
.comment-form-container {
  display: flex;
  gap: 15px;
  .comment-form {
    flex: 1;
    .form {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      .el-form-item {
        margin-bottom: 0;
      }
      .textarea {
        flex: 1;
      }
      .submit-btn {
        height: 72px;
      }
    }
    .image-upload {
      margin-top: 3px;
      i {
        font-size: 1.666667rem;
      }
    }
  }
}
.view-image {
  position: relative;
  width: fit-content;
  margin-top: 10px;
  i.icon-remove {
    position: absolute;
    right: -8px;
    top: -8px;
  }
}
</style>
