<template>
<view>
  <top-nav-bar :hasBackGroundStyle='false'>
    <view class='btn-group-wp'>
      <navigator class="h19clubwx icon_back" open-type="navigateBack" hover-class="">&#xe625; </navigator>
    </view>
  </top-nav-bar>
  <view class='revise-info-wp' :style="{ marginTop: contentMarginTop+15+'px'}">
    <view class="club_name">
      <view>「北京站」</view>
      <view>19盛典·极速梦想</view>
    </view>
</view>
</template>

<script>
var _this;
var graceChecker = require("../../graceUI/graceChecker.js");

import topNavBar from '@/components/top-nav-bar/';
export default {
	name: '修改报名信息',
	components: {
		topNavBar
	},
	data() {
		return {
			contentMarginTop:global.u.contentMarginTop,//状态栏高度
		}
  }
}
</script>

<style lang='scss'>
//活动修改信息
.revise-info-wp{

}
</style>