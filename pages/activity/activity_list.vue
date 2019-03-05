<template>
	<view>
		<top-nav-bar :titleText='navBarTitleText'>
			<view class='btn-group-wp'>
				<!-- <navigator class="h19clubwx" open-type="navigateBack" hover-class="">&#xe625;</navigator>
				<text class="h19clubwx">&#xe600;</text> -->
				<navigator url="/pages/search/search" hover-class="" class="h19clubwx icon_sousuo">&#xe605; 搜索</navigator>
			</view>
		</top-nav-bar>
		<view class="home" :style="{ marginTop: contentMarginTop+'px'}">
		<!-- 	<view class="swiper_con">
				<view class="nav grace-rows">
					<navigator url="/pages/home/index">推荐</navigator>
					<navigator class="navigator-hover">活动</navigator>
				</view>
				<navigator class="btn_sousuo" url="/pages/homesearch/homesearch">搜索...</navigator>
				<swiper class="swiper" 
					duration="500" 
					interval="2000"
					autoplay="true" 
					circular="true" 
					>
					<swiper-item>
						<image src="http://www.sc.xinhuanet.com/titlepic/112323/1123230743_1533546793447_title0h.jpg"></image>
					</swiper-item>
					<swiper-item>
						<image src="https://img1.bitautoimg.com/autoalbum/files/20190121/693/20190121191101111143154_8.jpg"></image>
					</swiper-item>
					<swiper-item>
						<image src="http://k.zol-img.com.cn/dcbbs/24938/a24937318_01000.jpg"></image>
					</swiper-item>
				</swiper>
			</view> -->
			<view class="filter_con">
				<view class="grace-filter">
					<view class="items" @tap='choseCityHandler'>
						{{filterData.searchCity.name}}<text class="h19clubwx">&#xe689;</text>
					</view>
					<text class="h19clubwx">&#xe600;</text>
					<view class="items" @tap='changeTimeSort'>
						{{filterData.sortName}}<text class="h19clubwx">&#xe689;</text>
					</view>
				</view>
			</view>	
			<view :class="['greatAct grace-padding grace-imgitems grace-rows', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">
				<view class="grace-items"
				v-for="(item, index) in searchResult" 
				:key="item.id"
				@tap="navigateToDetail(item.id)">
					<image :src="item.imageUrl"></image>
					<view class="act_title grace-imgitems-text">{{item.title}}</view>
					<view class="act_price grace-imgitems-more">¥{{item.price}}</view>
				</view>
			</view>
			<!-- <view else class='nodata-box'>
				暂无数据
			</view> -->
			<graceLoading :loadingType="loadingType" v-if='searchResult.length > 0'></graceLoading>
		</view>
	</view>
</template>

