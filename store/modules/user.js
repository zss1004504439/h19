import types from '../types.js'; //引入常量

// initial state 初始化 状态1
const state = {
	UserInfo: uni.getStorageSync(types.USER_INFO)
}

// getters
const getters = {
	UserInfo: state => {
		return state.userInfo;
	},
}

// mutations 设置浏览器缓存
const mutations = {
	setUserInfo(state, value) {
		uni.setStorageSync(types.USER_INFO, value)
		state.userInfo = value
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations
}
