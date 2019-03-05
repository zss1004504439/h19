<template>
  <view class="content">
    <view class="input-group">
      <view class="input-row border">
        <text class="title">账号：</text>
        <input type="text" v-model="userInfo.username" placeholder="请输入账号">
      </view>
      <view class="input-row border">
        <text class="title">密码：</text>
        <input type="text" password="true" v-model="userInfo.password" placeholder="请输入密码">
      </view>
      <view class="input-row">
        <text class="title">手机号码：</text>
        <input type="text" v-model="userInfo.mobile" placeholder="请输入手机号码">
      </view>
      <view class="input-row">
        <text class="title">邮箱：</text>
        <input type="text" v-model="userInfo.email" placeholder="请输入邮箱">
      </view>
    </view>
    <view class="btn-row">
      <button type="primary" class="primary" @tap="doRegister">注册</button>
    </view>
  </view>
</template>
<script>
  import {
    // mapState,
    // mapMutations,
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {
        userInfo: {
          username: 'test1',
          password: '123456',
          email: 'test1@qq.com',
          mobile: '13910111111'
        },
      }
    },
    methods: { ...mapActions(['register']),
      async doRegister() {
        /**
         * 客户端对账号信息进行一些必要的校验。
         * 实际开发中，根据业务需要进行处理，这里仅做示例。
         */
        if (!(/^([a-zA-z0-9]){4,20}$/.test(this.userInfo.username))) {
          uni.showToast({
            icon: 'none',
            title: '账号只接受数字和英文字母,不超过20个字符'
          });
          return;
        }
        if (this.userInfo.password.length < 6) {
          uni.showToast({
            icon: 'none',
            title: '密码最短为 6 个字符'
          });
          return;
        }
        if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.userInfo.email))) {
          uni.showToast({
            icon: 'none',
            title: '邮箱地址不合法'
          });
          return;
        }
        if (!(/^1[34578]\d{9}$/.test(this.userInfo.mobile))) {
          uni.showToast({
            icon: 'none',
            title: '手机号码格式不正确'
          });
          return;
        }
        
				const rq = await this.register(this.userInfo)
				console.log(rq,'rrrrrrrrrqqqqqqqqqqqqqq')
        // 注册并自动登录
        if (rq) {
          uni.showToast({
            title: '注册成功',
            icon: 'none'
          });
          uni.navigateBack({
            delta: 1
          });
        } else {
          uni.showToast({
            title: '注册失败',
            icon: 'none'
          });
        }
      }
    }
  }
</script>
<style>
  page {
    min-height: 100%;
    display: flex;
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #efeff4;
    padding: 20upx;
  }

  .input-group {
    background-color: #ffffff;
    margin-top: 40upx;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .input-group::before {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    height: 1upx;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
  }

  .input-group::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1upx;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
  }

  .input-row {
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .input-row .title {
    width: 40%;
    height: 50upx;
    min-height: 50upx;
    padding: 15upx 0;
    padding-left: 30upx;
    line-height: 50upx;
  }

  .input-row input {
    width: 80%;
    height: 50upx;
    min-height: 50upx;
    padding: 15upx 0;
    padding-right: 30upx;
    line-height: 50upx;
  }

  .input-row.border::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 15upx;
    height: 1upx;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
  }

  .btn-row {
    margin-top: 50upx;
    padding: 20upx;
  }

  button.primary {
    background-color: #0faeff;
  }
</style>
