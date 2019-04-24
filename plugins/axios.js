/**
 * @name: 数据请求
 * @description: nuxt中封装axios数据请求
 * @author: zp
 *
 */
import axios from 'axios'
import qs from 'qs'
// 设置默认请求地址
axios.defaults.baseURL = 'http://api.yellgame.com'

axios.interceptors.request.use((config) => {
  // config.headers.Authorization = AUTH_TOKEN;
  if(config.method == 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
})

axios.interceptors.response.use((res) => {
  return res;
})
// Promise封装axios GET请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  // 获取轮播图banner
  getBanner() {
    return get("/home/banner");
  },
  // 获取所有分类列表
  getIndexList() {
    return get('/home/indexlist');
  },
  // 获取单独分类列表
  getList(params) {
    return get('/home/list', params)
  },
  // 获取游戏详情信息
  getDetail(params) {
    return get('/home/detail', params)
  },
  // 获取推荐游戏列表
  getRecommond(params) {
    return get('/home/recommond', params)
  }

}


