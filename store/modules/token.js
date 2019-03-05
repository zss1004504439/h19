//引入常量
import types from '../types.js'

// initial state 初始化 状态1
const state = {
	TOKEN: uni.getStorageSync(types.TOKEN)
}

// getters
const getters = {
	// 获取token值
	getToken: state => state.TOKEN,
	// 验证是否有token
	verifyToken: state => {
		if (state.TOKEN == '') {
			return false
		}
		return true
	}
}

// mutations
const mutations = {
	setToken(state, value) {
		uni.setStorageSync(types.TOKEN, value);
		state.TOKEN = value;
	},

	clearToken(state, value) {
		uni.removeStorageSync(types.TOKEN);
		state.TOKEN = ''
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations
}
