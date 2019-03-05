<template>
	<view>
		<top-nav-bar :titleText='navBarTitleText' >
			<view class='btn-group-wp'>
				<navigator class="h19clubwx icon_back" open-type="navigateBack" hover-class="">&#xe625; </navigator>
			</view>
		</top-nav-bar>
		<view class="act_detail" :style="{ marginTop: contentMarginTop+'px'}">
			<view class="act_info" v-if='detailData.aid'>
				<view class="act_info_bg">
					<image
						:src="detailData.headImage"
					></image>
				</view>
				<!-- <view class="grace-space-between act_top grace-padding">
					<view class="garce-items" style="width: 10%;">
						<navigator open-type='navigateBack'  class="h19clubwx"><view class="icon_bg"></view><text>&#xe625;</text></navigator>
					</view>
					<view class="garce-items grace-space-between" style="width: 76px;">
						<view class="h19clubwx"><view class="icon_bg"></view><text>&#xe643;</text></view>
						<view class="h19clubwx"><view class="icon_bg"></view><text>&#xe627;</text></view>
					</view>
				</view> -->
				<view class="act_info_con grace-padding grace-space-between">
					<view class="hot font_DIN">
						<view>{{detailData.heat}}</view>
						<view class="h19clubwx">&#xe647;</view>
					</view>
					<view class="con_right grace-columns">
						<view>{{detailData.address}}</view>
						<view class="time">{{detailData.beginTime}}</view>
						<view class="grace-space-between info_bottom">
							<view class="grace-rows">
								<view class="grace-rows info_rows" style="align-items:baseline;">
									<view class="f16">¥</view>
									<view class="f32 font_DIN">{{detailData.price}}</view>
								</view>
								<view style="display: flex; padding-top: 11px; padding-left: 10px;">
									<view class="icon_btn" @tap="showTipHandler1">保</view>
									<view class="icon_btn" @tap="showTipHandler2">退</view>
								</view>
								<!-- 保 弹出框 -->
								<graceMaskView :show="showTips1" v-on:close="hideTipHandler1">
									<view>
										<view style="text-align:center;">交易保障</view>
										<view>为保障您的资金安全，19平台先将您支持的款项托管到担保交易账号中，直到活动结束后三天，才会将款项结算给活动主办方。</view>
										<view style="color:#BEBEC7;">请保证在19平台进行支付，否则19平台会因证据不足，无法保障您的交易安全。</view>
									</view>
								</graceMaskView>
								<!-- 退 弹出框 -->
								<graceMaskView :show="showTips2" v-on:close="hideTipHandler2">
									<view style="padding-top:20px;">
										<view>不支持退款：该活动不支持退款；支持退款：该活动支持活动结束前均可退款。退款金额预计在1-3个工作日内原路退回至付款账号。</view>
									</view>
								</graceMaskView>
							</view>
							<view class="f16 info_rows font_DIN">
								<view class="f32 font_DIN">{{detailData.joinPeople}}</view>
								/{{detailData.totalPeople}}
							</view>
							
						</view>
					</view>
				</view>
			</view>
			<view class="club_btn grace-space-between grace-padding">
				<view>
					该活动由
					<view class="grace-blod" style="display: inline-block;margin:0 3px;">{{detailData.clubName}}</view>
					举办
				</view>
				<navigator to="">进入> </navigator>
			</view>
			<view class="act_introduce grace-padding">
				<view class="introduce">
					<view class="grace-h3">{{detailData.title}}</view>
					<view class="gray f12 sm_title">*适用人群:本俱乐部会员</view>
					<view :class="['introduce_con', textStatus == false ? 'h200' : '']">
						<view v-html="detailData.desc"></view>
					</view>
				</view>
				<view class="introduceBtnMore" v-show="!textStatus" @click="onclickIntroduceBtn"><text>点击展开</text></view>
			</view>
			<!-- 该俱乐部其他活动 begin -->
			<!-- <view class="act_detail_tit grace-space-between grace-padding">
				<view class="tit_left">
					<view class="line"></view>
					该俱乐部其他活动
				</view>
				<navigator class="gray f12">MORE ></navigator>
			</view>
			<view class="greatAct grace-padding grace-imgitems grace-rows">
				<view class="grace-items">
					<image
						src="https://img1.bitautoimg.com/autoalbum/files/20190121/693/20190121191101111143154_8.jpg"
					></image>
					<view class="act_title grace-imgitems-text gray">19盛典·急速梦想</view>
					<view class="greatAct-tips">
						<view class="font_DIN">3344</view>
						<view class="h19clubwx">&#xe647;</view>
					</view>
				</view>
				<view class="grace-items">
					<image
						src="https://img1.bitautoimg.com/autoalbum/files/20190121/693/20190121191101111143154_8.jpg"
					></image>
					<view class="act_title grace-imgitems-text gray">
						热门新车抢先看 2019 北美国际车展
					</view>
					<view class="greatAct-tips">
						<view class="font_DIN">3344</view>
						<view class="h19clubwx">&#xe647;</view>
					</view>
				</view>
			</view> -->
			<!-- 该俱乐部其他活动 end -->
			<view class="act_detail_tit grace-space-between grace-padding">
				<view class="tit_left">
					<view class="line"></view>
					对活动的期待
				</view>
				<navigator class="btn_write grace-rows" @click="commentDownload">
					<view class="grace-iconfont icon-write"></view>
					写留言
				</navigator>
			</view>
			<view class="grace-comment grace-padding">
				<view v-show="noCommentDataStatus" style="text-align:center;background:#f9f9f9;padding:10px 0;">暂无数据</view>
				<view v-show="!noCommentDataStatus" class="grace-comment-list" v-for="(item,index) in commentListData" :key="index">
					<view class="grace-comment-face">
						<image
							:src="item.headImage"
						></image>
					</view>
					<view class="grace-comment-body">
						<view class="grace-comment-top">
							<text>
								{{item.userName}}
								<text>{{item.time}}</text>
							</text>
							<text class="h19clubwx">&#xe7f9;</text>
						</view>
						<view class="grace-comment-content">
							{{item.content}}
						</view>
					</view>
				</view>
				<!-- <view class="grace-comment-list">
					<view class="grace-comment-face">
						<image
							src="https://img1.bitautoimg.com/autoalbum/files/20190121/693/20190121191101111143154_8.jpg"
						></image>
					</view>
					<view class="grace-comment-body">
						<view class="grace-comment-top">
							<text>
								马克一天
								<text>08/10 08:12</text>
							</text>
							<text class="h19clubwx">&#xe7f9;</text>
						</view>
						<view class="grace-comment-content">
							除非巍巍群山消逝不见，除非滔滔江水干涸枯竭。除非凛凛寒冬雷声翻滚，除非炎炎酷暑白雪纷飞，除非天地相交聚合连接，直到这样的事情全都发生时，我才敢将对你的情意抛弃决绝！
						</view>
					</view>
				</view> -->
			</view>
			<!-- 评论区 end -->
			<view  v-show="!noCommentDataStatus" class="grace-more-bottom grace-padding">
				<view class="grace-more-bottom_bg"></view>
				<navigator class="grace-border" hover-class="" open-type="navigate" @click="commentDownload">查看更多精彩留言</navigator>
			</view>
			<view class="act_detail_tit grace-space-between grace-padding">
				<view class="tit_left">
					<view class="line"></view>
					已报名该活动
				</view>
			</view>
			<view class="act_join_people">
				<view v-show="noRegisterDataStatus" style="text-align:center;background:#f9f9f9;padding:10px 0; width: 90%;margin: 0 auto;">暂无数据</view>
				<scroll-view v-show="!noRegisterDataStatus" class="grace-scroll-x" scroll-x>
					<view class="grace-items grace-columns" v-for="(item,index) in registerListData" :key="index">
						<view class="peo_face"><image :src="item.headImg"></image></view>
						<view class="peo_name">{{item.nickname}}</view>
						<view class="peo_num grace-rows">
							参加
							<view class="grace-blod">{{item.activityCount}}</view>
							场
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 已满额 -->
			<view class="act_join grace-space-between grace-padding act_jion_gray" v-if="detailData.totalPeople == detailData.joinPeople">
				<view class="act_join_left grace-rows">
					¥
					<view class="f32 grace-blod font_DIN">9000</view>
					<view class="" v-if="detailData.totalPeople == detailData.joinPeople ">报名已满</view>
				</view>
				<view>
					<navigator hover-class="" open-type="navigate" url="">我要报名</navigator>
				</view>
			</view>
			<!-- 已报名 -->
			<view class="act_join grace-space-between grace-padding act_join_end" v-else-if="detailData.join">
				<view class="act_join_left grace-rows">
					¥
					<view class="f32 grace-blod font_DIN">9000</view>
					<view class="">还剩{{detailData.totalPeople - detailData.joinPeople}}个名额</view>
				</view>
				<view><navigator hover-class="" open-type="navigate" url="">我要报名</navigator></view>
			</view>
		
			<!-- 活动中 -->
			<view class="act_join grace-space-between grace-padding" v-else >
				<view class="act_join_left grace-rows">
					¥
					<view class="f32 grace-blod font_DIN">9000</view>
					<view class="">还剩{{detailData.remainingPeople}}个名额</view>
				</view>
				<view>
					<navigator hover-class="" open-type="navigate" :url="'/pages/activity/join?uid='+uid">我要报名</navigator>
				</view>
			</view>	
		</view>		
