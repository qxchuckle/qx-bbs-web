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
