import { ElMessage } from 'element-plus';

const showMessage = (msg: string, type: string, duration: number, cbk?: Function) => {
  (ElMessage as any)[type]({
    message: msg,
    duration: duration,
    onClose: () => {
      cbk && cbk();
    },
  });
};

const message = {
  success: (msg: string, cbk?: Function) => {
    showMessage(msg, 'success', 2000, cbk);
  },
  error: (msg: string, cbk?: Function) => {
    showMessage(msg, 'error', 2000, cbk);
  },
  warning: (msg: string, cbk?: Function) => {
    showMessage(msg, 'warning', 2000, cbk);
  },
  info: (msg: string, cbk?: Function) => {
    showMessage(msg, 'info', 2000, cbk);
  },
  closeAll: () => {
    ElMessage.closeAll();
  },
  close: (messageInstance: any) => {
    messageInstance.close();
  },
};

export default message;
