import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import request from '@/common/request'
// import {logger,dump} from '@/common/logger'

Vue.config.productionTip = false;

//挂载全局对象
Vue.prototype.$store = store
Vue.prototype.$request = request
//以下对象需要取消，没有使用的必要性
// Vue.prototype.$request = request
// Vue.prototype.$logger =logger; //日志记录器


//开发阶段使用Easy-mock模拟请求接口
//发行版本需要替换为实际的地址
// Vue.prototype.$API_BASE = 'http://192.168.0.27:8360' //API请求的基础地址

//注册全局组件
App.mpType = 'app'
const app = new Vue({
  store,
  request,
  ...App
})
app.$mount()
