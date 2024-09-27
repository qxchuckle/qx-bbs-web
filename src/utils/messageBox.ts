import { ElMessageBox, messageType } from 'element-plus';

export const messageBox = {
  confirm: async (msg: string, title: string, type: messageType = 'warning') => {
    toggleHtmlScroll(false);
    return new Promise((resolve, reject) => {
      ElMessageBox.confirm(msg, title, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type,
      })
        .then(() => {
          return resolve(null);
        })
        .catch(() => {
          return reject(null);
        })
        .finally(() => {
          toggleHtmlScroll(true);
        });
    });
  },
};
