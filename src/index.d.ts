interface DialogButton {
  text: string;
  type?: '' | 'default' | 'success' | 'warning' | 'info' | 'text' | 'primary' | 'danger';
  click?: () => void;
}