<script>
  import api from "@/common/api";
	import graceLoading from '@/graceUI/components/graceLoading.vue';
	
	import topNavBar from '@/components/top-nav-bar/';
	export default {
		name: '活动列表',
		components: {
			topNavBar,
			graceLoading
		},
		data() {
			return {
				navBarTitleText:'活动列表',//状态栏标题
				contentMarginTop:global.u.contentMarginTop,//状态栏高度

				graceSkeleton:'ing',//骨架屏开关
				loadingType : 0,//loading状态
				//筛选结果页面
				searchResult: [],
				//筛选条件
				filterData:{
					searchCity : {
						code:'',
						name:'请选择城市'
					},
					sortName:'时间正序'
				},
				//查询条件
				queryForm:{
					page:1,//	是	int	当前页
					pageSize:7,//	是	int	每页条数
					status:1,//	否	int	活动状态1:正在报名,2:进行中,3:报名已满,4:已结束’
					cityId:"",//	否	int	城市id
					sort:"asc",//	否	String	正序 asc 倒序desc
				}
			}
		},
		//下拉
		onPullDownRefresh(){
			this.getActivityDataHandler();
		},
		//上拉
		onReachBottom(){
			//避免多次触发
			if (this.loadingType == 1){return ;}
			this.loadMoreFunc();
		},
		onLoad() {
			this.getActivityDataHandler()
		},
		onShow(){
			this.upDataFilterHandler()
		},
		methods: {
			//加载更多
			async loadMoreFunc(){
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				if (this.loadingType !== 0 ) {
					return;
				}
				this.loadingType = 1;
				this.queryForm.page = this.queryForm.page + 1;
				//配置请求参数
				let _query = {};
				if(this.filterData.searchCity.code !== ''){
					_query.cityId = this.filterData.searchCity.code
				}
				_query.page = this.queryForm.page;
				_query.pageSize= this.queryForm.pageSize;
				_query.status= this.queryForm.status;
				_query.sort=this.queryForm.sort;

				let _b = await api.activity.getActivityData(_query)
				if(_b.data.list.length !== this.queryForm.pageSize){
					this.searchResult = this.searchResult.concat(_b.data.list)
					//没有数据了，不能再次请求
					this.loadingType = 2;
				}else{
					//还有数据，可以继续page++ 请求
					this.searchResult = this.searchResult.concat(_b.data.list)
					this.loadingType = 0;
				}
			},
			//更新帅选，请求数据
			async getActivityDataHandler(){
				const _self = this;
				//配置请求参数
				let _query = {};
				if(this.filterData.searchCity.code !== ''){
					_query.cityId = this.filterData.searchCity.code
				}
				_query.page = this.queryForm.page;
				_query.pageSize= this.queryForm.pageSize;
				_query.status= this.queryForm.status;
				_query.sort=this.queryForm.sort;

				let _b = await api.activity.getActivityData(_query)
				this.graceSkeleton = 'end'
				if(_b.data.list.length !== this.queryForm.pageSize){
					console.log('if ...............');					
					//没有数据了，不能再次请求
					this.loadingType = 2;
					setTimeout(()=>{
						this.searchResult = _b.data.list
					},200)
				}else{
					console.log('else ................');
					//还有数据，可以继续page++ 请求
					this.loadingType = 0;
					setTimeout(()=>{
						this.searchResult = _b.data.list
					},200)
				}
			},
			//切换城市
			upDataFilterHandler(){
				//检测&获取全局对象属性，城市选择
				if(global.searchCity.name !== ''){
					if( global.searchCity.name !== this.filterData.searchCity.name ){
						this.filterData.searchCity.name = global.searchCity.name
						this.filterData.searchCity.code = global.searchCity.code
						this.searchResult = []
						this.getActivityDataHandler()
					}
				}else{
					console.log('检测&获取全局对象属性，城市选择,是空的！')
				}
			},
			//切换时间排序
			changeTimeSort : function(){
				if(this.filterData.sortName == '时间正序'){
					this.filterData.sortName = '时间倒序'
					this.queryForm.sort = "desc"
					this.queryForm.page = 1
					this.searchResult = []
					this.getActivityDataHandler()
				}else{
					this.filterData.sortName = '时间正序'
					this.queryForm.sort = "asc"
					this.queryForm.page = 1
					this.searchResult = []
					this.getActivityDataHandler()
				}
			},
			//跳转选择城市选择
			choseCityHandler(){
				uni.navigateTo({
					url:"/pages/city/index"
				})
			},
			//点击活动进详情
			navigateToDetail(id) {
				//console.log(id)
				uni.navigateTo({
					url: `/pages/activity/activity_detail?uid=${id}`
				});
			}
		}
	}
</script>
<style lang="scss">
	.swiper_con {
		position: relative;
		width: 100%;
		height: 135px;
		color: #fff;
		.swiper{
			swiper-item{
				image{
					width: 100%;
				}
			}
		}
		.nav {
			position: absolute;
			top: 10px;
			width: 90%;
			left: 5%;
			z-index: 10;
			navigator {
				color: #ffffff;
				opacity: 0.5;
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

		.btn_sousuo {
			position: absolute;
			top: 50px;
			width: 90%;
			left: 5%;
			z-index: 10;
			text-align: center;
			background: #F5F5F5;
			color: #989898;
			padding: 8px 0;
			font-size: 14px;
			border-radius: 20px;
		}
	}
	.filter_con{
		width: 100%;
		position: relative;
		text-align: center;
		.grace-filter{
			position: relative;
			border-bottom:none;
			align-items: center;
			text{
				color: #d8d8d8;
			}
			.items{
				width: 37%;
				color: #989898;
				font-size: 14px;
			/* 	&:after {
					content: "";
					width: 1px;
					height: 13px;
					overflow: hidden;
					background: #D8D8D8;
					right: -27%;
					top:35upx;
					position: relative;
					display: block; //设为块状元素
					clear: both; //用这个属性来清除浮动
				} */
				&:last-child{
					&:after{
						background: #ffffff;
					}
				}
				&:first-child{
					margin-left: 10%;
				}
			}
		}
	}
	.greatAct {
		.grace-items {
			color: #363B4F;
			width: 47%;
			margin-bottom: 24px;
			image{
				border-radius: 4px;
			}
			&:nth-child(2n-1) {
				padding-right: 1%;
			}
			&:nth-child(2n) {
				padding-left: 1%;
			}
			.act_title {
				font-size: 14px;
				padding: 6px 0 4px 0;
				width: 90%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.act_price {
				font-size: 20px;
				font-weight: bold;
			}
		}

	}
</style>