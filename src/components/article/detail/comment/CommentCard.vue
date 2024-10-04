<template>
  <div class="comment-card">
    <UserAvatar :user-id="commentInfo.userId" :size="avatarSize"></UserAvatar>
    <div class="message-info" :class="commentInfo.pCommentId ? 'replay' : ''">
      <!-- 该评论信息 -->
      <div class="comment-info">
        <div class="username">
          <router-link
            :to="{
              name: 'UserPage',
              params: { id: commentInfo.userId },
            }"
            >{{ commentInfo.nickName }}</router-link
          >
          <span class="tag-author" v-if="commentInfo.userId === activeUserId">作者</span>
        </div>
        <!-- 回复信息 -->
        <div class="reply-info" v-if="commentInfo.pCommentId">
          <span v-if="commentInfo.replyUserId"
            >回复
            <router-link
              :to="{
                name: 'UserPage',
                params: { id: commentInfo.replyUserId },
              }"
              >@{{ commentInfo.replyNickName }} :</router-link
            >
          </span>
          <span v-else>:</span>
        </div>
        <!-- 评论内容 -->
        <div class="content">
          <span class="tag-topping" v-if="props.commentInfo.topType">置顶</span>
          <span class="no-audit" v-if="!props.commentInfo.status">待审核</span>
          <span v-html="commentInfo.content"></span>
        </div>
        <!-- 评论图片 -->
        <div class="comment-img" v-if="commentInfo.imgPath">
          <CommentImage
            :src="`${apiPrefix}/api/file/getImage/${commentInfo.imgPath}`"
          ></CommentImage>
        </div>
        <!-- 一些元信息 -->
        <div class="meta-info">
          <div class="time">{{ commentInfo.postTime }}</div>
          <el-divider direction="vertical" />
          <div class="address">{{ commentInfo.userIpAddress }}</div>
          <el-divider direction="vertical" />
          <div class="like" :class="commentInfo.likeType ? 'active' : ''" @click="handleLike">
            <i class="iconfont icon-good"></i>
            <span>{{ commentInfo.goodCount || '点赞' }}</span>
          </div>
          <el-divider direction="vertical" />
          <div class="reply" @click="handleShowReply(props.commentInfo)">
            <i class="iconfont icon-comment"></i>
            <span>回复 {{ commentInfo.children?.length || 0 }}</span>
          </div>
          <!-- 文章作者管理评论区 -->
          <el-dropdown v-if="activeUserId === userStore.userId">
            <i class="iconfont icon-more"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleTop" v-if="!commentInfo.pCommentId">{{
                  commentInfo.topType ? '取消置顶' : '置顶评论'
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- 子评论 -->
        <div class="child-comment" v-if="commentInfo.children?.length">
          <CommentCard
            v-for="data in commentInfo.children"
            :commentInfo="data"
            :key="data.commentId"
            @show-reply="handleShowReply"
            :showReply="false"
            :avatarSize="30"
          ></CommentCard>
        </div>
        <!-- 回复框 -->
        <div class="reply-form" v-if="showReply">
          <CommentForm
            :user-id="userStore.userId"
            :show-insert-img="false"
            :pCommentId="commentInfo.commentId"
            :reply-user-id="curCommentInfo.userId"
            :placeholder="'回复：@' + curCommentInfo.nickName"
            :avatar-size="30"
            @post-comment="handlePostComment"
          ></CommentForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommentType } from '@/type';
import { apiPrefix } from '@/config';
const userStore = useUserStore();
const refreshComments = inject<(showLoading: boolean) => void>('refreshComments')!;
const props = withDefaults(
  defineProps<{
    commentInfo: CommentType;
    showReply?: boolean;
    avatarSize?: number;
  }>(),
  {
    showReply: false,
    avatarSize: 50,
  },
);
const emit = defineEmits<{
  (e: 'showReply', CommentType: CommentType | null): void;
}>();
const activeUserId = inject('activeUserId');
// 当前评论对象的信息
const curCommentInfo = ref<CommentType>(props.commentInfo);

// 显示回复框
const handleShowReply = (commentInfo: CommentType | null) => {
  // 如果评论的对象不同，则保留评论框，只更新评论对象
  if (curCommentInfo.value !== commentInfo) {
    curCommentInfo.value = commentInfo || props.commentInfo;
    emit('showReply', props.commentInfo);
    return;
  }
  // 如果已经显示回复框，则隐藏
  if (props.showReply) {
    // 不显示回复框
    emit('showReply', null);
  } else {
    // 显示回复框
    emit('showReply', props.commentInfo);
  }
};

// 评论后处理
const handlePostComment = () => {
  emit('showReply', null); // 隐藏回复框
};

// 点赞
const handleLike = async () => {
  try {
    await requestLikeComment(props.commentInfo.commentId);
    refreshComments(false);
  } catch {
    message.error('点赞失败');
  }
};

// 文章置顶
const handleTop = async () => {
  try {
    const newTopType = props.commentInfo.topType === 1 ? 0 : 1;
    await requestTopComment(props.commentInfo.commentId, newTopType);
    message.success(newTopType ? '置顶成功' : '取消置顶成功');
    refreshComments(false);
  } catch {
    message.error('操作失败');
  }
};
</script>

<style lang="scss">
.comment-card {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  line-height: 1;
  .message-info {
    flex: 1;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    .comment-info {
      .username {
        font-size: 1.166667rem;
        color: $FontGrayColor;
        .tag-author {
          color: #fff;
          padding: 0 3px;
          background-color: $Pink;
          margin-left: 2px;
          border-radius: 2px;
          font-size: 1rem;
        }
      }
      .reply-info {
        font-size: 1.166667rem;
        margin: 0 8px 0 5px;

        a {
          color: $AColor;
        }
      }
      .content {
        font-size: 1.333333rem;
        margin: 12px 0 8px;
        line-height: 1.2;
        .tag-topping,
        .no-audit {
          color: $Red;
          margin-right: 5px;
          padding: 0 3px;
          border-radius: 2px;
          font-size: 1rem;
          border: 1px solid $Red;
        }
      }
      .meta-info {
        display: flex;
        gap: 5px;
        color: $FontGrayColor;
        align-items: center;
        .time {
          font-size: 1.166667rem;
        }
        .address {
          font-size: 1.166667rem;
        }
        .like,
        .reply {
          display: flex;
          gap: 5px;
          font-size: 1.166667rem;
          cursor: pointer;
          i {
            font-size: 1.25rem;
          }
        }
        .like.active {
          color: $Blue;
        }
        .icon-more {
          color: $FontGrayColor;
          margin-left: 5px;
          padding: 0 5px;
        }
      }
      .child-comment {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .reply-form {
        margin-top: 20px;
      }
    }

    // 子评论样式
    &.replay {
      border-bottom: 0;
      padding-bottom: 0;
      .comment-info {
        .username {
          display: inline;
        }
        .reply-info {
          display: inline;
        }
        .content {
          display: inline;
          margin: 0;
          word-wrap: break-word;
          word-break: break-all;
          white-space: normal;
        }
        .meta-info {
          width: 100%;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
