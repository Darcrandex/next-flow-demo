import axios from 'axios'
import QueryString from 'qs'

export const http = axios.create({
  timeout: 1000 * 60,
  paramsSerializer: {
    serialize: (params) =>
      QueryString.stringify(params, { arrayFormat: 'brackets' }),
  },
})

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token')
  config.headers['Authorization'] = `Bearer ${token}`

  return config
})

http.interceptors.response.use(
  (res) => {
    // 这里的数据返回处理就要根据业务而定了
    // 默认的 res 是被 axios 包装过的，所以会有 config 等字段
    // 而 res.data 才是接口真正返回的内容

    // 如何定义接口返回的数据类型（typescript）

    // 1. 如果你直接返回 res
    // const api01 = async ()=> http.get<ResponseData>('url')
    // const data = (await api01()).data

    // 2. 如果舍弃 axios 包装，直接返回 res.data
    // const api02 = async ():Promise<ResponseData> => http.get('url')
    // const data = await api02()

    return res
  },
  (err) => {
    // status >=300 时会在这里被拦截
    if (err && typeof err.toJSON === 'function') {
      const error = err.toJSON() || {}
      if (error.status === 401) {
        console.error('登录凭证过期')
      }
    }

    return Promise.reject(err)
  }
)
