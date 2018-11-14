<template>
  <div class="user-info">
    <div>
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div style="width: 100%;height:55px;"></div>
    <div style="width: 100%;height:200px;">
      <div>
        <img ref="../assets/imgs/default.jpg" style="width: 50%;height:140px;border-radius:50%"/>
        <br>
        <span style="font-size: 20px">{{userInfo.userName}}</span><br/>
        <span style="font-size: 20px">{{userInfo.vip}}</span>
      </div>
    </div>
    <span>个人简介：</span>
    <hr style="background-color: #7e8c8d;width: 90%;height: 1px">
    <div style="text-align:left;margin-left: 10%">
      <span>生日：{{buildBirth(userInfo.birthday)}}</span><br/>
      <span>性别：{{userInfo.sex === 1 ? "man":"girl"}}</span><br/>
      <span>电话：{{userInfo.phone}}</span><br/>
      <span>邮箱：{{userInfo.email}}</span><br/>
      <span>工作：{{userInfo.job}}</span><br/>
      <span>人生格言:</span><br/>
    </div>
    <div class="userInfo">
      <!--{{ userInfo }}-->


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
        userInfo: null
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
  .userInfo {
    position: relative;
    top: 20%;
  }

  span {
    font-size: 20px;
  }
</style>