</view>
</template>
<script>
import graceMaskView from "../../graceUI/components/graceMaskView.vue";
import api from "@/common/api";
//小程序分享
import {urlEncode,formatTime} from '@/common/util';
import GetCurrentPageRoute_mx from '@/common/mixins/GetCurrentPageRoute'
import topNavBar from '@/components/top-nav-bar/'
export default {
	data() {
		return {
			navBarTitleText: "",//状态栏标题
			contentMarginTop:global.u.contentMarginTop,//状态栏高度
			detailData:{},
			staticUrl: this.staticUrl,
			showTips1 : false,
			showTips2 : false,//
			textStatus:false,//点击展开文字的状态
			btnMoreStatus:true,//点击展开按钮状态
			uid:"",
			commentListquery:{
				page: 1, //	是	int	当前页
				pageSize:2, //	是	int	每页条数
			},
			commentListData:[],//留言数据
			registerListData:[],//活动报名人数数据
			graceSkeleton:"ing",
			noCommentDataStatus:false,
			noRegisterDataStatus:true,
			//分享参数
			ShareData:{
				query:{
					uid:'',//内容id
					pid:'110',//分享人
				},
				title:"",//标题
				imageUrl:"",//图片url
			}
		};
	},
	onLoad(options) {
		this.uid = options.uid;

		let _params = options.uid;
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
	onReady(){
		this.introduceBtnMore();
	},
	components :{
		graceMaskView,
		topNavBar
	},
	methods: {
		//活动时间判断
		actData(){
			var _data = formatTime(new Date());
			console.log(_data,"_data_data_data")
		
		},
		// 初始化函数
		init(aid){
			if(aid !== ''){
				this.getActivityDetailDataHandler(aid).then(res=>{
					//活动留言数据
					this.getActivityCommentListHandler(aid);
					//活动报名人
					this.getActivityRegisterListHandler(aid);
					//配置分享参数
					this.settingShareDataHandler();
					//时间
					this.actData();
					

				})
			}else{
				uni.showToast({
					title:"获取参数错误"
				})
			}
		},
		//配置分享参数
		settingShareDataHandler(){
			this.ShareData.query.aid = this.aid
			this.ShareData.query.pid = this.userid || '110'
			this.ShareData.title = this.detailData.title
			this.ShareData.imageUrl = this.detailData.headImage
		},
		//获取活动报名列表数据接口
		async getActivityRegisterListHandler(aid){
			const _self = this;
			let _b = await api.activity.getActivityRegisterListData({
				id : this.aid || aid
			});
			//console.log(_b,'_registerList_registerList_registerList')
			if(_b.data.length>0){
				_self.registerListData = _b.data;
				_self.noRegisterDataStatus = false;
			}else{
				_self.noRegisterDataStatus = true;
			}
		},
		
		//获取活动留言列表数据接口
		async getActivityCommentListHandler(aid){
			const _self = this;
			let _b = await api.activity.getActivityCommentListData({
				page: _self.commentListquery.page,
				pageSize: _self.commentListquery.pageSize,
				aid : this.aid || aid
			});
			//console.log(_commentList.data,'getActivityComm')
			if(_b.data.list.length>0){
				_self.commentListData = _b.data.list;
				_self.noCommentDataStatus = false;
			}else{
				_self.noCommentDataStatus = true;
			}
		},
		
		//获取活动详情内容接口
		async getActivityDetailDataHandler(aid){
			const _self = this;
			let _a = await api.activity.getActivityDetailData({
				aid : this.aid || aid
			});
			if(_a){
				_self.detailData = _a.data;
				_self.navBarTitleText = _a.data.title
				_self.graceSkeleton="end";
				_self.introduceBtnMore();
			}
			
		},
		//详情介绍  点击展开
		introduceBtnMore(){
			const _self = this;
			// var _height = uni.createSelectorQuery().select(".introduce_con").offsetHeight;
			uni.createSelectorQuery().selectAll('.introduce_con').fields({
				dataset: true,
				size: true,
				rect: true
			}, function (res) {		
				console.log(res,'ssssssssssssssssss')
				if(res[0].height<200){
					_self.btnMoreStatus=false;
					_self.textStatus = true;
				}else{
					_self.btnMoreStatus=true;
					_self.textStatus = false;
				}
				
				/* res.forEach(function (item) {
					if (currentCityName == item.dataset.cityname) {
						uni.pageScrollTo({
							scrollTop: item.top + that.scrollNow - 100 / pixelRatio,
							duration: 0
						})
					}
				}) */
			}).exec();
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
		},
		//详情介绍  点击展开 点击事件
		onclickIntroduceBtn(){
			if(this.textStatus == false){
				this.btnMoreStatus=false;
				this.textStatus = true;
			}
		},
		//保弹出框
		showTipHandler1 (){
				this.showTips1 = true;
		},
		hideTipHandler1 (){
				this.showTips1 = false;
		},
		//退弹出框
		showTipHandler2 (){
				this.showTips2 = true;
		},
		hideTipHandler2 (){
				this.showTips2 = false;
		},
	}
};
</script>

<style lang="scss">
.act_detail {
	.act_detail_tit {
		padding: 50px 5% 22px 5%;
		align-items: center;
		.tit_left {
			position: relative;
			font-size: 20px;
			color: #2b2b30;
			font-weight: bold;
			padding-left: 13px;
			.line {
				position: absolute;
				left: 0;
				bottom: 4px;
				background: #33a38b;
				width: 4px;
				height: 18px;
				display: inline-block;
			}
		}
		.btn_write {
			line-height: 30px;
			height: 30px;
			color: #2B2B30;
			border-radius: 15px;
			view {
				padding-right: 7px;
			}
		}
	}
	.act_info {
		position: relative;
		padding-top: 52px;
		.act_info_bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 400px;
			z-index: 0;
			image {
				width: 100%;
				height: 400px;
			}
		}
		.act_top {
			position: relative;
			top:50px;
			z-index: 11;
			padding: 10px 5%;
			.h19clubwx{
				position: relative;
				width: 32px;
				height: 32px;;
				text{
					color: #ffffff;
					line-height: 32px;
					text-align: center;
					position: absolute;
					top:0;
					left:0;
					width: 32px;	
				}	
				
				.icon_bg{
					border-radius: 16px;
					position: absolute;
					top: 0; 
					left: 0;
					background: #000;
					opacity: 0.3;
					width: 32px;
					height: 32px;
				}
			}
		}
		.act_info_con {
			position: relative;
			padding-top: 249px;
			height: 100px;
			width: 90%;
			background: #fff;
			background: -moz-linear-gradient(
				top,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 1) 100%
			);
			background: -webkit-linear-gradient(
				top,
				rgba(255, 255, 255, 0),
				rgba(255, 255, 255, 1)
			);
			.hot {
				width: 50px;
				background: #4a516e;
				text-align: center;
				color: #fff;
				border-radius: 4px;
				font-size: 21px;
				padding-top: 20px;
				view:first-child{
					color: #fff;
					font-size: 21px;
					height: 30px;
				}
			}
			.con_right {
				align-content: space-between;
				flex: 1;
				color: #4a516e;
				margin-left: 5%;
				view {
					font-weight: bold;
					&:first-child{
						margin-bottom: 7px;
						min-height: 22px;
					}
				}
				.time{
					min-height: 26px;
				}
				.info_bottom {
					margin-top: 7px;
					.grace-mask{
						z-index: 12;
						.grace-mask-view{
							position: relative;
							background: #ffffff;
							padding: 10px 20px;
							.grace-mask-close{
								position: absolute;
								right:5px;
								top:-2px;
								.icon-close{
									color: #4A516E;
								}
							}
							.grace-mask-view-content{
								background: #fff !important;
							}
						}
					}
					.icon_btn {
						width: 24px;
						height: 24px;
						line-height: 24px;
						text-align: center;
						border: 1px solid #4a516e;
						border-radius: 12px;
						font-size: 12px;
						margin-right: 12px;
						display: inline-block;
						margin-bottom: 5px;
					}
					.info_rows {
						align-items: baseline;
						&:last-child {
							display: flex;
							justify-content: flex-end;
						}
					}
				}
			}
		}
	}
	.club_btn {
		margin: 24px 5%;
		padding: 10px 5%;
		width: 80%;
		border: 1px solid #33a38b;
		background: #f1f8f7;
		color: #33a38b;
		border-radius: 4px;
		-webkit-box-shadow: 0px 2px 7px 1px #e9e9ea;
		box-shadow: 0px 2px 7px 1px #e9e9ea;
	}
	.act_introduce {
		position: relative;
		color: #7d7d8f;
		.introduce {
			view:first-child {
				color: #2b2b30;
				font-weight: bold;
			}
			.sm_title {
				margin: 8px 0 40px 0;
			}
			.h200{
				height: 200px;
				overflow: hidden;
			}
			.introduce_con{
				img {
					width: 100% !important;
					margin: 16px 0 !important;
				}
			}
			
		}
		.introduceBtnMore{
			position: absolute;
			height: 100px;
			width: 90%;
			left: 5%;
			bottom: 0;
			background: -moz-linear-gradient(
				top,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, .7) 40%,
				rgba(255, 255, 255, 1) 60%,
				rgba(255, 255, 255, 1) 100%
			);
			background: -webkit-linear-gradient(
				top,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, .7) 40%,
				rgba(255, 255, 255, 1) 60%,
				rgba(255, 255, 255, 1) 100%
			);
			text{
				position: absolute;
				bottom: 20px;
				text-align: center;
				width: 100%;
			}
		}
	}
	.greatAct {
		.grace-items {
			position: relative;
			flex: 1;
			color: #363b4f;
			&:first-child {
				margin-right: 15px;
			}
			image {
				border-radius: 4px;
			}
			.act_title {
				font-size: 14px;
				padding: 6px 0 4px 0;
				height: auto;
				line-height: 20px;
			}
			.greatAct-tips {
				position: absolute;
				width: 44px;
				height: 75px;
				padding-top: 15px;
				left: 8px;
				top: 142px;
				display: inline-block;
				background: #7D7D8F;
				color: #ffffff;
				text-align: center;
				border-radius: 4px;
				view {
					line-height: 30px;
					font-size: 20px;
				}
			}
		}
	}
	.grace-comment {
		.grace-comment-list {
			.grace-comment-face {
				image {
					width: 40px;
					height: 40px;
				}
			}
			.grace-comment-body {
				.grace-comment-top {
					text:first-child {
						color: #989898;
						font-weight: bold;
						text {
							font-size: 12px;
							color: #d8d8d8;
							padding-left: 16px;
							font-weight: normal;
						}
					}
					.h19clubwx{
						color: #D8D8D8;
					}
				}
				.grace-comment-content {
					font-size: 14px;
					color: #2b2b30;
				}
			}
		}
	}
	.grace-more-bottom {
		position: relative;
		navigator {
			line-height: 24px;
			color: #7d7d8f;
			position: relative;
			z-index: 2;
		}
		.grace-more-bottom_bg {
			position: absolute;
			width: 90%;
			top: 0px;
			left: 5%;
			z-index: 1;
			height: 24px;
			background-image: -webkit-linear-gradient(
				to right,
				rgba(250, 250, 250, 0) 0%,
				rgba(250, 250, 250, 1) 20%,
				rgba(245, 245, 245, 1) 50%,
				rgba(250, 250, 250, 1) 80%,
				rgba(250, 250, 250, 0) 100%
			);
			background-image: linear-gradient(
				to right,
				rgba(250, 250, 250, 0) 0%,
				rgba(250, 250, 250, 1) 20%,
				rgba(245, 245, 245, 1) 50%,
				rgba(250, 250, 250, 1) 80%,
				rgba(250, 250, 250, 0) 100%
			);
		}
	}
	.act_join_people {
		margin-bottom: 100px;
		.grace-scroll-x{
			height: 120px;
			.grace-items {
				text-align: center;
				width: auto;
				padding-right: 16px;
				&:first-child{
					margin-left: 5%;
				}
				.peo_face {
					image {
						width: 64px;
						height: 64px;
						border-radius: 32px;
					}
				}
				.peo_name {
					font-size: 14px;
				}
				.peo_num {
					justify-content: center;
					font-size: 12px;
					color: #7c7c8d;
					view {
						color: #000;
						padding: 0 2px;
						font-size: 12px;
					}
				}
			}
		}
	}
	.act_jion_gray{
		.act_join_left {
			color: #7D7D8F !important;
		}
		navigator{
			border:1px solid #7D7D8F !important;
			color: #7D7D8F !important;
			background: #FAFAFA !important;
		}
	}
	.act_jion_end{
		.act_join_left {
			color: #7D7D8F !important;
		}
		navigator{
			border:1px solid #7D7D8F !important;
			color: #7D7D8F !important;
			background: #FAFAFA !important;
		}
	}
	.act_join {
		z-index:3;
		align-items: center;
		padding: 10px 5%;
		background: #fafafa;
		position: fixed;
		left: 0;
		bottom: 0;
		.act_join_left {
			color: #4a516e;
			align-items: baseline;
			font-weight: bold;
			view:last-child {
				font-size: 12px;
				color: #7d7d8f;
				padding-left: 10px;
			}
		}
		navigator {
			background: #56afa2;
			padding: 5px 25px;
			font-size: 16px;
			color: #fff;
			border-radius: 4px;
		}
	}
}
</style>
