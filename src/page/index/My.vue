<template>
  <div class="main-content">
    <div class="user-info">
      <span class="user-name">{{ userName }}</span>
      <span class="user-called">比斯特新人</span>
      <img class="head-border" src="../../assets/header.jpg">
    </div>
    <div class="detail">
      <div class="user-property">
        <span class="property">我的资产</span>
        <div class="wallet" @click="toOre">
          <span>我的钱包</span>
        </div>
        <div class="power" @click="toPower">
          <span>我的算力</span>
        </div>
      </div>
      <div class="profiles">
        <div class="line-div">
        </div>
        <div class="function-detail" @click="toOrder">
          <img class="icon" src="../../assets/order.png"/>
          <span>我的订单</span>
          <img class="more" src="../../assets/to.png"/>
        </div>
        <div class="line-div">
        </div>
        <div class="function-detail" @click="toUserInfo">
          <img class="icon" src="../../assets/share.png"/>
          <span>我的信息</span>
          <img class="more" src="../../assets/to.png"/>
        </div>
        <div class="line-div">
        </div>
        <div class="function-detail" @click="toPowerBase">
          <img class="icon" src="../../assets/world.png"/>
          <span>算力基地</span>
          <img class="more" src="../../assets/to.png"/>
        </div>
      </div>
      <div class="line-div">
      </div>
      <div class="logout" @click="logout">
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'
  import {service} from "@/js/api";

  export default {
    data() {
      return {
        title: '我的',
        userName: ''
      }
    },
    created() {
      service('get', '/user/detail', {}).then(data => {
        if (data.code !== 200 || !data.data) {
          alert(data.message);
        }
        let userInfo = data.data;
        this.userName = userInfo.userName;
      })
    },
    methods: {
      logout() {
        service('post', '/user/logout', {}).then(response => {
          if (response.code !== 200) {
            alert(response.message);
          }
          this.$router.togo('/login');
        })
      },
      toOre() {
        this.$router.togo('/ore')
      },
      toPower() {
        this.$router.togo('/power')
      },
      toOrder() {
        this.$router.togo('/order')
      },
      toUserInfo() {
        this.$router.togo('/userInfo')
      },
      toPowerBase() {
        this.$router.togo('/powerBase')
      }
    },
    components: {
      commonHeader
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/index.less";

  .main-content {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .user-info {
    height: 200px;
    width: 100%;
    background: url("../../assets/imgs/oreBackImg.jpg") no-repeat left top;
    background-size: cover;
  }

  .user-name {
    font-size: 50px;
    position: fixed;
    .left(70);
    top: 40px;
    color: @base-font-color;
  }

  .user-called {
    width: 90px;
    position: fixed;
    .left(70);
    top: 110px;
    color: @base-font-color;
    font-size: 14px;
    background-color: #e4ad26;
    border-radius: 20px;
  }

  .head-border {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    position: fixed;
    top: 50px;
    .right(80);
  }

  .detail {
    width: 100%;
  }

  .user-property {
    width: 100%;
    height: 150px;
  }

  .property {
    position: fixed;
    left: 8%;
    top: 220px;
    font-size: 20px;
  }

  .wallet {
    height: 60px;
    width: 40%;
    position: fixed;
    top: 260px;
    left: 8%;
    background: #e4ad26;
    color: @base-font-color;
    border-radius: 5px;
    span {
      position: relative;
      top: 25%;
      font-size: 20px;
    }
  }

  .power {
    height: 60px;
    width: 40%;
    position: fixed;
    top: 260px;
    right: 8%;
    background: #af3a59;
    color: @base-font-color;
    border-radius: 5px;
    span {
      position: relative;
      top: 25%;
      font-size: 20px;
    }
  }

  .profile {
    width: 100%;
    position: fixed;
  }

  .function-detail {
    width: 100%;
    height: 50px;
    .icon {
      width: 20px;
      height: 20px;
      float: left;
      position: relative;
      left: 6%;
      top: 15px;
    }
    span {
      float: left;
      position: relative;
      left: 7%;
      font-size: 16px;
      top: 15px;
    }
    .more {
      width: 20px;
      height: 20px;
      float: right;
      position: relative;
      right: 7%;
      top: 15px;
    }
  }

  .line-div {
    width: 100%;
    height: 15px;
    background-color: #dddddd;
  }

  .logout {
    width: 80%;
    height: 40px;
    position: relative;
    left: 10%;
    top: 10px;
    background-color: #af3a59;
    border-radius: 20px;

    span {
      position: relative;
      font-size: 16px;
      top: 10px;
      color: white;
    }
  }

</style>
