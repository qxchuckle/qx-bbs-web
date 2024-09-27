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
