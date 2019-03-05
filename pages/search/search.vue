<template>
	<view class="seaechPage">
		<top-nav-bar :titleText='navBarTitleText'>
			<view class='btn-group-wp'>
				<navigator class="h19clubwx" open-type="navigateBack" hover-class="">&#xe625;</navigator>
			</view>
		</top-nav-bar>
		<!-- 搜索条 -->
		<view class="grace-padding" :style="{ marginTop: contentMarginTop+'px'}">
		
			<view class="grace-search">
			
			
				<view class="grace-search-in">
					<input type="search" @input="searchChange" @confirm="searchNow" :value="searchKey" placeholder="搜索..." />
					<view class="grace-search-icon grace-search-clear" @tap="clearKey" v-if="showCloseButton"></view>
					</view>
				</view>
			</view>
		
<view v-show="!showSeachReaults" >
		<!-- <view>
			暂无数据
		</view> -->
		<!-- 热门 -->
		<view class="grace-padding" >
			<view class="grace-title grace-nowrap grace-space-between">
			
				<view class="grace-h5">热门搜索<text class="smtitle font_DIN">POPULAR COMMUNITY</text></view>
			</view>
		
			<view class="grace-tips">
			
				<view v-for="(item,index) in hotSearchWord" :key="index" @click="getHotSeachData(item)">{{item}}</view>
				</view>
		
		</view>
		<!-- 搜索历史 -->
		<view class="grace-padding" >
		
			<view class="grace-title grace-nowrap grace-space-between">
			
				<view class="grace-h5">我的历史<text class="smtitle font_DIN">POPULAR COMMUNITY</text></view>
			
				<view class="h19clubwx">&#xe63e; 清空</view>
				</view>
		
			<view class="grace-tips">
			
				<view>豪车</view>
			
				<view>急速之旅</view>
			
				<view>兰博基尼</view>
				<view>法拉利</view>
			
				<view>北京名车发布会</view>
			
				<view>上海兰博基尼酒友会</view>
			
			</view>
			</view>
		
		
		
</view>
	<view class='search-reasult-wp' v-if="showSeachReaults">
			<view class="grace-tab">
				<scroll-view class="grace-tab-title" 
				scroll-x="true" 
				:scroll-into-view="titleShowId">
					<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index" @tap="tabChange" :key="index">{{tab.name}}</view>
				</scroll-view>
				<swiper
					:current="tabCurrentIndex" 
					:style="{height:swiperHeight+'px'}"
					@change="swiperChange"
					class='grace-tab-swiper'
				>
					<swiper-item v-for="(it,i) in searchResults" :key="i">
						<scroll-view 
						:style="{height:swiperHeight+'px'}"
						class="grace-news-list"
						scroll-y="true"
						@scrolltolower='loadMoreFunc'>
						<view v-if='it.count>0'>
							<view class="list_item_style" v-for="(item,index) in searchResults[i].list" :key="index" :data-id="item.uid||item.id" :data-type="i" @tap='gotoDetail'>
								<view class="grace-news-list-items grace-padding">
									<image :src="item.image||item.coverImage" class="grace-news-list-img grace-list-imgs-l" mode="widthFix"></image>
									<view class="grace-news-list-title">
										<view class="grace-news-list-title-main title-box">{{item.title}}</view>
										<view class="grace-news-list-title-main desc-box">{{item.desc}}</view>
										<view class="grace-news-list-title-main time-box">{{item.time}}  阅读：{{item.readCount}}次</view>
										
									</view>
								</view>
							</view>
						</view>
						<view v-else class="noData-box">
							暂无数据
						</view>
						<graceLoading 
							v-if="searchResults[tabCurrentIndex].list.length > 0" 
							:loadingType="searchResults[tabCurrentIndex].loadingType" ></graceLoading>
						</scroll-view>
					</swiper-item>
					
				</swiper>
			</view>
		</view>
	</view>
