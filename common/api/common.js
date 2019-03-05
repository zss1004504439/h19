import request from '@/common/request'
import { getSign } from '@/common/util'
export default {
	//获取城市列表
	//http://192.168.0.244:90/web/#/4?page_id=288
	async getCityList(){
		let data = await request.get("/area/spell/city/list");
		return data;
	},
	// wxcode 换取 openid
	async wxcode2openid(query){
		let _url = '/wechat/applets/openid';
		// let _sign = getSign(_url,query)
		// let _query = Object.assign(query,{
		// 	sign : _sign
		// })
		let data = await request.get(_url,query);
		return data;
	}
}
