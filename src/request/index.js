import axios from 'axios'

import { Loading, Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { BASE_URL, TIME_OUT } from './config'

let loadingInstance = null

function request(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
  })

  instance.interceptors.request.use((config) => {
    NProgress.start()
    loadingInstance = Loading.service({
      fullscreen: true
    })
    config.headers['authorization'] = localStorage.getItem('token')
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    return config
  })

  instance.interceptors.response.use(
    (response) => {
      NProgress.done()
      loadingInstance.close()
      if (response.data.code === 200) {
        return Promise.resolve(response.data.data)
      } else {
        Message.error(response.data.message)
      }
    },
    (error) => {
      NProgress.done()
      loadingInstance.close()
      return Promise.reject(error)
    }
  )

  return instance(config)
}

const get = (config) => request(Object.assign(config, { method: 'GET' }))
const post = (config) => request(Object.assign(config, { method: 'POST' }))
const del = (config) => request(Object.assign(config, { method: 'DELETE' }))

export { get, post, del }
