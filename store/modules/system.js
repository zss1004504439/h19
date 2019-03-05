import types from '../types.js'; //引入常量

// initial state 初始化 状态1
const state = {
	SYSTEM_INFO: uni.getStorageSync(types.SYSTEM_INFO),
	SEARCH_HISTORY_LIST: uni.getStorageSync(types.SEARCH_HISTORY_LIST)
}

// mutations 设置浏览器缓存
const mutations = {
	setSystemInfo(state, value) {
		uni.setStorageSync(types.SYSTEM_INFO, value)
		state.SYSTEM_INFO = value
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
