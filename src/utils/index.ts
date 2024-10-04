export * from './message';
export * from './request';
export * from './compute';
export * from './messageBox';
import { ElForm } from 'element-plus';

// 防抖
export const createDebounce = (fn: Function, delay: number) => {
  let _timer: number | null;
  let _this: any;
  return function (this: any, ...args: any[]) {
    if (_timer) clearTimeout(_timer);
    _this = this;
    _timer = setTimeout(() => {
      _timer = null;
      fn.apply(_this, args);
    }, delay);
  };
};

// 节流
export const createThrottle = (fn: Function, delay: number) => {
  let _timer: number | null;
  return function (this: any, ...args: any[]) {
    if (_timer) return;
    fn.apply(this, args);
    _timer = setTimeout(() => {
      _timer = null;
    }, delay);
  };
};

// 正则验证函数
const regExp = {
  phone: /^1[3-9]\d{9}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/,
};
// 正则验证名称
export enum regExpName {
  phone = 'phone',
  email = 'email',
  password = 'password',
}
// 创建验证函数
export const createValidate = (reg: keyof typeof regExp) => {
  return (rule: any, value: any, callback: Function) => {
    if (value) {
      if (!regExp[reg].test(value)) {
        callback(new Error(rule.message));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
};
// 封装表单验证
type Form = InstanceType<typeof ElForm>;
export const formValidate = (form: Form | null) => {
  return new Promise((resolve, reject) => {
    if (!form) {
      reject('表单实例不存在');
    } else {
      form.validate((valid: boolean) => {
        if (!valid) {
          // message.warning('请检查表单是否填写正确');
          reject('验证失败');
        }
        resolve('验证成功');
      });
    }
  });
};

// 滚动页面到指定位置
export function goToPosition(id?: string, top = 0) {
  if (!id) {
    window.scrollTo({ top, behavior: 'smooth' });
    return;
  }
  const el = document.querySelector('#' + id);
  if (el) {
    const elTop = el.getBoundingClientRect().top;
    window.scrollBy({ top: elTop - top, behavior: 'smooth' });
  }
}

// 禁用或启用页面滚动条
export function toggleHtmlScroll(scroll: boolean) {
  document.body.parentElement!.style.overflow = scroll ? '' : 'hidden';
}

// 从 HTML 字符串提取 Img 标签的 src 属性
export function getImgSrcFromHtml(html: string) {
  const imgReg = /<img.*?src="(.*?)".*?>/g;
  const imgSrc = html.match(imgReg);
  return imgSrc ? imgSrc.map((item) => item.match(/src="(.*?)"/)![1]) : [];
}
