import axios from 'axios'
import Config from '@/config/env.config'
import { ElMessage } from 'element-plus'
import { useGlobalInfo } from '@/store'

const codeOption: any = {
  SF00: '连接超时',
  TK03: '登录超时或未登录',
}
interface optionsInterface {
  url: string
  method?: string
  params?: object
  data?: object
}
interface exOptionsInterface {
  useGlobalLoading: false
  closeErrorMessage: false
}
/**
 * 公共请求方法
 * @param {Object} options 请求配置
 * @param {string} options.url - 请求地址
 * @param {string} [options.method] - 请求方式
 * @param {Object} [options.params] - 请求参数(get)
 * @param {Object} [options.data] - 请求参数(post)
 * @param {string} [options.serverName] - 服务名
 * @param {Object} [exOptions] - 额外配置
 * @param {boolean} [exOptions.useGlobalLoading] - 是否启用全局loading
 * @param {boolean} [exOptions.closeErrorMessage] - 是否关闭错误提示
 */
function httpRequest(options: optionsInterface, exOptions?: exOptionsInterface): Promise<any> {
  const baseUrl = Config.BASE_URL
  const httpInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': 1,
      mode: 'block',
    },
  })

  httpInstance.interceptors.request.use(
    (config) => {
      const globalInfo = useGlobalInfo()
      config.headers.Authorization = !!globalInfo.userToken ? 'Bearer ' + globalInfo.userToken : ''
      return config
    },
    (error) => error
  )
  httpInstance.interceptors.response.use(
    async (response) => {
      const data = response.data

      if (data.success) {
        return Promise.resolve(data)
      }
      if (exOptions && !exOptions.closeErrorMessage) {
        ElMessage.closeAll()
        if (!data.message) {
          ElMessage.error(codeOption[data.code] || '网络异常')
        } else {
          ElMessage.error(data.message)
        }
      }
      try {
        return await Promise.reject(data)
      } catch (err) {
        return err
      }
    },
    async (error) => {
      if (exOptions && !exOptions.closeErrorMessage) {
        ElMessage.error(error.message || '服务异常')
      }
      try {
        return await Promise.reject(error || '网络异常')
      } catch (err) {
        return err
      }
    }
  )
  return httpInstance
    .request({
      ...options,
      method: options.method || 'post',
    })
    .catch((err) => err)
}

export default httpRequest
