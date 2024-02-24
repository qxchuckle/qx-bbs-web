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
    message.error('请求发送失败');
    return Promise.reject('请求发送失败');
  },
);

// 请求后拦截
service.interceptors.response.use(
  (res: any) => {
    const { showLoading, errorCallback, showError } = res.config;
    showLoading && loading?.close();
    if (res.data.code === 200) {
      return res.data;
    } else if (res.data.code === 901) {
      return Promise.reject({ showError: false, message: '登陆超时' });
    } else {
      errorCallback && errorCallback(res.data);
      return Promise.reject({ showError, message: res.data.info });
    }
  },
  (error: any) => {
    error.config.showLoading && loading?.close();
    return Promise.reject({ showError: true, message: '网络异常' });
  },
);

interface RequestOptions {
  url: string;
  params?: any;
  dataType?: string;
  showLoading?: boolean;
  errorCallback?: Function;
  showError?: boolean;
}

enum ContentType {
  json = 'application/json',
  form = 'application/x-www-form-urlencoded;charset=UTF-8',
}

export const request = async (options: RequestOptions) => {
  const { url, params, dataType, showLoading = true, errorCallback, showError = true } = options;
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
    const result = await service.post(url, formData, {
      headers,
      showLoading,
      errorCallback,
    } as any);
    return result;
  } catch (error: any) {
    errorCallback && errorCallback(error);
    showError && message.error(error.message);
    return null;
  }
};

export default request;
