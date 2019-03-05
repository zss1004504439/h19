// 目前没有针对uni的Fly版本，使用wx版本没有问题
import store from '@/store'

// #ifdef H5
import Fly from 'flyio/dist/npm/fly'
// #endif

// #ifndef H5
import Fly from 'flyio/dist/npm/wx'
// #endif

const request = new Fly();


//获取环境接口地址
import {
  envHost
} from '@/common/env';


request.interceptors.request.use((request) => {
  // console.log(request,'hhhhhhhhhhhhhhh');
  
  request.timeout = 20000;
  request.baseURL = envHost;
  // request.headers['Content-Type'] = "multipart/form-data"  
  request.headers['Content-Type'] = "application/x-www-form-urlencoded";
  uni.showLoading({
    title: '正在努力加载中...'
  });

  const verifyToken = store.getters['token/verifyToken'];
  // console.log(verifyToken,'有木有token')

  if (verifyToken) {
    const _token = store.getters['token/getToken']
    // console.log(_token,'_token')
    //给所有请求添加自定义header
    request.headers["token"] = _token;
  }
  // 防止缓存
  // if (request.method === 'POST' && request.headers['Content-Type'] !== 'multipart/form-data') {
  if ( request.method === 'POST') {
    // console.log("POST 防止缓存 if",request)
    request.body = {
      ...request.body,
      // _t: Date.parse(new Date()) / 1000
    }
  } else if (request.method === 'GET') {
    // console.log('GET 防止缓存 if else')
    request.params = {
      // _t: Date.parse(new Date()) / 1000,
      ...request.params
    }
  }
  return request
})

request.interceptors.response.use(function (response) { 
  // console.log(response,'//////responseresponseresponse');
  
  //不要使用箭头函数，否则调用this.lock()时，this指向不对 
  let errmsg = '';
  const data = response.data;
  if (!data || typeof data !== 'object') {
    errmsg = '服务器响应格式错误';
    uni.showToast({
      title: errmsg,
      icon: 'none'
    })
  } else {
    // console.log(data, 'else....................');
    const errno = data.errno || data.status;
    errmsg = data.errmsg || data.msg;
    switch (errno) {
      case -100:
        // 数据检验未通过
        uni.showToast({
          title: errmsg + errno,
          icon: "none"
        })
        break;
      default:
        // 数据请求成功
        break
    }
  }
  //隐藏loading
  uni.hideLoading();
  return response.data;
}, function (err) {
  //隐藏loading
  uni.hideLoading();
  console.log(err, '// error in request.js');
  let errmsg = err.response.data.message;
  switch (err.response.data.status) {
    case 0:
      console.log("网络连接错误")
      errmsg = "网络连接错误";
      break;
    case 401:
      console.log("请登录后操作")
      errmsg = '请登录后操作';
      store.dispatch('logout');
      uni.redirectTo({
        url: '/pages/auth/login'
      })
      break
    case 404:
      errmsg = err.response.data.message;
      break
  }
  uni.showToast({
    title: errmsg,
    icon: 'none'
  })
  
})

export default request