<template>
  <div>
    <div class="top_header">
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div class="top_banner">
      <h5 id="valid_message" style="color: #EDEFF2">{{validMessage}}</h5>
      <h1 id="valid_power_sum" style="color: #EDEFF2">{{validPowerSum}}</h1>
      <h5 id="not_valid_message" style="color: #EDEFF2">{{notValidMessage}}</h5>
      <h5 id="not_valid_power_sum" style="color: #EDEFF2">{{notValidPowerSum}}</h5>
    </div>
    <div>
      <div class="valid_record">
        <div class="valid_title"><span v-on:click="pageNum = 1;getPowerRecord()">生效中的算力值</span></div>
        <div class="not_valid_title"><span v-on:click="pageNum = 1;getExpiredPowerRecord()">已失效的算力值</span></div>
      </div>
      <div class="hr_type"></div>
      <div class="record_list">
        <div id="record-table" v-if="powerList.length > 0">
          <ul class="list-group">
            <li class="list-group-item" v-for="power in powerList">
              <p class="list-group-item-text">{{power.source}}<br/>{{ buildTime(power)}}</p>
              <span class="pull-right">算力值{{type === 'valid' ? '+' : '-'}}{{power.power}}</span>
            </li>
          </ul>
        </div>
        <label id="last-trip"></label>
      </div>
    </div>
  </div>
</template>
<script>
  import commonHeader from '../components/common-header'
  import {service} from '../js/api'
  import {isDown} from '../js/isBottom'
  import {buildDate} from '../js/isBottom'

  export default {
    data() {
      return {
        title: "算力记录",
        validMessage: "生效算力值",
        notValidMessage: "已失效算力值",
        validPowerSum: 0,
        notValidPowerSum: 0,
        pageNum: 1,
        pageSize: 13,
        type: null,
        pageInfo: null,
        powerList: [],
      }
    },
    mounted() {
      this.getPowerSum();
      this.getPowerRecord(this.pageNum);
      window.addEventListener('scroll', () => {
        if (isDown()) {
          this.pageNum++;
          if (this.type==="valid") {
            this.getPowerRecord();
          }else{
            this.getExpiredPowerRecord();
          }
        }
      });
    },
    methods: {
      getPowerSum() {
        service('get', '/user/power/isValid', {}).then(data => {
          this.validPowerSum = (data.data.validPowerSum) === null ? 0 : data.data.validPowerSum;
          this.notValidPowerSum = (data.data.notValidPowerSum) === null ? 0 : data.data.notValidPowerSum;
        });
      },
      getPowerRecord() {
        if (this.type === 'valid' && this.pageInfo && !this.pageInfo.hasNextPage) {
          return;
        }
        if (this.pageNum === 1) {
          this.powerList = [];
        }
        this.type = "valid";
        document.getElementById('last-trip').innerText = 'loading...';
        service('get', '/user/power/valid', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(data => this.buildPowerRecord(data))
      },
      getExpiredPowerRecord() {
        if (this.type === 'notValid' && this.pageInfo && !this.pageInfo.hasNextPage) {
          return;
        }
        if (this.pageNum === 1) {
          this.powerList = [];
        }
        this.type = "notValid";
        document.getElementById('last-trip').innerText = 'loading...';
        service('get', '/user/power/expired', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(data => this.buildPowerRecord(data))
      },
      buildPowerRecord(data) {
        if (data.code !== 200 && data.code !== 404) {
          alert(data.message);
          return;
        }
        if (data.code === 404) {
          document.getElementById('last-trip').innerText = '没有记录';
          return;
        }
        this.pageInfo = data.data;
        for (let power in this.pageInfo.list) {
          this.powerList.push(this.pageInfo.list[power]);
        }
        if (!this.pageInfo.hasNextPage) {
          document.getElementById('last-trip').innerText = '我是有底线的';
        }
      },
      buildTime(power) {
        if (this.type === 'valid') {
          return buildDate(power.addTime) + '生效';
        }
        return buildDate(power.updateTime) + '失效';
      }
    },
    components: {
      commonHeader
    }
  }
</script>
<style scoped="scoped">
  .top_header{
    display: block;
  }

  .top_banner {
    width: 100%;
    height: 210px;
    background: url(../assets/imgs/oreBackImg.jpg) no-repeat left top;
    background-size: cover;
  }

  #valid_message {
    margin-top: 60px;
    margin-left: 4%;
    float: left;
  }

  #valid_power_sum {
    margin-top: 90px;
    margin-left: -17%;
    float: left;
  }

  #not_valid_message{
    padding-top: 180px;
    margin-left: -300px;
  }

  #not_valid_power_sum{
    margin-top: -25px;
    margin-left: -150px;
  }

  .valid_record{
    font-family: verdana, arial, sans-serif;
    font-size: 15px;
    float: left;
    list-style: none;
    margin-left: 40px;
  }

  .valid_title{
    top: 213px;
    float: left;
    margin-left: -35px;
    height: 30px;
    width: 200px;
  }
  .valid_title:link{
    border-bottom: 4px solid #e3337c;
  }

  .valid_title:visited{
    border-bottom: 4px solid #e3337c;
  }

  .valid_title:hover{
    border-bottom: 4px solid #e3337c;
  }

  .valid_title:active{
    border-bottom: 4px solid #e3337c;
  }

  .not_valid_title{
    top: 213px;
    float: left;
    left: 208px;
    width: 200px;
    height: 30px;
  }

  .not_valid_title:hover{
    border-bottom: 4px solid #e3337c;
  }

  .hr_type{
    height: 1px;
    width: 100%;
  }

  #record-table {
    margin-top: 30px;
    width: 100%;
  }

  .record_list{
    width: 100%;
    height: auto;
  }

  a {
    text-decoration: none;
    color: #1b6d85;
  }

  a:hover {
    color: #e3337c;
  }

  .list-group span {
    margin-left: 40px;
  }

  .pull-right{
    float: left;
    font-family: verdana, arial, sans-serif;
    font-size: 16px;
    color: #c94a4a;
  }

  .list-group-item{
    height: 60px;
  }

  .list-group-item-text{
    float: left;
    font-family: verdana, arial, sans-serif;
    font-size: 14px;
  }

  #last-trip {
    color: #b3b3b3;
  }
</style>
