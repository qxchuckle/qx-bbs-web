<template>
  <div class="form-header">
    <div class="title">设置</div>
  </div>
  <div class="form-container">
    <el-form :model="formData" :rules="formRules" ref="formRef">
      <!-- 标题 -->
      <el-form-item prop="title" label="标题" label-width="55px">
        <el-input v-model="formData.title" placeholder="请输入标题" clearable size="large">
        </el-input>
      </el-form-item>
      <!-- 板块选择 -->
      <el-form-item prop="boardId" label="板块" label-width="55px">
        <el-cascader
          :options="boardList"
          :props="boardProps"
          v-model="formData.boardId"
          placeholder="请选择板块"
          clearable
          :style="{ width: '100%' }"
        >
        </el-cascader>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item prop="cover" label="封面" label-width="55px">
        <CoverUpload v-model="formData.cover"></CoverUpload>
      </el-form-item>
      <!-- 摘要 -->
      <el-form-item prop="abstract" label="摘要" label-width="55px">
        <el-input
          v-model="formData.abstract"
          placeholder="请输入摘要"
          clearable
          size="large"
          show-word-limit
          :rows="5"
          :maxlength="150"
          type="textarea"
          resize="none"
        >
        </el-input>
      </el-form-item>
      <!-- 附件 -->
      <el-form-item prop="attachment" label="附件" label-width="55px">
        <AttachmentUpload v-model="formData.attachment"></AttachmentUpload>
      </el-form-item>
      <!-- 积分 -->
      <el-form-item
        prop="integral"
        label="积分"
        label-width="55px"
        v-if="formData.attachment || attachmentName"
      >
        <el-input-number v-model="formData.integral" :min="0"></el-input-number>
      </el-form-item>
      <!-- 保存 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm" class="sub-btn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ArticleFormDataType, MenuListType } from '@/type';
import type { ElForm, CascaderOption, CascaderProps } from 'element-plus';
const menuStore = useMenuStore();
const attachmentName = inject<Ref<string>>('attachmentName')!;

// 双向绑定表单数据
const props = withDefaults(
  defineProps<{
    modelValue?: ArticleFormDataType;
  }>(),
  {
    modelValue: () => ({
      title: '',
      boardId: [],
      cover: null,
      abstract: '',
      attachment: null,
      integral: 0,
    }),
  },
);

const emit = defineEmits<{
  (e: 'submit', data: ArticleFormDataType): void;
  (e: 'update:modelValue', data: ArticleFormDataType): void;
}>();

const formData = computed({
  get: () => {
    return new Proxy(props.modelValue, {
      get(target, key) {
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        Reflect.set(target, key, value);
        emit('update:modelValue', { ...target });
        return true;
      },
    });
  },
  set: (val) => {
    emit('update:modelValue', val);
  },
});
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const formRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { max: 50, message: '标题长度不能超过50个字符', trigger: 'blur' },
  ],
  boardId: [{ required: true, message: '请选择板块', trigger: 'change' }],
  integral: [{ required: true, message: '请输入积分', trigger: 'change' }],
};

// 格式转换
function transformMenu(menuList: MenuListType[]): CascaderOption[] {
  return menuList.map((item: MenuListType) => {
    const transformedItem = {
      value: item.boardId,
      label: item.boardName,
      children: item.children ? transformMenu(item.children) : [],
    };
    return transformedItem;
  });
}
// 板块选项列表
const boardList = computed(() => transformMenu(menuStore.menuList));
const boardProps: CascaderProps = {
  checkStrictly: true,
};

// 提交表单
const submitForm = async () => {
  try {
    await formValidate(formRef.value);
    emit('submit', { ...formData.value });
  } catch (error) {
    return;
  }
};
</script>

<style scoped lang="scss">
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  font-size: 1.333333rem;
  background-color: $White;
  border-bottom: 1px solid $Gray;
  .title {
    font-weight: bold;
  }
}
.form-container {
  padding: 10px;
  overflow-y: auto;
  max-height: calc(100% - 30px);
  background-color: $White;
  border-bottom: 1px solid $Gray;
  .sub-btn {
    margin: 15px auto 5px;
    width: calc(100% - 50px);
  }
}
</style>
