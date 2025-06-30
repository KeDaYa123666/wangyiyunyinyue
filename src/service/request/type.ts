// import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// //针对AxiosRequestConfig配置进行扩展
// export interface HYInterceptors<T = AxiosResponse> {
//   requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
//   requestFailureFn?: (err: any) => any
//   responseSuccessFn?: (res: T) => T
//   responseFailureFn?: (err: any) => any
// }

// export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
//   interceptors?: HYInterceptors<T>
// }

import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from 'axios'

// 针对 InternalAxiosRequestConfig 配置进行扩展
export interface HYInterceptors<T = any> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  requestFailureFn?: (err: AxiosError) => Promise<never>
  responseSuccessFn?: (res: AxiosResponse<T>) => T | Promise<T>
  responseFailureFn?: (err: AxiosError) => Promise<never>
}

export interface HYRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T>
}
