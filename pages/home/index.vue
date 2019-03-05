<template>
	<view>
		<top-nav-bar :titleText='navBarTitleText' >
			<view class='btn-group-wp'>
				<navigator url="/pages/search/search" hover-class="" class="h19clubwx icon_sousuo" >&#xe605; 搜索</navigator>
			</view>
		</top-nav-bar>
		<view class="home" :style="{ marginTop: contentMarginTop+'px'}">
			<view class="swiper_con">
				<swiper 
					:class="['swiper', graceSkeleton == 'ing' ? 'grace-skeleton' : '']"
					indicator-color="rgba(255, 255, 255, .3)" 
					indicator-active-color="rgba(255, 255, 255, .9)"
					indicator-dots="true" 
					duration="500" 
					interval="2000"
					autoplay="true" 
					circular="true" 
					@change='homeBannerChangeCurrentNum'    
					:style="{backgroundImage:'url(' + homeData.carousel[currentNum].image + ')'}"
					v-if=" homeData.carousel.length > 0 "
					>
					<swiper-item v-for="(item,index) in homeData.carousel" :style="{backgroundImage:'url(' + item.textBgImage + ')'}" :key="item.index"></swiper-item>
				</swiper>
			</view>
			<view class="mes_con">
				<swiper class="swiper grace-padding" autoplay="true" interval="2000" duration="500" circular="true">
					<swiper-item  v-for="(item,index) in homeData.homeMessage" :key="item.index" v-if='item.type ==0 '>
						<!-- type 业务类型0资讯,1评论,2点赞,3系统消息 -->						
						<navigator :url="'/pages/news/news-detail?uid='+item.userId" hover-class="" >
							<view class="mes_text grace-padding grace-space-between">
								<image :src="item.headImg"></image>
								<view class="mes_txt">{{item.title}}你要是不喝鲜奶和酸奶，也不吃乳酪，那么其他的补钙来源就很重要了</view>
								<view class="mes_btn h19clubwx" v-if='item.type ==0 '>&#xe601;</view>
							</view>
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<!-- <view class="nav grace-rows">
				<view class="navigator-hover">推荐</view>
				<navigator hover-class="" open-type="switchTab" url="/pages/activity/activity_list">活动</navigator>
			</view> -->
			<view class="homeTitle grace-padding grace-space-between">
				<view class="fontWeight">精品活动<span class="smtitle">POPULAR COMMUNITY</span></view>
				<navigator url="/pages/activity/activity_list" open-type="switchTab" class="btn_more gray f12">MORE</navigator>
			</view>
			<view
			:class="['greatAct grace-padding grace-imgitems grace-rows ', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" >
				<view 
				class='grace-items'
				v-for="(item, index) in homeData.activity" 
				:key="index"
				@tap="actNavigatorUrl(item.id)"
				>
					<view>
						<image :src="item.imageUrl"></image>
					</view>
					<view class='act_title grace-imgitems-text' >{{item.title}}</view>
					<view class='act_price grace-imgitems-more'>¥<text class="font_DIN">{{item.price}}</text></view>
				</view>
			</view>
			<view class="center_ban grace-padding" v-if="homeData.ad">
				<navigator :url="homeData.ad.url"  open-type="navigate" hover-class=''>
					<image :src="homeData.ad.image"></image>
				</navigator>
			</view>
			<!-- <view class="center_ban grace-padding" v-if="homeData.ad">
				<navigator url="homeData.ad.url" :style="{backgroundImage:'url(' + homeData.ad.image + ')'}" open-type="navigate" hover-class=''>
				</navigator>
			</view> -->
			<!--
			<view class="homeTitle grace-padding grace-space-between">
				<view class="fontWeight">热门社群<span class="smtitle">POPULAR COMMUNITY</span></view>
				<navigator class="btn_more gray f12" url="../homesearch/homesearch">MORE</navigator>
			</view>
			<view class="clubs">
				<scroll-view class="grace-scroll-x" scroll-x="true">
					<view class="grace-items">
						<image src="https://img1.bitautoimg.com/autoalbum/files/20190121/693/20190121191101111143154_8.jpg"></image>
						<view class="club_title">19号公路俱乐部</view>
						<view class="clubs_score">5分·极度推荐</view>
					</view>
				</scroll-view>
			</view> -->
		</view>
</view>
</template>

<script>
	import api from "@/common/api";
	import topNavBar from '@/components/top-nav-bar/'
	export default {
		components: {
			topNavBar
		},
		data() {
			return {
				navBarTitleText:'19club',//状态栏标题
				contentMarginTop:global.u.contentMarginTop,//状态栏高度
				graceSkeleton:'ing',//骨架屏开关
				navBarHeight:60,
				homeData:{
					carousel:[],
				},
				currentNum:0
			}
		},
		onLoad() {
			this.getHomeDataHandler();
		},
		onShow() {
		},
		methods: {
			//活动跳转
			actNavigatorUrl(act_id){				
				uni.navigateTo({
					url:"/pages/activity/activity_detail?uid="+act_id
				})
			},
			//获取首页推荐内容
			async getHomeDataHandler(){
				const _self = this;
				let _a = await api.home.getHomeData();
				if(_a){
					_self.homeData = _a.data;
					_self.graceSkeleton = 'end'
				}
			},
			//获取首页轮播图当前项下标
			homeBannerChangeCurrentNum(e) {
				//console.log(e.detail.current,'eeeeeeeeeeeee');	
				this.currentNum = e.detail.current;
			}
		},
		onPullDownRefresh(){
			this.getHomeDataHandler();
		}
	}
