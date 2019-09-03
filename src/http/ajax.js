import Nprogress from '@plugins/nprogress'
import Service from '@/http/service'

/**
 *生成ajax
 *
 * @class Ajax
 */
export default class Ajax extends Service {
  constructor($commit, $axios, $configs) {
    super($commit, $axios, $configs)
  }

  response = async ({ method = 'get', url, params, data, isList, isBlob }) => {
    Nprogress.start()
    // 配置config
    const config = {
      method,
      url,
      params,
      data,
    }

    if (isBlob) config.responseType = 'blob'

    try {
      const res = await this.service(config)

      // 列表请求 也需要根据后端返回的字段进行更改
      if (isList) res.data.pages = Math.ceil(res.data.count / params.page_size)

      // 如果是获取blob（目前只有验证码校验获取）
      if (isBlob) {
        return {
          ok: true,
          data: res.data,
        }
      }
      return await this.requestProcessing(res, 'serviceErrorCode')
    } catch (error) {
      return this.allResponseErrorProcessing(error)
    } finally {
      Nprogress.done()
    }
  }

  get = async (url, params = {}) => {
    return await this.response({ url, params })
  }

  getBlob = async (url, isBlob = true, params = {}) => {
    return await this.response({ url, params, isBlob })
  }

  getList = async (url, params = {}, isList = true) => {
    const pageMeta = {
      page_size: 15,
      page: 1,
    }
    params = {
      ...pageMeta,
      ...params,
    }
    return await this.response({ url, params, isList })
  }

  post = async (url, data) => {
    return await this.response({ method: 'post', url, data })
  }
}
