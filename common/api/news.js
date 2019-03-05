import request from '@/common/request'
import { getSign } from '@/common/util'

export default {
	//获取活动详情页面内容接口
	async getNewsDetailData(query){
		let _url = '/news/detail';
		let _sign = getSign(_url,query)
		let _query = Object.assign(query,{
			sign : _sign
		})
		let data = await request.get(_url,_query);
		return data;
	},
	
};