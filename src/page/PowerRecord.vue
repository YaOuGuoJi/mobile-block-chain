<template>
  <div>
    <common-header :title="title" :showback="true"></common-header>
    <div class="top_banner">
      <h5 id="valid_message">{{validMessage}}</h5>
      <h1 id="valid_power_sum">{{validPowerSum}}</h1>
      <ul id="not_valid_sum">
        <li><h5>{{notValidMessage}}</h5></li>
        <li><h5>{{notValidPowerSum}}</h5></li>
      </ul>
    </div>
    <div>
      <ul class="valid_record">
        <li><a href="#valid_record_table">生效中算力记录</a></li>
        <li><a href="#not_valid_record_table">未生效算力记录</a></li>
      </ul>
      <hr>
      <template>
        <div id="valid_record_table">
          <ul class="mui-table-view" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
            <li v-for="power in powerRecordList">
              <span class="mui-pull-left">{{power.addTime}}生效</span>
              <span>{{power.source}}</span>
              <span class="mui-pull-right">算力值+{{power.power}}</span>
            </li>
            <!--底部判断是加载图标还是提示“全部加载”-->
            <li class="more_loading" v-show="!queryLoading">
              <mt-spinner type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
              <span v-show="allLoaded">已全部加载</span>
            </li>
          </ul>
        </div>
      </template>
      <template v-if="expiredPowerRecordList">
        <table id="not_valid_record_table">
          <tbody>
            <tr v-for="expiredPower in expiredPowerRecordList">
              <td class="mui-pull-left">{{expiredPower.addTime}}生效</td>
              <td>{{expiredPower.source}}</td>
              <td class="mui-pull-right">算力值-{{expiredPower.power}}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>
<script>
  import commonHeader from '../components/common-header'
  import {service} from '../js/api'
  import mintUI from 'mint-ui'
  import InfiniteScroll from '../../node_modules/mint-ui/lib/infinite-scroll/index.js';
//  import Spinner from '../../node_modules/mint-ui/lib/spinner'

  export default {
    data() {
      return {
        title: "算力记录",
        validMessage: "生效算力值",
        notValidMessage: "未生效算力值",
        validPowerSum: 0,
        notValidPowerSum: 0,
        queryLoading: false,
        moreLoading: false,
        allLoaded: false,
        pageNum: 1,
        pageSize: 20,
        powerRecordList: null,
        expiredPowerRecordList: null,
        dataRecord: null
      }
    },
    created() {
      this.getPowerSum();
////      this.getPowerRecord();
      this.getExpiredPowerRecord();
    },
    methods: {
      getPowerSum() {
//        service('post', '/user/login', {
//          userId: 1,
//          password: '2198d45569dbbd23dce3a48c77497b59'
//        }).then(data => {
//        })
        service('get', '/user/power/isValid', {}).then(data => {
          console.log(data);
          this.validPowerSum = data.data.validPowerSum;
          this.notValidPowerSum = data.data.notValidPowerSum;
        });
      },
//      getPowerRecord() {
//        service('get', '/user/power/valid', {
//          pageNum: this.pageNum,
//          pageSize: this.pageSize
//        }).then(data => {
//          this.powerRecordList = data.data.list;
//          this.dataRecord = data.data;
//          console.log(this.powerRecordList);
//          console.log(data)
//        })
//      },
      getExpiredPowerRecord() {
        service('get', '/user/power/expired', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(data => {
          this.expiredPowerRecordList = data.data.list;
        })
      },
      //无限加载函数
      loadMore() {
        if(this.allLoaded){
          this.moreLoading = true;
          return;
        }
        if(this.queryLoading){
          return;
        }
        this.moreLoading = !this.queryLoading;
        this.pageNum++;
        service('get', '/user/power/expired', {
          pageNum:this.pageNum,
          pageSize: this.pageSize
        }).then((data) => {
          if(data.data && data.data.list){
//            this.powerRecordList = this.list.concat(data.data.list);
            this.powerRecordList = data.data.list;
            this.allLoaded = data.data.pages;
          }
          this.moreLoading = this.allLoaded;
        });
      }
    },
    components: {
      commonHeader,
      mintUI,
      InfiniteScroll,
//      Spinner
    },
  }
</script>
<style scoped="scoped">
  @import '../../node_modules/mint-ui/lib/style.css';

  .top_banner{
    width: 100%;
    height: 25%;
    background-color: #7e8c8d;
  }

  #valid_message{
    position: absolute;
    top: 8%;
    left: 4%;
    float: left;
  }
  #valid_power_sum{
    position: absolute;
    top: 9%;
    left: 4%;
    float: left;
  }
  #not_valid_sum{
    position: absolute;
    top: 20%;
    left: -11%;
  }
  #not_valid_sum li{
    float: left;
    list-style: none;
    margin-left: 20px;
  }
  .valid_record li{
    font-family: verdana,arial,sans-serif;
    font-size:15px;
    float: left;
    list-style: none;
    margin-left: 40px;
  }
  hr{
    border: 0.5px solid;
    width: 100%;
    color: #7e8c8d;
  }
  #valid_record_table{
    background-color: cadetblue;
    width: 100%;
    height: 200px;
    display: none;
  }
  #not_valid_record_table{
    /*background-color: lightskyblue;*/
    width: 100%;
    height: 200px;
    display: none;
  }
  #valid_record_table:target{
    display:block;
  }
  #not_valid_record_table:target{
    display: block;
  }
  a{
    text-decoration: none;
  }
  .table{
    width: 100%;
  }
  .table tr{
    height: 50px;
  }
</style>
