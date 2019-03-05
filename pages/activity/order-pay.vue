<template>
<view>
  <top-nav-bar :hasBackGroundStyle='false'>
    <view class='btn-group-wp'>
      <navigator class="h19clubwx icon_back" open-type="navigateBack" hover-class="">&#xe625; </navigator>
    </view>
  </top-nav-bar>
  <view class='order-pay-wp' :style="{ marginTop: contentMarginTop+15+'px'}">
    <view class="order-txt grace-padding">
      <view class="order-status">订单创建成功，请支付</view>
      <view class="order-smtitle">支付后尽享19精彩活动吧！</view>
    </view>
    <!-- 支付活动展示 -->
    <view class="order-act grace-flex">
      <view class="act-img"><image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551182684909&di=0f2ec1cc657d928df912ba325aef3603&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20131112%2F12-011650_935.jpg"></image></view>
      <view class="act-info">
        <view class="info-title">19盛典·急速梦想</view>
        <view class="info-time">四川成都 12/05-12/15</view>
        <view class="info-price">¥<text class="font_DIN">550.00</text></view>
      </view>
      <view class="pay-status">支付中...</view>
    </view>
    <!-- 支付方式 -->
    <!-- <view class="pay-way"></view> -->
    <!-- 积分优惠券 -->
    <!-- <view class="my-coupon"></view> -->
    <!-- 确认支付 -->
    <view class="pay-btn grace-space-between grace-padding">
			<view class="pay-btn-left grace-rows">
				¥
				<view class="f32 grace-blod font_DIN">9000</view>
			</view>
			<view><navigator hover-class="" open-type="navigate" url="/pages/activity/pay-success">确认支付</navigator></view>
    </view>
  </view>
</view>
</template>
<script>
import topNavBar from '@/components/top-nav-bar/'
export default {
  name: '支付',
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
.order-pay-wp{
  /* 订单status文字显示 */
  .order-txt{
    .order-status{
      font-size: 28px;
      color: #474754;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .order-smtitle{
      font-size: 14px;
      color: #989898;
    }
  }
  /* 参加活动展示 */
  .order-act{
    width: 90%;
    margin: 25px auto;
    background: #F5F5F5;
    padding:10px 0;
    border-radius: 4px;
    align-items: center;
    .act-img{
      image{
        border-radius: 4px;
        width: 63px;
        height: 84px;
        margin: 0 10px;
      }
    }
    .act-info{
      flex: 3;
      justify-content: space-between;
      .info-title{
        font-size: 16px;
        color: #383843;
        font-weight: bold;
      }
      .info-time{
        font-size: 12px;
        color: #989898;
        margin-bottom: 7px;
      }
      .info-price{
        font-size: 20px;
      }
    }
    .pay-status{
      flex: 1;
      font-size: 14px;
      color: #989898;
    }
  }
  /* 确认支付按钮 */
  .pay-btn {
		z-index:3;
		align-items: center;
		padding: 10px 5%;
		position: fixed;
		left: 0;
		bottom: 0;
		.pay-btn-left {
			color: #4a516e;
			align-items: baseline;
			font-weight: bold;
		}
		navigator {
			background: #05A080;
			padding: 7px 25px;
			font-size: 16px;
			color: #fff;
			border-radius: 4px;
		}
	}
}
</style>