<template>
	<view>
		<top-nav-bar :titleText='navBarTitleText' >
			<view class='btn-group-wp'>
				<navigator class="h19clubwx" open-type="navigateBack" hover-class="">&#xe625;</navigator>
			</view>
		</top-nav-bar>
		<view class="grace-padding" :style="{ marginTop: contentMarginTop+'px'}">
			<view class="grace-form">
				<form @submit="loginNow">


					<view class="grace-space-between  item-border" style="margin-top:28upx;">
						<view class="grace-items" style="width:70%;">
							<view class="grace-label grace-center">手机号</view>
							<input type="number" name="pn" class="input" v-model="phone" placeholder="请输入手机号"></input>
						</view>
					</view>
					
					<view class="grace-space-between  item-border" style="margin-top:28upx;">
						<view class="grace-items" style="width:70%;">
							<view class="grace-label grace-center">图形验证码</view>
							<input type="number" class="input" name="txyzm" v-model="code" placeholder="请输入图形验证码"></input>
						</view>
						<view style="width:28%;  margin-left:2%; paading:0;">
							<image class='imagecode' mode='widthFix' :src='getVerificationCodeURL' @tap='changeImageCodeHandler'></image>
						</view>
					</view>

					<view class="grace-space-between  item-border" style="margin-top:28upx;">
						<view class="grace-items" style="width:70%;">
							<view class="grace-label grace-center">短信验证码</view>
							<input type="number" class="input" name="yzm" v-model="smscode" placeholder="请输入短信验证码"></input>
						</view>
						<view style="width:28%;  margin-left:2%; paading:0;">
							<button type="primary" class="login-sendmsg-btn" @tap='getVCodeHandler'>{{vcodeBtnName}}</button>
						</view>
					</view>
				
					<button form-type='submit' type='primary' style='background:#00C777; margin-top:30px;'>
						登 录
					</button>
				</form>
			</view>
			<!-- <view class="grace-center" style="margin-top:20upx; line-height:50upx;" @tap="reg">
				还没有账号？点击注册
			</view> -->
			<!-- 第三方登录 -->
			<!-- <view class="grace-title" style="margin-top:30px;">
				<view class="grace-h5 grace-blod grace-center" style='color:#00C777'>第三方登录</view>
			</view> -->
			<!-- <view class="grace-login-three" style="margin-top:8px;">
				<button
					class='testbutton'
					open-type="getUserInfo"
					@getuserinfo="getuserinfo"
					withCredentials="true"
				>
					微信登录
				</button>
				
				<button
					class='testbutton'
					open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber"
					withCredentials="true"
				>
					手机号
				</button>
				

				<button
					class='testbutton'
					open-type="share"
					withCredentials="true"
					:data-value="ShareData"
				>
					转发
				</button>
			</view> -->
		</view>
	</view>
