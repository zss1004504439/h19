<template>
	<view class="content">
		<view class='grace-center'>
			sdsds
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<input type="text" v-model="userInfo.username" placeholder="请输入账号">
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<input type="text" password="true" v-model="userInfo.password" placeholder="请输入密码">
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="reg">注册账号</navigator>
			<text>|</text>
			<navigator url="pwd">忘记密码</navigator>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	// import {xForm,xInput,xCheckboxGroup,xCheckbox,xRadioGroup,xRadio,xPicker,xTextarea} from "async-validator-uniapp";
	export default {
// 		components:{
// 			xForm : "x-form",
// 			xInput : "x-input",
// 			xCheckboxGroup : "x-checkbox-group",
// 			xCheckbox : "x-checkbox",
// 			xRadioGroup : "x-radio-group",
// 			xRadio : "x-radio",
// 			xPicker : "x-picker",
// 			xTextarea : "x-textarea",
// 		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				positionTop: 0,

				userInfo: {
					username: "",
					password: ""
				},
				form: {
					input: "",
					input2: "",
				},
				rules: {
					input: [{
						required: true,
						message: '请输入txt',
				        trigger: 'change',
				        sort:3,
					}],
					input2: [{
						required: true,
						message: '请输入input2',
				        trigger: 'blur',
				        sort:2
					}]
				}
			}
		},
		computed: {
			...mapState(['forcedLogin']),
		},
		methods: {
			/* customerSubmit() {
				console.log('aaaaaaaaaaaaa')
				this.$refs['ruleForm'].validate((valid,result) => {
					console.log(valid,result,'sssssssss')
					if (valid) {
						
					} else {
						uni.showToast({
                            title: result.error[0].message,
                            duration: 1000,
                            icon:"none"
                        });
						return false;
					}
				});
			}, */
			
			// 			...mapMutations({
			// 				setToken: 'token/setToken',
			// 				setUserName: 'user/setUserName',
			// 			}),
			...mapActions(['login']),
			
			//获取获取服务供应商
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						console.log(res,'getProvider获取服务供应商')
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/images/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			async bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.userInfo.username.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 3 个字符'
					});
					return;
				}
				if (this.userInfo.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */

				if (await this.login(this.userInfo)) {
					this.toMain();
				} else {
					//认证出错
					uni.showToast({
						icon: 'none',
						title: '用户账号或密码不正确',
					});
				}

			},
			//微信登录
			oauth(value) {
				console.log(value,'oauth value')
				uni.login({
					// provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								console.log(infoRes,'infoRes')
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
						if (err.code == -8) {
							uni.showModal({
								title: '错误提示',
								content: '客户端未安装',
								showCancel: false,
							})
						}

					}
				});
			},
			toMain() {
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '/pages/home/index',
					});
				} else {
					uni.navigateBack();
				}
			}
		},
		onLoad() {
			this.initPosition();
			this.initProvider();
		}
	}
</script>
<style lang='scss'>
.content{
	.btn-row{
		border:1upx solid red;
	}
}
</style>
<style>
	page {
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row input {
		width: 80%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-right: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
