<template>
  <div class="user-info">
    <div class="user-info-header">
      <img src="../assets/imgs/background-play.jpg" style="width: 100%"/>
    </div>
    <div class="user-info-down">
      <div>
        <router-link tag="a" :to="'/my'">
          <img class="user-info-down-img" src="../assets/imgs/w-back.svg"/>
        </router-link>
      </div>
      <div class="user-info-down-edit">
        <router-link tag="a" :to="'/editUserInfo'">
          <div style="color: #b3b3b3">编辑</div>
        </router-link>
      </div>
      <div style="width: 100%;">
        <div>
          <img class="user-info-down-user-img" src="../assets/imgs/default.jpg"/>
          <br>
          <label style="font-size: 30px" v-model="userName">{{userInfo.userName}}</label><br/>
          <label style="font-size: 20px">会员等级{{userInfo.vip}}</label><br/>
        </div>
      </div>
      <hr style="">
      <div class="user-info-all">
        <span>个人简介：</span><br>
        <span v-model="birthday">生日：{{buildBirth(userInfo.birthday)}}</span><br/>
        <span v-model="sex">性别：{{userInfo.sex === 1 ? "男":"女"}}</span><br/>
        <span v-model="phone">电话：{{userInfo.phone}}</span><br/>
        <span v-model="email">邮箱：{{userInfo.email}}</span><br/>
        <span v-model="job">工作：{{userInfo.job}}</span><br/>
        <span v-model="address">地址：{{userInfo.address}}</span><br/>
        <span v-model="motto">人生格言:</span>
        <span>江山如此多娇，引无数英雄竞折腰</span>
      </div>
      <div class="userInfo">


      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../components/common-header'
  import {service} from "@/js/api";

  export default {
    data() {
      return {
        title: '我的信息',
        userInfo: null,
        userName: null,
        birthday: null,
        sex: null,
        phone: null,
        email: null,
        job: null,
        motto: null

      }
    },
    created() {
      service('get', 'user/detail', {}).then(response => {
        if (response.code !== 200 || !response.data) {
          alert(response.message);
        }
        this.userInfo = response.data;
      })
    },
    components: {
      commonHeader
    },
    methods: {
      buildBirth(str) {
        let date = new Date(str),
          // 月份从0开始，需要+1
          month = date.getMonth() + 1,
          day = date.getDate()
        return (month < 10 ? '0' + month : month) + '月' +
          (day < 10 ? '0' + day : day) + '号'

      }
    }
  }
</script>

<style scoped>
  hr {
    background-color: #b3b3b3;
    width: 90%;
    height: 1px;
    margin-top: 0;
    margin-bottom: 0
  }

  .user-info-header {
    width: 100%;
    position: absolute;
    z-index: 0;
  }

  .user-info-down {
    position: absolute;
    z-index: 1;
  }

  .user-info-down-img {
    width: 20px;
    height: 20px;
    float: left;
    margin-left: 16px;
    margin-top: 20px
  }

  .user-info-down-edit {
    text-align: right;
    margin-right: 20px;
    margin-top: 23px;
    font-size: 20%;
  }

  .user-info-down-user-img {
    width: 40%;
    height: 40%;
    border-radius: 50%
  }

  .userInfo {
    position: relative;
    top: 20%;
  }

  .user-info-all {
    text-align: left;
    width: 80%;
    margin-left: 10%
  }

  .user-info {
    width: 100%;
    background-image: url("../assets/imgs/background-play.jpg");
  }

  span {
    font-size: 20px;
    line-height: 2;
  }
</style>