</template>
<script>
var _this;
var graceChecker = require("../../graceUI/graceChecker.js");
import {envHost} from '@/common/env';
import {urlEncode} from '@/common/util';
import api from "@/common/api";
import topNavBar from '@/components/top-nav-bar/';
import {
	mapState,
	mapMutations,
	mapActions
} from 'vuex'
export default {
	name: '登录',
	components: {
		topNavBar
	},
	data() {
		return {
			navBarTitleText:'登录',//状态栏标题
			contentMarginTop:global.u.contentMarginTop,//状态栏高度
			getVerificationCodeURL:"",//图形验证码 URL 拼接生成
			macCode:"0",//验证码标识 随机生成
			vcodeBtnName: "获取验证码",
			countNum : 120,//短信重新发送倒计时
			countDownTimer : null,
			phone : '13810184237',
			code : '',//图形验证码
			smscode:"",//短信验证码
			smstoken:"",//短信发送成功后返回的token
			openid:'',
			ShareData:{
				query:{
					uid:'123',//内容id
					pid:'110',//分享人
					fromShare:true,//来自分享
				},
				title:"分享标题测试test",//标题
				imageUrl:"http://file.h19club.com/FpF9NDS-5ttStBl_Jj0r3iYPakuI",//图片url
			}
		}
	},
	onLoad(options){
		_this = this
		// 初始化
		this.getImageCodeHandler()
	},
	//分享按钮函数
	onShareAppMessage(options) {		
		if (options.from === 'button') {
			// 分享事件来源：button（页面内分享按钮）
			// 主要用于多个分享按钮在同一个页面
			let value = options.target.dataset.value;
			let _basePath = `/pages/auth/login`;
			let _query = urlEncode(value.query)
			let _path = _basePath +'?'+ _query
			console.log(_path,'_path_path_path_path_path_path_path_path_path_path');
			return {
				title: value.title,
				path: _path,
				imageUrl: value.imageUrl
			}
		} else {
			// 分享事件来源：menu（右上角分享按钮）
			return {
				title: 'XXX小程序',
				desc: '最具人气的小程序开发联盟!',
				path: 'pages/index/index',
			}
		}
	},
	methods:{		
		...mapActions(['login_action']),
		// 发送短信验证码
		getVCodeHandler : function(){
			var myreg=/^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
			if (!myreg.test(this.phone)){
				uni.showToast({ title: '请正确填写手机号码', icon : "none"});
				return false;
			}
			if (this.code == ''){
				uni.showToast({ title: '请正确填写图形验证码', icon : "none"});
				return false;
			}
			// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
			if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送'){return ;}
			this.sendPhoneSmsByCodeHandler().then((res)=>{
				// 临时取消
				// this.vcodeBtnName =  "发送中...";
				if(res){
					// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
					// 假设发送成功，给用户提示
					uni.showToast({ title: '短信已发送，请注意查收', icon : "none"});
					// 倒计时
					// this.countNum = 120;
					this.countDownTimer = setInterval(function(){this.countDown();}.bind(this), 1000);
				}else{
					// 倒计时
					// this.countNum = 120;
					this.countDownTimer = null
					this.vcodeBtnName =  "获取验证码";
				}
			})
		},
		// 发送手机短信验证码
		async sendPhoneSmsByCodeHandler(){
			const _self = this;
			//配置请求 .......开始
			let _query = {};
			_query.code = this.code
			_query.macCode = this.macCode
			_query.phone = this.phone
			let _a = await api.token.sendPhoneVerification(_query);
			if(_a.status == 200 && _a.data){
				console.log(_a,'////////////////////////////');
				this.smstoken = _a.data
				return true
			}else{
				uni.showToast({ title: _a.msg, icon : "none"});
				return false
			}
		},
		// 登录开始
		loginNow : function(e){			
			// 表单验证
			var rule = [
				{ name: "pn", checkType: "phone", errorMsg: "请填写正确的手机号" },
				{ name: "txyzm", checkType: "string", checkRule: "4,6", errorMsg: "请正确填写图形验证码" },
				{ name: "yzm", checkType: "string", checkRule: "4,6", errorMsg: "请正确填写短信验证码" },
			];
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				// 验证通过
				uni.showToast({ title: "请观察控制台", icon: "none" });
				// 发送登录请求
				this.loginByPhoneVerifyCaptchaHandler()
			} else {
				// 验证失败
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
		},
		// 发送登录请求 vuex => actions
		async loginByPhoneVerifyCaptchaHandler(){
			var _query = {}
			_query.captcha = this.smscode
			_query.phone = this.phone
			_query.plat = "小程序"
			_query.token = this.smstoken
			let _a = await this.login_action(_query)
			if(_a){
				uni.navigateBack({
						delta: 1
				});
			}else{
				uni.showToast({
					title:"登录失败，请重新登录"
				})
			}
		},
		// 手动更新图形验证码
		changeImageCodeHandler(){
			this.getImageCodeHandler()
		},
		// 生成随机的图形验证码请求 更新图形验证码
		getImageCodeHandler(){
			var _baseURL = envHost+'/login/getVerificationCode/'
			this._baseURL = _baseURL
			var _bate = 10
			var _macCode = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,_bate-1)).toString();
			this.macCode = _macCode
			this.getVerificationCodeURL = _baseURL+_macCode
		},
		// 倒计时
		countDown : function(){
			if (this.countNum < 1){
			  clearInterval(this.countDownTimer);
			  this.vcodeBtnName = "重新发送";
			  return ;
			}
			this.countNum--;
			this.vcodeBtnName =  this.countNum + '秒重发';
		},

















		//注册
		reg : function(){
			wx.showToast({ title: "注册页面类似登录，请自行完善 (:", icon: "none" });
		},
		//微信授权 获取用户手机号码
		getPhoneNumber:(res)=>{
			if(res.detail.iv && res.detail.encryptedData){
				//去解密
				console.log(res.detail,'ssssssssssss');
				_this.getDecryptHandler(res.detail)
			}else{
				uni.showToast({
					title:'您未授权使用微信绑定的手机号'
				})
			}
		},
		//解密数据
		getDecryptHandler(obj){
			uni.request({
				method: 'POST',
				// url: 'https:///hoa.hcoder.net/xcxencode/',
				url : `${envHost}/wechat/applets/decrypt`,
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					openid: this.openid,
					iv: obj.iv,
					encryptedData: obj.encryptedData
				},
				success: function(res6) {
					//"﻿﻿﻿{"openId":"oS6of0V0rdp9nY_BuvCnQUasOHYc","nickName":"深海",
					//"gender":1,"language":"zh_CN","city":"Xi'an","province":"Shaanxi",
					//"country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/7iags6YD4enyU"
					if(res6.data.data){
						console.log("//////res6")
						console.log(JSON.parse(res6.data.data));
						console.log("//////res666666")
					}
					
					//至此登录完成
				}
			});
		},
		//微信登录&获取用户信息
		getuserinfo: (res1)=>{		
			console.log(global.u,'sssssssss')
			console.log("//////res1")
			console.dir(res1);//res1	
			console.log("//////res111")			
			
			//如果只需要opendid 和非加密数据至此登录完成
			//此处连接数据库利用openid 就可以进行登录环节
			
			uni.login({
				provider: 'weixin',
				success: function(res2) {
					console.log("//////res2")
					console.dir(JSON.stringify(res2));//res2
					console.log("//////res2222")
					//获取 sessionKey
					uni.request({
						method: 'GET',
						//wechat/applets/openid?code=001e8Bgm1f8Qgp08rthm12sggm1e8BgJ
						url : `${envHost}/wechat/applets/openid`,
						header: { 'content-type': 'application/x-www-form-urlencoded' },
						data: {
							code: res2.code
						},
						// url : `https://hoa.hcoder.net/xcxencode/?c=sk&appid=wxbb7f9f1f2c6f4f33&secret=739b970b832f0df158f54c494a08e440&code=${res2.code}`,
						success: function(res3) {
							console.log("//////res3")
							console.dir(res3);//res3
							console.log("//////res333")
							//记录到本地
							try {
								// uni.setStorageSync('sk', res3.data.session_key);
								uni.setStorageSync('openid', res3.data.data);
								_this.openid = res3.data.data
							} catch (e) {
								//TODO handle the exception
							}
							uni.hideLoading();
							//以下步骤可以获取加密信息，需要授权
							//获取加密信息
							if (!res1.detail.iv) {
								uni.showToast({
									title: '您取消了授权,登录失败',
									icon: 'none'
								});
								return false;
							}
							//不安全 
// 							try {
// 								var sessionKey = uni.getStorageSync('sk');
// 								console.log(sessionKey,"sessionKey");
// 							} catch (e) {
// 								//TODO handle the exception
// 							}
							uni.request({
								method: 'POST',
								// url: 'https:///hoa.hcoder.net/xcxencode/',
								url : `${envHost}/wechat/applets/decrypt`,
								header: { 'content-type': 'application/x-www-form-urlencoded' },
								data: {
									openid: res3.data.data,
									iv: res1.detail.iv,
									encryptedData: res1.detail.encryptedData,
								},
								success: function(res4) {
									//"﻿﻿﻿{"openId":"oS6of0V0rdp9nY_BuvCnQUasOHYc","nickName":"深海",
									//"gender":1,"language":"zh_CN","city":"Xi'an","province":"Shaanxi",
									//"country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/7iags6YD4enyU"
									if(res4.data.data){
										console.log("//////res4")
										console.log(JSON.parse(res4.data.data));
										console.log(JSON.parse(res4.data.data).nickName);
										console.log("//////res444")
									}
									
									//至此登录完成
								}
							});
						},
						fail : (error)=>{
							console.log(error)
							console.log('fail')
						},
						complete : (comp) => {
							console.log(comp)
							console.log('complete')
						}
					});
				}
			});
		},
	}
}
</script>
<style>
.item-border{border-bottom: 1px solid #E0E0E0 !important;}
.login-sendmsg-btn{border:1px solid #00C777 !important; background:none !important; color:#00C777 !important; width:100%; height:35px; line-height:35px; margin-top:6px; font-size:14px !important;}
.grace-login-three{display:flex; justify-content:center; flex-wrap:nowrap;}
.grace-login-three view{width:50px; height:50px; line-height:50px; font-size:46px; color:#00C777; text-align:center; margin:8px 15px;}
.testbutton{
	border-radius: 15px;
	background: #00BFFF;
	/* background: url(../../static/home/mes.jpg) center center no-repeat blue; */
	width:200px;
	height:50px;
}
.imagecode{
	width:80px;
	height:30px
}
</style>