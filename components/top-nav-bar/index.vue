<template>
  <!-- 导航栏 -->
  <view 
    :class="['topNavBar-wp', hasBackGroundStyle ? 'BackGroundStyle' : '']" 
    :style="{ height: statusBarHeight+titleBarHeight+ 'px' }" >
    <view class='inner-wp' :style="{ marginTop: statusBarHeight*2+ 'px' }">
        <slot></slot>
        <view class='title-box'>{{titleText}}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'topNavBar',
  props: {
    titleText: {
      type: String,
      default: '',
    },
    hasBackGroundStyle:{
      type: Boolean,
      default:true
    }
  },
  data() {
    return { 
      statusBarHeight : 0,//状态栏高度
      titleBarHeight : 0,//导航栏高度
    }
  },
  methods: {},
  onLoad(){
    this.statusBarHeight = global.u.statusBarHeight
    this.titleBarHeight = global.u.titleBarHeight
  },
};
</script>
<style lang='scss'>
.BackGroundStyle{
  background: #ffffff;
}
.topNavBar-wp{
  position: fixed;
  width: 100%;
  top: 0;
  color: #000;
  z-index: 9999999;
  .inner-wp{
    text-align: center;
    width: 100%;
    position: absolute;
    overflow: hidden;
    left: 0;
    bottom: 0;
    height: 35px;
    line-height: 35px;
    padding:5px 0;
    display: flex;
    flex-flow: row;
    justify-content: start;
    align-items: center;
  }
  .title-box{
    flex:1;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #2c2b2b;
    font-weight: 600;
  }
  .btn-group-wp {
    height: 100%;
    position: absolute;
    left:0;
    top: 0;
    text-align: left;
    display: flex;
    align-items: center;
    width: 140rpx;
    justify-content:center;
    z-index: 999;
    box-sizing: border-box;
    // border:1px solid #F5F5F5;
    // background: #ffffff;
    color:#363B4F;
    // border-radius: 20px;
    .icon_back{
      color: #363B4F; 
				padding-right: 25px;
      font-size: 20px;
    }
    .icon_sousuo{
      color: #363B4F;
      font-size: 14px;
    }
    text{
      color: #989898;
      vertical-align: middle;
    } 
  }
}  
</style>
