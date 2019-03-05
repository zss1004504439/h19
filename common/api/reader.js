import request from '@/common/request'

export default {
	//更新用户基本信息
	update(id, data) {
		return new Promise((resolve, reject) => {
			request.put('/role/' + id, data).then(response => {
				resolve(response)
			})
		})
	},

}
