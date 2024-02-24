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
export interface DialogButton {
  text: string;
  type?: ButtonType;
  click?: () => void;
}
export enum AuthFormType {
  login = 'login',
  register = 'register',
  forget = 'forget',
}
export interface AuthFormData {
  account: string;
  username?: string;
  password: string;
  rePassword?: string;
  checkCode?: string;
  emailCode?: string;
  remember?: boolean;
}
export enum CheckCodeType {
  auth = 0, // 注册登陆验证码
  email = 1, // 发送邮箱验证码的验证码
}
export enum EMailCodeType {
  register = 0, // 注册邮件验证码
  forget = 1, // 重置密码邮件验证码
}
