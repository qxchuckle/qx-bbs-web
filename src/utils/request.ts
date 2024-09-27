import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { ElLoading } from 'element-plus';

const service = axios.create({
  baseURL: apiPrefix,
  timeout: 10 * 1000,
});
let loading: any = null;

// 请求前拦截
service.interceptors.request.use(
  (config: any) => {
    if (config.needLogin) {
      const userStore = useUserStore();
      if (!userStore.isLogin) {
        return Promise.reject({
          config,
          message: '需要登陆',
          action: 'showLogin',
          showError: true,
        });
      }
    }
    if (config.showLoading) {
      loading = ElLoading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    }
    return config;
  },
  (error: any) => {
    error.config.showLoading && loading?.close();
    return Promise.reject({ config: error.config, action: null });
  },
);

// 请求后拦截
service.interceptors.response.use(
  (res: any) => {
    const { showLoading, errorCallback, showError = true } = res.config;
    showLoading && loading?.close();
    if (res.data.code === 200) {
      return res.data;
    } else if (res.data.code === 901) {
      return Promise.reject({ showError: false, message: '登陆超时', action: 'showLogin' });
    } else {
      errorCallback && errorCallback(res.data);
      return Promise.reject({ showError, message: res.data.info, action: null });
    }
  },
  (error: any) => {
    const { showLoading } = error.config;
    showLoading && loading?.close();
    return Promise.reject({
      showError: error.showError,
      message: error.message || '网络异常',
      action: error.action,
    });
  },
);

interface RequestOptions {
  url: string;
  params?: any;
  dataType?: string;
  showLoading?: boolean;
  errorCallback?: Function;
  showError?: boolean;
  needLogin?: boolean;
}

enum ContentType {
  json = 'application/json',
  form = 'application/x-www-form-urlencoded;charset=UTF-8',
}

interface resData<T = any> {
  state: string;
  code: number;
  info: string;
  data: T;
}

export const request = async <T = any>(options: RequestOptions) => {
  const { url, params, dataType, showLoading = true, errorCallback, needLogin } = options;
  let contentType = ContentType.form;
  const formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key] ?? '');
  }
  if (dataType && dataType === ContentType.json) {
    contentType = ContentType.json;
  }
  const headers = {
    'Content-Type': contentType,
    'X-Requested-With': 'XMLHttpRequest',
  };
  try {
    const result = await service.post<any, resData<T>>(url, formData, {
      headers,
      showLoading,
      errorCallback,
      needLogin,
    } as any);
    return result;
  } catch (error: any) {
    errorCallback && errorCallback(error);
    error.showError && message.error(error.message);
    if (error.action === 'showLogin') {
      const pageStore = usePageStore();
      pageStore.showLogin();
    }
    return null;
  }
};

export default request;
