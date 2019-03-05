<template>
	<view>
		<!-- <view class="search-box">
			<input placeholder="中文/拼音/首字母" class="search-input" @input='bindSarchInput' placeholder-class='search-input-placeholder' />
		</view>
		<view v-if="currentCity !==''" class="currentCityTitle">当前 ： {{currentCity}}</view> -->
		<view class='a-z'>
			<view v-for="(item, index) in cityAZ" :key="index">
				<view :data-id="item.cityName" @tap='bindAZ'>{{item.cityName}}</view>
			</view>
		</view>
		<view class='city-item-content' v-if="showCityResult" >
			<view v-for="(item, index) in realResult" :key="index" v-if="item" >
				<view 
					v-if='item.id'
					class="city-item" 
					:data-cityname="item.name" 
					:data-citycode="item.id" 
					@tap='citySelected'>{{item.name}}</view>
				<view 
					v-else
					class="city-item-A-Z" 
					:data-cityname="item.name" 
					@tap='citySelected'>{{item.name}}</view>
			</view> 
		</view>
	</view>
</template>
<style>
	.currentCityTitle {
		width: 95%;
		height: 90upx;
		line-height: 90upx;
		font-size: 30upx;
		padding-left: 5%;
		background-color: #fff;
		margin-top: 110upx;
		font-weight: 700;
	}

	.currentCity {
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		font-size: 30upx;
		padding-left: 5%;
		background-color: #fff;
	}

	.a-z {
		width: 30upx;
		position: fixed;
		top: 130upx;
		text-align: center;
		right: 5upx;
		color: #3F51B5;
	}

	.a-z view {
		font-size: 26upx;
	}

	.city-item-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
	}

	.city-item {
		background: #fff;
		width: 90%;
		padding-left: 5%;
		height: 90upx;
		font-size: 30upx;
		line-height: 100upx;
		border-bottom: 1upx solid #d1d1d1;
	}

	.city-item-A-Z {
		width: 95%;
		height: 90upx;
		line-height: 90upx;
		font-size: 30upx;
		padding-left: 5%;
		background-color: #f6f6f6;
		color: #999;
	}

	.search-box {
		top: 0;
		position: fixed;
		width: 100%;
		background: #eee;
		height: 110upx;
		font-size: 30upx;
		border-bottom: 1upx solid #d1d1d1;
	}

	.search-input {
		height: 70upx;
		line-height: 60upx;
		width: 80%;
		margin-left: 7.5%;
		border-radius: 20upx;
		background: #fff;
		margin-top: 20upx;
		padding-left: 5%;
		font-size: 26upx;
	}

	.search-input-placeholder {
		text-align: center;
	}
</style>
<script>
	let _this;
	import api from "@/common/api"; 
 	var pixelRatio = 1;
	export default {
		onLoad: function () {
			_this = this
			for(var i=0;i<26;i++){  
				this.A2Z.push(String.fromCharCode(65+i));//输出A-Z  26个大写字母  
			}  
			// if (this.cityResults == null) {
			// 	this.cityResults = this.citys;
			// }
			var winInfo = wx.getSystemInfo({
				success: function (res) {
					pixelRatio = 750 / res.windowWidth;
				}
			});
			if(this.realResult.length === 0){
				this.getCityDatahandler()
			}
			// 暂无查询城市的JAVA接口 临时关闭
			// this.getLocationHanlder()
		},
		onPageScroll: function (e) {
			this.scrollNow = e.scrollTop;
		},
		methods: {
			//获取城市列表
			async getCityDatahandler(){
				let _b = await api.common.getCityList()
				if(_b.status === 200){
					//去除城市名称中的“市”
					let _res =[]
					for(let i=0; i<this.A2Z.length; i++){						
						var _text = [
							{
								name : this.A2Z[i]
							}
						]
						_res = _res.concat(_text.concat(_b.data[this.A2Z[i]]))
					}
					// 因为有name为空的记录 所有出现问题 undefined
					console.dir(_res);
					this.realResult = _res
					this.showCityResult = true
				}
			},
			bindAZ: function (e) {
				var currentCityName = e.currentTarget.dataset.id
				var that = this;
				if (that.scrollAZ == null) {
					uni.createSelectorQuery().selectAll('.city-item-A-Z').fields({
						dataset: true,
						size: true,
						rect: true
					}, function (res) {		
						console.log(res,'resresresres')			
						console.log(currentCityName);
							
						res.forEach(function (item) {
							if (currentCityName == item.dataset.cityname) {
								uni.pageScrollTo({
									scrollTop: item.top + that.scrollNow - 100 / pixelRatio,
									duration: 0
								})
							}
						})
					}).exec();
				} else {
					that.scrollAZ.forEach(function (re) {
						if (currentCityName == re.dataset.cityname) {
							uni.pageScrollTo({
								scrollTop: re.top + that.scrollNow - 100 / pixelRatio,
								duration: 0
							})
						}
					})
				}
			},
			//选择城市
			citySelected: function (e) {				
				var cityNameTemp = e.currentTarget.dataset.cityname;
				let _code = '';
				let _name = '';
				//匹配相对应的城市名称
				for(let i=0; i<this.realResult.length; i++){
					if(this.realResult[i] && this.realResult[i].name == cityNameTemp){
						_code = this.realResult[i].id
						_name = this.realResult[i].name
					}
				}
				if(_code !==''){
					this.currentCity = cityNameTemp;
					// 设置全局对象
					global.searchCity = {
						code:_code,
						name:_name
					}
				}else{
					uni.showToast({
						title: "抱歉，相关地区的暂无数据！",
						icon: 'none',
						content: '没有数据了 ^_^'
					});
				}
				setTimeout(()=>{
					uni.navigateBack('-1')
				},800)				
			},
			//授权 获取用户经纬度 暂无JAVA API
			getLocationHanlder: function () {
				// let mdcontend = await service.getMarkdownFileContent(documentUrl);
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
		},
		data: {
			showCityResult:false,
			realResult:[],
			currentCity: "",
			scrollAZ: null,
			scrollNow: 0,
			cityResults: null,
			systemCity:[],
			A2Z:[],
			cityAZ: [
				{
					cityName: 'A'
				}, {
					cityName: 'B'
				}, {
					cityName: 'C'
				}, {
					cityName: 'D'
				}, {
					cityName: 'E'
				}, {
					cityName: 'F'
				}, {
					cityName: 'G'
				}, {
					cityName: 'H'
				}, {
					cityName: 'J'
				}, {
					cityName: 'K'
				}, {
					cityName: 'L'
				}, {
					cityName: 'M'
				}, {
					cityName: 'N'
				}, {
					cityName: 'P'
				}, {
					cityName: 'Q'
				}, {
					cityName: 'R'
				}, {
					cityName: 'S'
				}, {
					cityName: 'T'
				}, {
					cityName: 'W'
				}, {
					cityName: 'X'
				}, {
					cityName: 'Y'
				}, {
					cityName: 'Z'
				}
			],
		}
	}
</script>