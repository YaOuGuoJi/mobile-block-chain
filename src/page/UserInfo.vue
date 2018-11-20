<template>
  <div class="user-info">
    <div class="top_header">
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div class="user-info-header">
      <img src="../assets/imgs/background-play.jpg" style="width: 100%"/>
    </div>
    <div class="user-info-down">
      <div class="top_photo" style="width: 100%;">
        <div>
          <img class="user-info-down-user-img" src="../assets/imgs/default.jpg"/>
          <br>
          <label style="font-size: 30px" v-model="userName">{{userInfo !== null ? userInfo.userName : ""}}</label><br/>
          <label style="font-size: 20px">会员等级{{userInfo !== null ?userInfo.vip :""}}</label><br/>
        </div>
      </div>
      <hr style="">
      <div class="user-info-all">
        <span>个人简介：</span><br>
        <span >生日：{{buildBirth(userInfo !== null ? userInfo.birthday:"")}}</span><br/>
        <span >性别：{{userInfo === null ? "man" : (userInfo.sex === 1 ? "男":"女")}}</span><br/>
        <span >电话：{{userInfo !== null ? userInfo.phone:""}}</span><br/>
        <span >邮箱：{{userInfo !== null ? userInfo.email:""}}</span><br/>
        <span >工作：{{userInfo !== null ? userInfo.job:""}}</span><br/>
        <span >地址：{{userInfo !== null ? userInfo.address:""}}</span><br/>
        <span >人生格言:</span>
        <span>{{motto}}</span>
      </div>
      <div class="userInfo">
        <button id="button-style" v-on:click="toMy()">编辑</button>
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
        motto: "江山如此多娇，引无数英雄竞折腰"

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

      },
      toMy(){
        this.$router.togo('/EditUserInfo')
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
    top: 80px;
  }

  .user-info-down-user-img {
    width: 40%;
    height: 40%;
    border-radius: 50%
  }

  #button-style{
     width: 80px;
     height: 30px;
     background-color: darkorange;
     border-radius: 11px;
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
