<template>
  <view class='my-index-wp' :style="{ marginTop: contentMarginTop+'px'}">
    <view class="my_info grace-padding">
      <view class="info_top grace-space-between">
        <view class="info_img"><image @tap='fn' v-model="widthFix" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551182684909&di=0f2ec1cc657d928df912ba325aef3603&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20131112%2F12-011650_935.jpg"></image></view>
        <view class="info_icon"><text @tap='fn' class="h19clubwx">&#xe6f9;</text><text class="h19clubwx">&#xe606;</text><text class="h19clubwx">&#xe7f9;</text></view>
      </view>
      <view class="info_name grace-space-between" @tap='fn'>
        <view class="name">杜拂焰</view>
        <view class="btn"><navigator>前往我的主页 ></navigator></view>
      </view>
      <view class="my_tips" @tap='fn'>
        <view class="tips"><text>90后宝藏女孩</text> 北京</view>
        <view class="tips_btn"><navigator hover-class="" open-type="navigate"># 选择你的爱好标签吧~</navigator></view>
      </view>
    </view>
    <view class="moreBtn grace-space-between grace-padding" @tap='fn'>
      <view class="grace-boxes">
          <view class="grace-boxes-img">
            <text class="h19clubwx">&#xe647;</text>
          </view>
          <view class="grace-boxes-text">活动</view>
      </view>
      <view class="grace-boxes">
          <view class="grace-boxes-img">
            <text class="h19clubwx">&#xefff2;</text>
          </view>
          <view class="grace-boxes-text">商城</view>
      </view>
      <view class="grace-boxes">
          <view class="grace-boxes-img">
            <text class="h19clubwx">&#xe643;</text>
          </view>
          <view class="grace-boxes-text">收藏</view>
      </view>
      <view class="grace-boxes">
          <view class="grace-boxes-img">
            <text class="h19clubwx">&#xe61c;</text>
          </view>
          <view class="grace-boxes-text">玩游戏</view>
      </view>
      <view class="grace-boxes">
          <view class="grace-boxes-img">
            <text class="h19clubwx">&#xe665;</text>
          </view>
          <view class="grace-boxes-text">合作</view>
      </view>
    </view>
    <view class="my_integral grace-space-between" @tap='fn'>
      <view class="integral">
        <text class="h19clubwx">&#xe62b;</text><text class="font_DIN">50</text>
      </view>
      <view class="join_club" @tap='fn'>
        <navigator hover-class="" open-type="navigate">
            俱乐部中心<br/>
            已加入 <text class="f12">2</text> 家    
            <view class="arrow_right">></view>     
        </navigator>
      </view>
      <view class="join_club" @tap='exit'>
        <text>退出登录</text>
      </view>
    </view>
    <view class="join_19club grace-space-between grace-padding">
      <view class="name">邀请你的好友加入19</view>
      <view class="btn"><navigator class="h19clubwx">&#xe736;</navigator></view>
    </view>
  </view>
</template>
<script>
import topNavBar from '@/components/top-nav-bar/';
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';
export default {
  data(){
    return{
			navBarTitleText:'我的',//状态栏标题
      contentMarginTop:global.u.contentMarginTop,//状态栏高度
      userInfo:{
        token:"",
        headImg:"",
        uid:"",
        nickName:"",
        vipLeve:"",
        vipExpires:"",
        isVVip:"",
        userSystem:"",
        VVipStatus:"",
        imToken:"",
        needPassword:"",
        havePassword:""
      }
    }
  },
  components :{
		topNavBar
  },
  computed: { 
    ...mapState(['hasLogin']),
    ...mapGetters({
      verifyToken: 'token/verifyToken'
    })
  },
  async onLoad() {
    console.log(this.verifyToken,'/////////////');
    console.log(this.$store,'sssssssssssss');
  },
  methods: {
    ...mapActions(['logout_action']),
    exit(){
      this.logout_action()      
    },
    fn(){
      console.log(this.verifyToken,'///////////ssss');
      
      console.log(this.$store,'sssssssssssss');
      if(!this.verifyToken){
        uni.navigateTo({
          url:`/pages/auth/login`
        })
      }else{
        uni.showToast({
          title:"功能模块正在开发中。。。",
          icon:"none"
        })
      }
    }
  }
}
</script>
<style lang='scss'>
//我的 首页
.my-index-wp{
  .my_info{
    .info_top{
      padding-top: 13px;
      align-items: center;
      .info_img{
        image{
          width: 140px;
          height: 140px;
          border-radius: 10px;
        }
      }
      .info_icon{
        text{
          margin-left: 20px;
          color: #4A516E;
        }
      }
    }
    .info_name{
      align-items: center;
      padding-top: 25px;
      .name{
        font-size: 32px;
        color: #383843;
      }
      .btn{
        navigator{
          color: #989898;
          font-size: 12px;
        }
      }
    }
    .my_tips{
      padding: 20px 0 40px 0;
      .tips{
        font-size: 12px;
        color: #989898;
        text{
          color: #D49696;
          font-size: 12px;
          margin-right: 12px;
        }
      }
      .tips_btn{
        margin-top: 12px;
        navigator{
          font-size: 12px;
          color: #989898;
        } 
      }
    }
  }
  .moreBtn{
    .grace-boxes{
      width: 18%;
      background: #F5F5F5;
      border-radius: 4px;
      &:first-child{
        padding-left: 0;
      }
      &:last-child{
        padding-right: 0;
      }
      .grace-boxes-img{
        text{
          font-size: 30px;
          color: #383843;
        }
      }
      .grace-boxes-text{
        color: #363B4F;
      }
    }
  }
  .my_integral{
    border-radius: 4px;
    align-items: center;
    background: #F5F1E5;
    width: 90%;
    margin: 16px auto;
    height: 80px;
    .integral{
      .h19clubwx{
        color: #C2A74F;
        font-size: 16px;
        margin: 0 12px 0 24px;
      }
      .font_DIN{
        font-size: 28px;
        color: #C2A74F;
        vertical-align: middle;
      }
    }
    .join_club{
      navigator{
        margin-right: 25px;
        position: relative;
        padding-right: 15px;
        text-align: center;
        font-size: 14px;
        color: #C2A74F;
        .arrow_right{
          position: absolute;
          right: 0;
          top:10px;
        }
      }
    }
  }
  .join_19club{
    align-items: center;
    .name{
      font-size: 16px;
      color: #383843;
    }
    .btn{
      .h19clubwx{
        font-size: 30px;
      }
    }
  }
}
</style>