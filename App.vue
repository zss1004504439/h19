<script>
	import {envHost} from '@/common/env';
	import api from '@/common/api';
	let _this;
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	
	//全局对象
	global.u = {
		code:'',
		openid:'',
		fromShare : false,
		statusBarHeight : 20,//状态栏高度
		titleBarHeight : 46,//导航栏高度
		contentMarginTop: 66,//内容距离顶部的高度
		system:'',//系统版本
		systemModel:"",//设备型号
	}
	global.searchCity = {
		code:'',
		name:''
	}
	export default {
		onLaunch: function(options) {						
			_this = this;
			// uni.showShareMenu({
			// 	withShareTicket:true,
			// 	success:(res)=>{
			// 		console.log(res,'官方关闭了分享的回调');
			// 	}
			// })
			if( options && options.uid ){
				console.log(options,'// 页面有传参 onLaunch');
			}else{
				console.log(options,'// 页面没有传参 onLaunch');
			}
			// 场景值保存到全局对象
			global.u.scene = options.scene ? options.scene : ''
			// 判断是否由分享进入小程序
			if (options.scene == 1007 || options.scene == 1008) {
				global.u.fromShare = true
			} else {
				global.u.fromShare = false
			};
			// 初始化函数 
			this.initOnLaunch()
			//获 取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
			wx.getSystemInfo({
			  success: (res) => {
					console.log(res,'getSystemInfo //onLaunch')
					global.u.statusBarHeight = res.statusBarHeight
					global.u.contentMarginTop = res.statusBarHeight+global.u.titleBarHeight
					global.u.system = res.system
					global.u.systemModel = res.model
			  }
			})			
		},
		onShow: function() {
		},
		onHide: function() {
		},
		methods:{
			...mapActions({
				setSystemInfo : "SET_SYSTEM_INFO"
			}),
			// 初始化
			initOnLaunch:()=>{
				// 获取登录凭证（code） 
				wx.login({
				  success(res) {
						if (res.code) {
							global.u.code = res.code
							_this.getOpenIdByWxCodeHandler(res.code).then((results)=>{
								console.log(results,'// get openId from JAVA API');
								global.u.openid = results
								// 更新vuex 状态
								_this.setSystemInfo(global.u)
							})							
						} else {
							console.error(res.errMsg)
						}
					},
					fail(err){
						console.error('获取用户code失败！' + err)
					}
				})
			},
			// get openId by JAVA API
			async getOpenIdByWxCodeHandler(code){
				const _self = this;
				//配置请求参数
				let _query = {};
				if (code !== '') {
					_query.code = code
				}
				let _a = await api.common.wxcode2openid(_query);
				if(_a.data){
					return _a.data
				}else{
					return ""
				}
			}
		}
	};
</script>

<style>
	/* 这是页面的公用css */
	@import 'graceUI/graceUI.css';
	@import 'common/css/h19club.css';

	/* page {
		font-size: 28upx;
	}
  
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
	} */
</style>