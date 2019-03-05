<template>
	<view>
		<top-nav-bar :hasBackGroundStyle='false'>
			<view class='btn-group-wp'>
				<navigator class="h19clubwx " open-type="navigateBack" hover-class="">&#xe625; </navigator>
 				<!--<text class="h19clubwx">&#xe600;</text>
				<text class="h19clubwx">&#xe887;</text> <text>{{newsDetailData.readCount}}</text> -->
			</view>
		</top-nav-bar>
		<view class="detail-news-wp" v-if="newsDetailData.uid" :style="{ marginTop: contentMarginTop+'px'}">
			<view class="detail-top">
					<view class="top-bg"
						:style="{backgroundImage:'url(' + newsDetailData.image + ')'}">
						<view class="source grace-flex">
							<view class="authorImg"><image :src="newsDetailData.authorImg"></image></view>
							<view class="source-info">
								<view class="name">{{newsDetailData.author}}</view>
								<view class="time">{{newsDetailData.time}}</view>
							</view>
						</view>
						<view class="title">{{newsDetailData.title}}</view>
					</view>
			</view>
			<view class="detail-text grace-padding" >
				<view v-html="newsDetailData.desc"></view>
			</view>
			<view class="detail-bottom grace-space-between">
				
				<view class="bottom-icon"><text class="h19clubwx">&#xe643;</text> <text>{{newsDetailData.comments}}</text></view>
				<view class="bottom-icon" @click="commentDownload"><text class="h19clubwx">&#xe669;</text> <text>{{newsDetailData.collects}}</text></view>
				<button	open-type="share" withCredentials="true" :data-value="ShareData" class="shareBtn bottom-icon">
					<text class="h19clubwx">&#xe627;</text> 
					<text>{{newsDetailData.shares}}</text>
				</button>
			</view>
		</view>
		<view v-else>暂无数据</view>
</view>
</template>
<script>
import topNavBar from '@/components/top-nav-bar/'
import api from "@/common/api";
import {urlEncode} from '@/common/util';
import GetCurrentPageRoute_mx from '@/common/mixins/GetCurrentPageRoute'
	export default {
		mixins: [
			GetCurrentPageRoute_mx
		],
		data() {
			return {
				navBarTitleText:'',//状态栏标题
				contentMarginTop:global.u.contentMarginTop,//状态栏高度
				newsDetailData:{},
				//分享参数
				ShareData:{
					query:{
						uid:'',//内容id
						pid:'110',//分享人
					},
					title:"",//标题
					imageUrl:"",//图片url
				}
			}
		},
		components: {
			topNavBar
		},
		onLoad(options) {
			let _params = options.uid
			// 初始化函数
			this.init(_params)
		},
		//分享函数
		onShareAppMessage(options) {		
			if (options.from === 'button') {
				// 分享事件来源：button（页面内分享按钮）
				// 主要用于多个分享按钮在同一个页面
				// let valueFromTarget = options.target.dataset.value; // nxd临时关闭
				let value = this.ShareData;
				let _basePath = this.CurrentPageRoute;
				let _query = urlEncode(value.query)
				let _path = _basePath +'?'+ _query
				return {
					title: value.title,
					path: _path,
					imageUrl: value.imageUrl
				}
			} else {
				// 分享事件来源：menu（页面内分享按钮）
				// 主要用于多个分享按钮在同一个页面
				let value = this.ShareData;
				let _basePath =  this.CurrentPageRoute;
				let _query = urlEncode(value.query)
				let _path = _basePath +'?'+ _query
				return {
					title: value.title,
					path: _path,
					imageUrl: value.imageUrl
				}
			}
		},
		onPullDownRefresh(){
			this.init(this.uid);
		},
		methods: {
			// 初始化函数
			init(uid){
				if(uid !== ''){
					this.getNewsDetailDataHandler(uid).then(res=>{
						//配置分享参数
						this.settingShareDataHandler()
					})
				}else{
					uni.showToast({
						title:"获取参数错误"
					})
				}
			},
			//获取活动当前用户加入接口
			async getNewsDetailDataHandler(uid){
				const _self = this;
				let _b = await api.news.getNewsDetailData({
					uid : this.uid || uid
				});
				if(_b.data.uid){
					_self.newsDetailData = _b.data;
					_self.navBarTitleText = _b.data.title
				}else{
					uni.showToast({
						title:'内容获取失败',
						icon:"none"
					})
					return false
				}
				return true
			},
			//配置分享参数
			settingShareDataHandler(){
				this.ShareData.query.uid = this.newsDetailData.uid
				this.ShareData.query.pid = this.userid || '110'
				this.ShareData.title = this.newsDetailData.title
				this.ShareData.imageUrl = this.newsDetailData.image
			},
			//评论跳转下载页提示
			commentDownload(){
				uni.showModal({
						title: '提示',
						content: '更多功能请下载APP客户端使用！',
						showCancel:true,
						confirmText:"立即下载",
						success: function (res) {
								if (res.confirm) {
										uni.navigateTo({
												url: '/pages/appdownload/index'
										});
								} 
						}
				});
			}
		}
	}
</script>
<style lang="scss">
.detail-news-wp{
	position: relative;
	z-index: 5;
		.btn-group-wp{
			width:auto ;
			display: inline-block;
			navigator{
				padding-left: 10px;
				float: left;
			}			
			text{
				font-size: 16px;
				font-size: 20px;
				color: #383843;
				&:last-child{
					padding-right: 10px;
					margin-left: 5px;
				}
			}
		}	
	.detail-top{
		.top-bg{
			width: 90%;
			margin: 20px auto 30px;
			border-radius: 10px;
			-webkit-box-shadow: 0px 1px 7px 1px #f9f9f9;
			box-shadow: 0px 1px 7px 1px #f9f9f9;
			height: 400px;
			background-repeat: no-repeat;
			position: relative;
			.source{
				padding: 42px 0 0 34px;
				align-items: center;
				.authorImg{
					image{
						height: 25px;
						width: 25px;
						border-radius: 13px;
						margin-right: 10px;
					}
				}
				.source-info{
					.name{
						font-size: 14px;
						color: #ffffff;
					}
					.time{
						font-size: 12px;
						opacity: 0.5;
						color: #ffffff;
					}
				}
			}
			.title{
				font-size: 32px;
				color: #fff;
				position: absolute;
				width: 80%;
				margin-left: 10%;
				left:0;
				bottom: 30px;
			}
		}
	}
	.detail-text{
		color: #383843;
		font-size: 14px;
		line-height: 24px;
		padding-bottom: 70px;
	}
	.detail-bottom{
		position: fixed;
		background: #ffffff;
		bottom: 0;
		width: 100%;
		height: 44px;
		line-height: 44px;
		-webkit-box-shadow: 0px 1px 7px 1px #ccc;
		box-shadow: 0px 1px 7px 1px #ccc;
		align-items: center;
		display: flex;
		.bottom-icon{
			width: 33%;
			line-height: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
			.h19clubwx{
				font-size: 24px;
				color: #383843;
				padding-right: 5px;
			}
			text{
				font-size: 14px;
				color: #989898;
			}
		}
		.shareBtn{
				background:none;
				&::after{
					border:none;
				}
		}
	}
}
</style>