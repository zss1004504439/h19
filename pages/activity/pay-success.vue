<template>
<view>
  <top-nav-bar :hasBackGroundStyle='false'>
    <view class='btn-group-wp'>
      <navigator class="h19clubwx icon_back" open-type="navigateBack" hover-class="">&#xe625; </navigator>
    </view>
  </top-nav-bar>
  <view class='pay-success-wp' :style="{ marginTop: contentMarginTop+15+'px'}">
    <view class="success-txt grace-padding">
      <view class="success-icon"><image mode="widthFix" src="http://pnmjrkx8g.bkt.clouddn.com/pay-success-icon.png"></image></view>
      <view class="success-status">支付成功！</view>
      <view class="success-smtitle">已支付成功，马上尽享19急速之旅</view>
    </view>
    <view class="nav-url grace-padding">
      <navigator url="/pages/activity/order" hover-class="" >查看订单</navigator>
      <navigator class="btn" url="/pages/home/index" open-type="switchTab" hover-class="" >返回首页</navigator>
    </view>
    <image class="success-bottom" mode="widthFix" src="http://pnmjrkx8g.bkt.clouddn.com/pay-success-ban.png"></image>
  </view>
</view>
</template>
<script>
import topNavBar from '@/components/top-nav-bar/'
export default {
  name: '支付成功',
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
//订单支付页面
.pay-success-wp{
  /* 订单status文字显示 */
  .success-txt{
    padding-top: 30px;
    text-align: center;
    .success-icon{
      font-size: 50px;
      image{
        width: 50%;
      }
    }
    .success-status{
      font-size: 28px;
      color: #474754;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .success-smtitle{
      font-size: 14px;
      color: #383843;
      margin-bottom: 35px;
    }
  }
  .nav-url{
    navigator{
      width: 100%;
      padding: 10px 0;
      text-align: center;
      font-size: 16px;
      color: #383843;
      border-radius: 4px;
      margin-bottom: 18px;
      border:1px solid #383843;
    }
    .btn{
      color: #ffffff;
      background: #383843;
    }
  }
  .success-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>