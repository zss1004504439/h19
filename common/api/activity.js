import request from '@/common/request'
import { getSign } from '@/common/util'


export default {
	//获取活动列表页面内容接口
	async getActivityData(query){
		let _url = '/home/activity';
		let _sign = getSign(_url,query)
		let _query = Object.assign(query,{
			sign : _sign
		})
		let data = await request.get(_url,_query);
		return data;
	},

	//获取活动详情页面内容接口
	async getActivityDetailData(query){
		let _url = '/activity/detail';
		let _sign = getSign(_url,query)
		let _query = Object.assign(query,{
			sign : _sign
		})
		let data = await request.get(_url,_query);
		return data;
	},
	
	//获取活动详情页-留言列表内容接口
	async getActivityCommentListData(query){
		let _url = '/activity/comment/list';
		let _sign = getSign(_url,query)
		let _query = Object.assign(query,{
			sign : _sign
		})
		let data = await request.get(_url,_query);
		return data;
	},
	
	//获取活动详情页-活动报名列表内容接口
	async getActivityRegisterListData(query){
		let _url = '/activity/register/list';
		let _sign = getSign(_url,query)
		let _query = Object.assign(query,{
			sign : _sign
		})
		let data = await request.get(_url,_query);
		return data;
	},
	
	//获取活动详情页-活动报名接口
	async postActivityJoinData(query){
	 	let _url = '/activity/join';
		let _sign = getSign(_url,query)
		let _query = Object.assign(query,{
			sign : _sign
		})
		let data = await request.post(_url,_query);
		return data;
	},
	
};