</template>
<script>
	import api from '@/common/api'
	import graceLoading from '@/graceUI/components/graceLoading.vue';
	import {cloneObject} from "@/common/util"
	var _this;
	
	import topNavBar from '@/components/top-nav-bar/';
	export default {
		name: '搜索',
		components: {
			topNavBar,
			graceLoading
		},
		data() {
			return {
				navBarTitleText:'搜索',//状态栏标题
				contentMarginTop:global.u.contentMarginTop,//状态栏高度
				searchKey: "",
				showCloseButton: false,
				hotSearchWord: {},
				showSeachReaults: false,
				searchResults:[
					{
						loadingType:0,
						page:1,
						list:[]
					},
					{
						loadingType:0,
						page:1,
						list:[]
					}
				],
				tabs: [
					{
						name: '资讯'
					},
					{
						name: '活动'
					},
				],
				titleShowId : 'tabTag-0',
				tabCurrentIndex: 0,
				loadingType : 0,//loading状态
				swiperHeight : 200,
				pageSize: 10
			}
		},
		//下拉
		onPullDownRefresh(){
			// this.getActivityDataHandler();
		},
		onLoad() {
			_this = this
			console.log(this.searchResults[this.tabCurrentIndex].loadingType);
			// 计算屏幕高度
			var _self = this
			uni.getSystemInfo({
				success: function(res) {
					console.log(res,'systemInfo');
					_self.swiperHeight = res.screenHeight -73-35-44;
					// console.log(res.screenHeight, res.screenHeight - 180);
					console.log(res.screenHeight,res.statusBarHeight,_self.swiperHeight,180);
				}
			});
			this.getHotSearchDataHandler()
		},
		methods: {
			//加载更多
			async loadMoreFunc(){
				const _self = this;
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				var _type = this.tabCurrentIndex				
				if (this.searchResults[_type].loadingType !== 0 ) {
					return;
				}				
				this.searchResults[_type].loadingType = 1;
				this.searchResults[_type].page = this.searchResults[_type].page + 1;					
				//配置请求参数
				let _query = {};
				if (_self.searchKey !== '') {
					_query.name = _self.searchKey
				}
				_query.page = _self.searchResults[_type].page
				_query.pageSize = _self.pageSize;
				_query.type = Number(_type)+1;
				let _b = await api.home.getSearchData(_query);
				if(_b.data.list.length < this.pageSize){		
					//2-没有更多了	
					//数据不够，不能再次请求
					_self.searchResults[_type].loadingType = 2;
					_self.showSeachReaults = true	
				}
				else{
					//0-loading前
					//还有数据，可以继续请求
					_self.searchResults[_type].loadingType = 0;
					_self.showSeachReaults = true	
				}
				_self.searchResults[_type].list = _self.searchResults[_type].list.concat(_b.data.list);		

			},
			//搜索
			async getSearchDataHandler(type) {
				const _self = this;
				var _type = type || this.tabCurrentIndex
				this.clearAllSearchResults(this.tabCurrentIndex)
				this.searchResults[_type].searchKey = this.searchKey;//记录搜索关键词
				if (this.searchResults[_type].loadingType !== 0 ) {
					console.log("loadingType!==0 重复搜索重复搜索重复搜索重复搜索");
					//避免重复搜索
					return;
				}
				//配置请求 .......开始
				let _query = {};
				if (_self.searchKey !== '') {
					_query.name = _self.searchKey
				}
				if (_self.searchResults[_type].page){
					_query.page = _self.searchResults[_type].page
				}else{
					_query.page = 1
				}
				if(_type){
					_query.type = Number(_type)+1;
				}else{
					_query.type = 1;
				}
				_query.pageSize = _self.pageSize;
				let _b = await api.home.getSearchData(_query);			
				//配置请求 .......结束	
				if(_b.data.list.length < 0 ){
					console.log("没有数据");
					//没有数据
					_self.searchResults[_type].loadingType = 0;
					_self.showSeachReaults = false
				}else if(_b.data.list.length < this.pageSize){	
					console.log("没有更多了");
					//2-没有更多了	
					//数据不够，不能再次请求
					_self.searchResults[_type].loadingType = 2;
					_self.showSeachReaults = true	
				}else{
					console.log("还有数据，可以继续请求");
					//0-loading前
					//还有数据，可以继续请求
					_self.searchResults[_type].loadingType = 0;
					_self.showSeachReaults = true	
				}
				_self.searchResults[_type] = Object.assign(_self.searchResults[_type],_b.data)			
			},
			//跳转详情页
			gotoDetail(e){
				console.log(e.mp.currentTarget.dataset,'eeeeeeeeeee');
				let {id,type} = e.mp.currentTarget.dataset
				console.log(id,type);
				if(type===0){
					//资讯
					uni.navigateTo({
						url:`/pages/news/detail_news?aid=${id}`
					})
				}else if(type ===1){
					//活动
					uni.navigateTo({
						url:`/pages/activity/activity_detail?aid=${id}`
					})
				}
			},
			//获取搜索页面热门搜索内容
			async getHotSearchDataHandler() {
				const _self = this;
				let _a = await api.home.getHotSearchData();
				const _data = _a.data.split(",")
				console.log(_data, )
				_self.hotSearchWord = _data;
			},
			//点击hot搜索结果
			getHotSeachData(code) {
				//console.log(code);
				this.searchKey = code;
				this.getSearchDataHandler();
				this.seachCodeStatus = false;
			},
			//tab切换
			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '');
				this.tabCurrentIndex = index;
				if(this.searchResults[this.tabCurrentIndex].searchKey !== this.searchKey ){
					//没有重复搜索关键词
					this.getSearchDataHandler(index)
				}
				else if(this.searchResults[index].list.length >0){
					//目标分类已有数据
					return
				}else{
					console.log('未操作的逻辑');
				}
			},
			//swiper切换
			swiperChange: function(e) {
				console.log(e,'eeeeeeeeee');
				var index = e.detail.current;
				this.tabCurrentIndex = index;				
				if(this.searchResults[this.tabCurrentIndex].searchKey !== this.searchKey ){
					//没有重复搜索关键词
					this.getSearchDataHandler(index)
				}
				else if(this.searchResults[index].list.length >0){
					//目标分类已有数据
					return
				}else{
					console.log('未操作的逻辑');
				}
			},
			//变换搜索关键词 展示清空按钮
			searchChange: function(e) {
				var key = e.detail.value;
				this.searchKey = key;
				if (key.length >= 1) {
					this.showCloseButton = true;
				} else {
					this.showCloseButton = false;
				}
			},
			//清空搜索内容
			clearKey: function() {
				this.searchKey = "";
				console.log('clearKey');
				this.showCloseButton = false;
				this.showSeachReaults = false
				// this.searchResults[_type].loadingType = 0
				this.clearAllSearchResults()
			},
			//清除数据
			clearAllSearchResults:function(index){
				if(index){
					//清空目标分类的数据
					let _obj = this.searchResults[index]
					_obj.loadingType = 0
					_obj.list = []
					_obj.page = 1
					_obj.searchKey = ""
					delete _obj.count
					delete _obj.pageSize
					delete _obj.pageCount
				}else{
					//清空所有分类的数据
					this.searchResults.forEach(item => {
						item.loadingType = 0
						item.list = []
						item.page = 1
						delete item.searchKey
						delete item.count
						delete item.pageSize
						delete item.pageCount
					});
				}
			},
			//开始搜索 回车触发
			searchNow: function() {
				// this.showSeachReaults = false;
				// this.searchResults[this.tabCurrentIndex].loadingType = 0
				if(this.searchResults[this.tabCurrentIndex].searchKey == this.searchKey ){
					console.log("searchKey重复 搜索重复");
					//避免重复搜索
					return
				}else{
					this.getSearchDataHandler(this.tabCurrentIndex);
				}
			}
		},
		watch:{
			//观察搜索关键词
			searchKey:(keyValue)=>{
				if(keyValue.length >= 1){
					_this.showCloseButton = true;
				}else{
					_this.showCloseButton = false;
				}
			}
		}
	}
