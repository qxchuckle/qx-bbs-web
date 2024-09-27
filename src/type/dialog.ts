// 普通按钮类型
export enum ButtonType {
  none = '',
  default = 'default',
  success = 'success',
  warning = 'warning',
  info = 'info',
  text = 'text',
  primary = 'primary',
  danger = 'danger',
}
// 弹窗按钮数据类型
export interface DialogButton {
  text: string;
  type?: ButtonType;
  click?: () => void;
}
