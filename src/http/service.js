import AxiosUtils from '@/http/axios-utils'

export default class Service extends AxiosUtils {
  constructor($commit, $axios, $configs) {
    super($commit)
    // 挂载axios
    this.$axios = $axios
    // 基础属性
    this.base_configs = $configs
    this.createService(this.$axios, this.base_configs)
  }
  createService = (axios, configs) => {
    // 生成axios
    const service = axios.create(configs)
    // 设置Post 默认 Content-Type
    service.defaults.headers.post['Content-Type'] =
      'application/json;charset=UTF-8'
    // 设置跨域携带用户凭证
    service.defaults.withCredentials = true
    // requst 拦截器
    service.interceptors.request.use(
      async config => {
        const { data, params, method } = config
        try {
          let ProcessedParams = { ...params }
          if (params && params.throttle) {
            ProcessedParams = await this.throttle(params)
          }
          method === 'post'
            ? (config.data = { ...data })
            : (config.params = ProcessedParams)
          return config
        } catch (error) {
          return Promise.reject(error)
        }
      },
      error => {
        return Promise.reject(error)
      },
    )
    // response 拦截器
    service.interceptors.response.use(
      response => {
        const responseCode = response.status
        if (responseCode === 200) {
          // 第一层处理请求code
          // TODO:后期可以考虑将两层验证全部集中在service中处理
          return Promise.resolve(response)
        } else {
          return Promise.reject(response)
        }
      },
      async error => {
        return await this.netWorkError(error)
      },
    )
    this.service = service
  }
}
