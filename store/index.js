import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import api from '@/common/api'
import types from './types';
// 引入各个模块
import token from './modules/token'
import user from './modules/user'
import system from './modules/system'

const debug = true;
const getters = {}
const state = {
  forcedLogin: true,
  hasLogin: uni.getStorageSync(types.USER_INFO) === '' ? false : true,
}
const mutations = {
  /**
   * 记录登录状态
   */
  login(state) {
    state.hasLogin = true;
  },
  /**
   *  退出登录状态
   */
  logout(state) {
    state.hasLogin = false;
    state.token.value = '';
    state.user.username = '';
    // uni.removeStorageSync(types.TOKEN);
  },
}
const actions = {
  /**
   * 设置用户设备信息
   */
  SET_SYSTEM_INFO(context, value) {
    context.commit('system/setSystemInfo', value);
  },
  /**
   * 根据手机号码和手机短信验证码设置登录，并设置相应的状态信息
   */
  async login_action(context, _query) {
    const _a = await api.token.loginByPhoneVerifyCaptcha(_query);
    if (_a.status == 200 && _a.data.uid) {
      console.log(_a,'mutation !!!')
      context.commit('token/setToken', _a.data.token);
      context.commit('user/setUserInfo', _a.data);
      context.commit('login'); //修改登录状态			
      return true;
    } else {
      return false;
    }
  },
  /**
   * 注销，退出登录
   */
  logout_action(context) {
    context.commit('logout'); //修改登录状态
    uni.clearStorage(); //清除本地缓存
  },
}


// token	String	用户token，用于后续操作
// headImg	String	用户头像
// uid	Number	用户id
// nickName	String	昵称
// vipLeve	Number	vip 等级
// vipExpires	String	vip 过期时间
// isVVip	Boolean	是否为贵宾
// userSystem	String	用户权限登录显示 joinMember 白金会员 registerMember 注册会员 applyMember 认证用户 failOrdinary 普通用户
// VVipStatus	String	贵宾会员状态（如果没贵宾会员订单为””）
// imToken	String	融云token
// needPassword	Boolean	ture 新用户 没有密码需要提示设置密码
// havePassword	Boolean	有无密码 false 有密码 true 有密码



Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    token,
    user,
    system
  },
  state,
  actions,
  getters,
  mutations,
  strict: debug, //设置运行模式
  plugin: debug ? [createLogger()] : [] //调试模式加入日志插件
})
