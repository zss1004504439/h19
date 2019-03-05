<template>
<view>
  <top-nav-bar :hasBackGroundStyle='false'>
    <view class='btn-group-wp'>
      <navigator class="h19clubwx icon_back" open-type="navigateBack" hover-class="" style="color:#fff;">&#xe625; </navigator>
    </view>
  </top-nav-bar>
  <view class='join-wp' :style="{ marginTop: contentMarginTop+15+'px'}">
    <view class="club_name">
      <view>「北京站」</view>
      <view>19盛典·极速梦想</view>
    </view>
    <view class="join_info">
      <!-- club -->
      <view class="club">
        <view class="club_img">
          <image src="https://img1.bitautoimg.com/autoalbum/files/20190121/693/20190121191101111143154_8.jpg"></image>
        </view>
        <view class="club_info">
          <view class="info grace-flex">
            <view class="label">活动时间</view>
            <view class="info_right">2019/08/05 21:00</view>
          </view>
          <view class="info grace-flex">
            <view class="label">报名时间</view>
            <view class="info_right">2019/08/05 - 2019/08/05</view>
          </view>
          <view class="info grace-flex">
            <view class="label">活动地点</view>
            <view class="info_right">四川 成都 高新区 19号公 路19号俱</view>
          </view>
        </view>
      </view>
      <!-- 我的信息 -->
      <view class="my_info grace-flex">
        <view class="info">
            <view class="label">参与人</view>
            <view class="info_label">卢宇</view>
        </view>
        <view class="info">
            <view class="label">性别</view>
            <view class="info_label">男</view>
        </view>
        <view class="info">
            <view class="label">联系电话</view>
            <view class="info_label">1861234937</view>
            <navigator hover-class="">修改</navigator>
        </view>
      </view>
      <!-- 支付按钮 -->
      <view class="join_btn">  
        <navigator hover-class="" open-type="navigate" url="/pages/activity/order-pay">立即前往支付</navigator>
      </view>
    </view>    
  </view>
</view>
</template>
<script>
var _this;
var graceChecker = require("../../graceUI/graceChecker.js");
import api from "@/common/api";
import topNavBar from '@/components/top-nav-bar/';
export default {
	name: '立即报名',
	components: {
		topNavBar
	},
	data() {
		return {
      contentMarginTop:global.u.contentMarginTop,//状态栏高度
      uid:'',
      joinData:{},
		}
  },
  onLoad(options){
    this.uid = options.uid;
    //console.log(options,"optionsoptionsoptions");
    this.postActivityJoinDataHandle();
  },
  methods:{
    	//获取活动当前用户加入接口
      async postActivityJoinDataHandle(){
        var _parmas = {
              aid: this.uid,
              isPay : 1,
            }
        let _b = await api.activity.postActivityJoinData(_parmas);
        console.log(_b,"JoinDataHandleJoinDataHandleJoinDataHandle")
        //this.joinData = _b.data.data;
      },
  }
}
</script>
<style lang='scss'>
page{background: #7D7D8F;height:100%;}
//活动报名
.join-wp{
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin-top: 67px;
  background: #fff;
  height: 100%;
  width: 87.2%;
  margin: 0 auto;
  .club_name{
    flex: 1;
    background: url("http://pnmjrkx8g.bkt.clouddn.com/act_joinbg.jpg") no-repeat;
    background-size: 100% 100%;
    height: 195px;
    view{
      color: #383843;
      font-size: 24px;
      margin-left: 24px;
      font-weight: bold;
      &:first-child{
        padding-top: 54px;
        margin-bottom: 7px;
      }
    }
  }
  .join_info{
    flex: 1;
    padding-bottom: 45px;
    .club{
      display: flex;
      padding: 20px 5%;
      .club_img{
        image{
          width: 72px;
          height: 92px;
          border-radius: 4px;
        }
      }
      .club_info{
        flex: 1;
        .info{
          align-items: baseline;
          .label{
            font-size: 12px;
            padding: 6px 12px;
          }
          .info_right{
            flex: 1;
            font-size: 12px;
          }
        }
      }
    }
    .my_info{
      padding: 50px 5%;
      .info{
        flex: 1;
        .label{
          font-size: 12px;
          color: #989898;
        }
        .info_label{
          font-size: 16px;
          color: #383843;
          margin: 10px 0;
        }
        navigator{
          font-size: 12px;
        }
      }
    }
    .join_btn{
      text-align: center;
      background: #08A181;
      font-size: 14px;
      color: #ffffff;
      width: 43%;
      border-radius: 4px;
      margin: 0 auto;
      padding:7px 0;

    }
  } 
}
</style>