import Axios, { Method, ResponseType, AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

interface IAxiosData {
  url: string
  method: Method
  headers?: any
  json: boolean
  contentType?: string
  data?: any
  params?: any
  timeout?: number
  responseType?: ResponseType
}

// const baseURL = 'http://www.mock.com'
const axios = Axios.create({
  baseURL:'http://ylq.yxtdh.cn/test-gis',
  timeout: 20000
})
// 允许携带cookie
axios.defaults.withCredentials = true
// 请求头信息
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// // 默认使用 application/json 形式
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(
  (config:AxiosRequestConfig) => {
    const token = sessionStorage.getItem('accessToken')
    if(token && config.headers && config.url !== 'auth/oauth/token'){
      config.headers.accessToken = token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
axios.interceptors.response.use(
  (res:AxiosResponse) => res,
  (err) => {
    if (err.response && err.response.data) {
      const code = err.response.status
      const msg = err.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
    } else {
      ElMessage.error(`${err}`)
    }
    return Promise.reject(err)
  }
)

/** *
 * axios({url,method,content,params,datas})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
 * @param {boolean} json, content-type类型，(必填)
 * @param {object}  params
 * @param {object}  datas  //token在datas中
 *
 */
export default function request(arr: IAxiosData) {
  return new Promise<any>((resolve, reject) => {
    console.log(arr)
    axios({
      timeout: arr.timeout === undefined ? 10000 : arr.timeout, // 请求超时时间
      url: arr.url,
      method: arr.method || 'POST',
      headers: arr.headers || {},
      params: arr.params || '',
      data: arr.data || '',
      responseType: arr.responseType || 'json'
    })
      .then((response: AxiosResponse<any>) => {
        /**
         * response格式
         *
         * {
          data:{},
          status:200,
          statusText:'OK',//从服务器返回的http状态文本
          headers: {},//响应头信息
          config: {} //`config`是在请求的时候的一些配置信息
        }
         */
        const responseStatus = `${response.status}`
        // 状态码2开头的处理逻辑
        if (responseStatus.charAt(0) === '2') {
          if (
            response.data.code === '1' ||
            response.data.code === 'err_9999'
          ) {
            ElMessage({
              type: 'error',
              message: response.data.message
            })
            reject(response.data)
            return
          }

          resolve(response.data)
        } else {
          ElMessage({
            type: 'error',
            message: response.data.message
          })
          reject(response.data)
        }
      })
      .catch((err) => {
        ElMessage({
          type: 'error',
          message: err.message
        })
        reject(err)
      })
  })
}
