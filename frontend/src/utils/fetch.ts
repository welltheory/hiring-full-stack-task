import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { envs } from '@/envs';

dayjs.extend(utc);
dayjs.extend(timezone);

export type { AxiosRequestConfig as RequestConfig } from 'axios';

type FetchConfig = {
  path: string;
  baseURL?: string;
  auth?: boolean;
  onRequest?: (request: AxiosRequestConfig) => Promise<AxiosRequestConfig> | AxiosRequestConfig;
};

class Fetch {
  baseUrl: string;
  auth: boolean;
  api: AxiosInstance;
  onRequest?: (request: AxiosRequestConfig) => Promise<AxiosRequestConfig> | AxiosRequestConfig;

  constructor(config: FetchConfig) {
    this.baseUrl = this.getBaseUrl(config);
    this.auth = config.auth || false;
    this.api = axios.create({
      withCredentials: false,
      baseURL: this.baseUrl,
      timeout: 2 * 60 * 1000, // 2 minutes
    });
    this.onRequest = config.onRequest;
  }

  getBaseUrl = (config: FetchConfig) => {
    const base = config.baseURL || envs.apiUrl;
    if (!config.path) return base;
    return `${base}${config.path}`;
  };

  static isUnauthorized = (error: AxiosError) => {
    return error?.response?.status === 401;
  };

  static isForbidden = (error: AxiosError) => {
    return error?.response?.status === 403;
  };

  static handleRequestError = (error: AxiosError) => {
    if (Fetch.isUnauthorized(error)) {
      // Placeholder for unauthorized errors
      console.error('Unauthorized request');
    }
    if (Fetch.isForbidden(error)) {
      // Placeholder for forbidden errors
      console.error('Forbidden request');
    }
  };

  request = async <TData = any>(method: string, url: string, requestConfig: AxiosRequestConfig = {}) => {
    const headers = Fetch.constructHeaders(requestConfig);
    try {
      let config: AxiosRequestConfig = {
        ...requestConfig,
        headers,
        method,
        url,
      };
      if (this.onRequest) {
        config = await this.onRequest(config);
      }
      const response = await this.api<TData>(config);
      return response;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      Fetch.handleRequestError(axiosError);
      return Promise.reject(error);
    }
  };

  get = <TData = any>(url: string, requestConfig: AxiosRequestConfig = {}) =>
    this.request<TData>('get', url, requestConfig);

  post = <TData = any>(url: string, requestConfig: AxiosRequestConfig = {}) =>
    this.request<TData>('post', url, requestConfig);

  patch = <TData = any>(url: string, requestConfig: AxiosRequestConfig = {}) =>
    this.request<TData>('patch', url, requestConfig);

  delete = <TData = any>(url: string, requestConfig: AxiosRequestConfig = {}) =>
    this.request<TData>('delete', url, requestConfig);

  static constructHeaders = (requestConfig: AxiosRequestConfig = {}) => {
    const result: Record<string, string> = {
      'X-Timezone': dayjs.tz.guess(),
      'X-Auth-User-Id': envs.currentUserId,
      Referrer: window.location.href,
    };
    const passedHeaders = (requestConfig.headers || {}) as Record<string, string>;
    return {
      ...result,
      ...passedHeaders,
    };
  };
}

export default Fetch;
