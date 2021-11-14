import Axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui'
import Cookies from 'js-cookie';

const CONTENT_TYPE = {
  json: "application/json;",
  form: "application/x-www-form-urlencoded;",
  html: "text/html;",
  file: "multipart/form-data",
  excel: "msexcel"
};
let loading; //定义loading变量
function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    target: 'main',
    text: '加载数据中……',
  })
}

function endLoading() { //使用Element loading-close 方法
  loading.close()
}
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
Axios.defaults.timeout = 60000
Axios.defaults.baseURL = process.env.VUE_APP_API_DOMAIN
//http request 拦截器
Axios.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //   config.data = qs.stringify(config.data);
    //   config.headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //   }
    // } else if (config.method === 'get') {
    //   let newParams = {}
    //   for (let key in config.params) {
    //     newParams[key] = encodeURIComponent(config.params[key])
    //   }
    //   config.params = newParams
    config.headers['Content-Type'] = config.sendheaders.contentType;
    let token = Cookies.get('userInfoToken')
    config.headers['Authorization'] = token ? token : ''
    // }
    //显示等待框
    showFullScreenLoading()
    return config
  },
  error => {
    console.log('11')
    return Promise.reject(error)
  }
)
//http response 拦截器
Axios.interceptors.response.use(
  response => {
    let data = response.data
    //隐藏等待框
    tryHideFullScreenLoading()
    if (data.code === 200) {
      return Promise.resolve(data)
    } else {
      console.log('22')
      return Promise.reject(data)
    }
  },
  error => {
    Message.error('网络连接错误，请稍后重试！')
    tryHideFullScreenLoading()
    // return Promise.reject(error)

  }
)
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
const get = function get(url, params = {}, sendheaders = {
  contentType: CONTENT_TYPE['form']
}) {
  return new Promise((resolve, reject) => {
    params.showLoading && showFullScreenLoading() //显示等待框
    Axios.get(url, {
        params: params,
        sendheaders: sendheaders
      }, )
      .then(response => {
        params.showLoading && tryHideFullScreenLoading() //隐藏等待框
        resolve(response);
      })
      .catch(err => {
        params.showLoading && tryHideFullScreenLoading() //隐藏等待框
        reject(err)
      })
  })
}
/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
 */
const post = function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    params.showLoading && showFullScreenLoading() //显示等待框
    Axios.post(url, params)
      .then(response => {
        params.showLoading && tryHideFullScreenLoading() //隐藏等待框
        resolve(response);
      }, err => {
        params.showLoading && tryHideFullScreenLoading() //隐藏等待框
        reject(err)
      })
  })
}
export {
  post,
  get,
}