</script>
<style lang="scss">
	.seaechPage {
		.grace-search {
			padding-top:15px;
			.grace-search-in {
				height: 35px;
				padding-top: 0;
				padding-bottom: 0;
				position: relative;
				input {
					text-align: center;
					background: #F5F5F5;
					border-radius: 20px;
					padding: 3px 0;
				}
			}
			//清除按钮
			.grace-search-clear{
				position:absolute;
				right:25px;
				top:8px;
				z-index: 99;
			}
		}
		.grace-title {
			padding-top: 50px;
			.grace-h5 {
				color: #383843;
				font-size: 14px;
				font-weight: bold;
				align-items: center;
				.smtitle {
					padding-left: 12px;
				}
			}
			.h19clubwx {
				font-size: 14px;
				color: #C8C8C8;
			}
		}
		.grace-tips {
			view {
				font-size: 12px;
				background: #F5F5F5;
				color: #989898;
				padding: 3px 12px;
				border-radius: 4px;
				border: none;
				margin: 0 12px 12px 0;
			}
		}
		.search-reasult-wp {
			.list_item_style{
				padding:15px 0;
				.title-box{
					color:#333;
					font-size:14px;
					font-weight: bold;
				}
				.desc-box{
					color:#666;
					font-size:12px
				}
				.time-box{
					color:#999;
					font-size:11px
				}
			}
			.grace-tab {
				/* .grace-tab-title{
				} */
				.grace-tab-swiper {
					// height: 400px;
					.grace-news-list {
						.grace-news-list-items {
							image {
								width: 50px;
								border-radius: 4px;
							}
							.grace-news-list-title {
								.grace-news-list-title-main {
									// font-size: 14px;
									// color: #4A516E;
									// font-weight: bold;
								}
							}
						}
					}
				}
			}
		}
	}
	//没有数据
	.noData-box{
		padding:15px;
		// background: red;
	}
</style>