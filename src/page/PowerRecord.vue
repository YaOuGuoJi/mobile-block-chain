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
        <div class="valid_title"><span v-on:click="this.pageNum = 1;getPowerRecord()">生效中的算力值</span></div>
        <div class="not_valid_title"><span v-on:click="this.pageNum = 1;getExpiredPowerRecord()">已失效的算力值</span></div>
      </div>
      <div class="hr_type"></div>
      <div class="record_list">
        <div id="valid_record_table" v-if="powerList" v-show="this.type=='valid'">
          <ul class="list-group" id="add_id">
            <li class="list-group-item" v-for="power in powerList">
              <span class="source_class">{{power.source}}</span>
              <span class="time_class">{{buildDate(power.addTime)}}生效</span>
              <span class="power_class">算力值+{{power.power}}</span>
            </li>
          </ul>
        </div>
        <div id="not_valid_record_table" v-if="expiredPowerList" v-show="this.type=='notValid'">
          <ul class="list-group" id="add">
            <li class="list-group-item" v-for="power in expiredPowerList">
              <span class="source_class">{{power.source}}</span>
              <span class="time_class">{{buildDate(power.updateTime)}}生效</span>
              <span class="power_class">算力值-{{power.power}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import commonHeader from '../components/common-header'
  import {service} from '../js/api'

  export default {
    data() {
      return {
        title: "算力记录",
        validMessage: "生效算力值",
        notValidMessage: "已失效算力值",
        validPowerSum: 0,
        notValidPowerSum: 0,
        powerList: [],
        expiredPowerList: [],
        pageNum: 1,
        pageSize: 13,
        nextPage: true,
        type: null
      }
    },
    mounted() {
      this.getPowerSum();
     window.addEventListener('scroll', () => {
        if (this.getScrollTop() + this.getWindowHeight() >= this.getScrollHeight()) {
          if(this.type=="valid"){
            console.log(121212);
            this.pageNum++;
            this.getPowerRecord();
          }else{
            console.log(131313);
            this.pageNum++;
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
        this.type = "valid";
        this.pageNum = 1;
        service('get', '/user/power/valid', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(data => {
          if (data.code != 200) {
//            alert(data.message);
            return;
          }
          this.pageInfo = data.data;
          console.log(data.data);
          for (let power in this.pageInfo.list) {
            this.powerList.push(this.pageInfo.list[power]);
          }
          if (this.pageInfo.isLastPage==true) {
            this.powerList.push({source:'没有更多了~~~'});
          }
          console.log(this.powerList);
        })
      },
      getExpiredPowerRecord() {
        this.type = "notValid";
        service('get', '/user/power/expired', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(data => {
          if (data.code !== 200) {
            return;
          }
          this.pageInfo = data.data;
          console.log(this.pageInfo);
          for (let expiredPower in this.pageInfo.list) {
            this.expiredPowerList.push(this.pageInfo.list[expiredPower]);
          }
        })
      },
      //滚动条在Y轴上的滚动距离
      getScrollTop() {
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      },
      //文档的总高度
      getScrollHeight() {
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
      },
      //浏览器视口的高度
      getWindowHeight() {
        let windowHeight = 0;
        if (document.compatMode === "CSS1Compat") {
          windowHeight = document.documentElement.clientHeight;
        } else {
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      //时间解析
      buildDate: function (str) {
        let date = new Date(str),
          year = date.getFullYear(),
          // 月份从0开始，需要+1
          month = date.getMonth() + 1,
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes()
        return year + '-' +
          (month < 10 ? '0' + month : month) + '-' +
          (day < 10 ? '0' + day : day) + ' ' +
          (hour < 10 ? '0' + hour : hour) + ':' +
          (min < 10 ? '0' + min : min)
      }
    },
    components: {
      commonHeader
    },
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

  .valid_title:hover{
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

  #valid_record_table {
    margin-top: 30px;
    width: 100%;
  }

  #not_valid_record_table {
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

  .power_class{
    color: #c94a4a;
    font-size: 10px;
  }

  .list-group-item{
    height: 44px;
  }

</style>
