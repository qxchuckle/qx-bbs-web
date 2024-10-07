import {
  GetArticleDetailType,
  GoodArticleType,
  DownloadAttachmentInfoType,
  GetArticleUpdateType,
} from '@/type';

// 获取文章详情
export const requestArticleDetail = async (id: string) => {
  const result = await request<GetArticleDetailType>({
    url: apiList.article.getArticleDetail,
    params: {
      articleId: id,
    },
  });
  if (!result) return Promise.reject(false);
  return result.data;
};

// 文章点赞
export const requestLikeArticle = async (id: string) => {
  const result = await request<GoodArticleType>({
    url: apiList.article.doLike,
    params: {
      articleId: id,
    },
    needLogin: true,
    showLoading: false,
  });
  if (!result) return Promise.reject(false);
  return result.data;
};

// 获取附件下载信息
export async function requestDownloadAttachmentInfo(fileId: string) {
  const result = await request<DownloadAttachmentInfoType>({
    url: apiList.article.downloadAttachmentInfo,
    params: {
      fileId,
    },
    needLogin: true,
  });
  if (!result) return Promise.reject(false);
  return result.data;
}

// 下载附件
export async function requestDownloadAttachment(
  fileId: string,
  filePrice: number,
): Promise<boolean> {
  // 获取下载附件信息，用户积分、是否下载过
  const downloadAttachmentInfo = await requestDownloadAttachmentInfo(fileId);
  if (!downloadAttachmentInfo) return Promise.reject(false);
  if (
    filePrice > 0 &&
    !downloadAttachmentInfo.haveDownload &&
    downloadAttachmentInfo.userIntegral < filePrice
  ) {
    message.warning(`仅剩 ${downloadAttachmentInfo.userIntegral} 积分，积分不足，无法下载！`);
    return Promise.reject(false);
  }
  try {
    let msg;
    if (downloadAttachmentInfo.haveDownload) {
      msg = `您已下载过该附件，本次不消耗积分，是否再次下载？`;
    } else {
      msg = `当前剩余 ${downloadAttachmentInfo.userIntegral} 积分，下载将扣除 ${filePrice} 积分！`;
    }
    // 下载附件
    await messageBox.confirm(msg, '下载提示');
    const url = `${apiList.article.downloadAttachment}?fileId=${fileId}`;
    window.open(url, '_blank');
    message.success('下载成功');
    return true;
  } catch (error) {
    return Promise.reject(false);
  }
}

// 获取文章更新信息
export const requestArticleUpdateDetail = async (id: string) => {
  const result = await request<GetArticleUpdateType>({
    url: apiList.article.getArticleUpdate,
    params: {
      articleId: id,
    },
  });
  if (!result) return Promise.reject(false);
  return result.data;
};
