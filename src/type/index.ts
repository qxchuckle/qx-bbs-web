export * from './article';
export * from './api';

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
// 登陆注册表单类型
export enum AuthFormType {
  login = 'login',
  register = 'register',
  forget = 'forget',
}
// 登陆注册表单数据类型
export interface AuthFormData {
  account: string;
  username?: string;
  password: string;
  rePassword?: string;
  checkCode?: string;
  emailCode?: string;
  remember?: boolean;
}
// 图形验证码类型
export enum CheckCodeType {
  auth = 0, // 注册登陆验证码
  email = 1, // 发送邮箱验证码的验证码
}
// 邮箱验证码类型
export enum EMailCodeType {
  register = 0, // 注册邮件验证码
  forget = 1, // 重置密码邮件验证码
}
// 菜单栏数据类型
export interface MenuListType {
  boardId: number;
  pBoardId: number;
  boardName: string;
  cover: any;
  boardDesc: string;
  sort: number;
  postType: number;
  children: MenuListType[]; // 子菜单
}
