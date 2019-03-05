import request from '@/common/request'
import { getSign } from '@/common/util'
export default {
	//获取活动列表页面内容接口
	async sendPhoneVerification(query){
		let _url = '/login/verificationLogin';
		let _sign = getSign(_url,query)
		let _query = Object.assign(query,{
			sign : _sign
		})
		let data = await request.post(_url,_query);
		return data;
	},
	//短信登陆：通过验证后手机号登陆(szf)
	async loginByPhoneVerifyCaptcha(query){
		let _url = '/login/loginVerifyCaptcha';
		let _sign = getSign(_url,query)
		let _query = Object.assign(query,{
			sign : _sign
		})
		let data = await request.post(_url,_query);
		return data;
	},
	
}
