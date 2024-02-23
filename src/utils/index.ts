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