</script>
<style lang="scss">
	.homeTitle {
		color: #383843;
		padding-bottom: 13px;
		font-size: 14px;
		font-weight: bold;
		align-items: center;

		.smtitle {
			padding-left: 12px;
			font-family: 'DINCondensedC';
		}
	}
	.nav {
		width: 100%;
		height: 48px;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
		navigator {
			color: #383843;
			opacity: 0.5;
			font-size: 16px;
			margin-right: 24px;
			
		}
	    view{
			color: #383843;
			opacity: 0.5;
			font-size: 16px;
			margin-right: 24px;
		}
		.navigator-hover {
			opacity: 1;
			font-weight: bold;
			background: none;
			&:after {
				content: "";
				width: 12px;
				height: 2px;
				overflow: hidden;
				background: #383843;
				left: 10px;
				bottom: -2px;
				border-radius: 3px;
				position: relative;
				display: block; 
				clear: both; 
			}
		}
	}
	.swiper_con {
		position: relative;

		.nav {
			position: absolute;
			top: 10px;
			width: 90%;
			left: 5%;
			z-index: 10;
			navigator {
				color: #ffffff;
				font-size: 16px;
				margin-right: 24px;
			}

			.navigator-hover {
				opacity: 1;
				background: none;
				&:after {
					content: "";
					width: 16px;
					height: 2px;
					overflow: hidden;
					background: #fff;
					left: 8px;
					border-radius: 2px;
					position: relative;
					display: block; //设为块状元素
					clear: both; //用这个属性来清除浮动
				}
			}
		}


		.swiper {
			width: 100%;
			height: 750upx;
			color: #fff;
			background-size: 100% 100%;
			background-position: left top;
			background-repeat: no-repeat;
			swiper-item {
				background-size: 100% 100%;
				background-position: left top;
				background-repeat: no-repeat;
			}

			.wx-swiper-dot {
				width: 100upx;
				display: inline-flex;
				height: 7upx;
				margin: 0;
				padding: 0;
				justify-content: space-between;
				border-radius: 1px;
			}

			.wx-swiper-dots.wx-swiper-dots-horizontal {
				bottom: 75px;
				margin: 0;
			}
		}
	}

	.swiper_con .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
	}
	//通知滚动
	.mes_con {
		width: 100%;
		position: relative;
		height: 62px;

		.swiper {
			margin: 0 5%;
			padding: 0;
			height: 90px;
			position: absolute;
			top: -62px;
			background: #fff;
			color: #4A516E;
			border-radius: 4px;
			-webkit-box-shadow: 0px 2px 7px 1px #ccc;
			box-shadow: 0px 2px 7px 1px #ccc;

			swiper-item .mes_text {
				align-items: center;
				padding: 14px;

				.mes_txt {
					flex: 1;
					font-size: 16px;
					color: #4A516E;
					text-align: left;
					padding: 0 10px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					font-weight: bold;
				}
				.mes_btn{
					navigator{
						font-size: 16px;
					}
				}
				image {
					width: 50px;
					height: 63px;
					border-radius: 4px
				}
			}

		}
	}
	.greatAct {
		padding-top: 5px;
		padding-bottom: 5px;
		min-height:150px;
		.grace-items {
			flex: 1;
			color: #363B4F;
			image{
				border-radius: 4px;
			}
			&:first-child {
				margin-right: 15px;
			}

			.act_title {
				font-size: 14px;
				padding: 3px 0 1px 0;
				width: 90%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.act_price {
				font-size: 20px;
				font-weight: bold;
				justify-content: flex-start;
			}
		}

	}

	.center_ban {
		margin: 40px 0;
		navigator{
			background-repeat: no-repeat;
			background-size: 100% 100%;
			height: 88px;
			border-radius: 4px;
		}
		image {
			width: 100%;
			height: 88px;
			border-radius: 4px;
		}
	}

	.clubs {
		margin-bottom: 60px;

		.grace-scroll-x {
			.grace-items {
				width: 120px;
				height: 170px;
				display: inline-block;
				margin-right: 16px;
				image {
					width: 120px;
					height: 120px;
					border-radius: 4px;
				}

				&:first-child {
					padding-left: 5%;
				}

				&:last-child {
					padding-right: 5%;
					margin-right: 0;
				}

				.club_title {
					font-size: 14px;
					color: #383843;
				}

				.clubs_score {
					font-size: 12px;
					color: #989898;
				}
			}
		}
	}
</style>