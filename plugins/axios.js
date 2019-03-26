import axios from 'axios'
import qs from 'qs'
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
  getBanner() {
    return get("/home/banner");
  },
  getIndexList() {
    return get('/home/indexlist');
  },
  getList(params) {
    return get('/home/list', params)
  },
  getDetail(params) {
    return get('/home/detail', params)
  },
  getRecommond(params) {
    return get('/home/recommond', params)
  }
}


