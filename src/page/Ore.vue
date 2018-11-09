<template>
  <div class="ore-page">
    <div class="ore-header">
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div style="height:50px; width:100%"></div>
    <div class="ore-number" style="text-align:left;">
      <br/><br/>
      <span class="ore-number-font" style="font-family: 宋体; font-size:16px; color:white;margin-left: 30px">黑矿总数</span>
      <br/><br/>
      <span style="font-size:40px; color:white;margin-left: 30px">{{oreNumber}}</span>
    </div>
    <div class="ore-introduction" style="width: 100%;height: 200px">
      <!--<div style="margin-left: 20px;margin-right: 20px">
        控制字体位置可以用padding margin text-indent 单位可以是px em % (em是根据你设置的字体大小设定的，假如你设置字体为12px，那么2em就是24px。 %是根据父容器的宽度或高度决定的。
      </div>-->
      <div class="ore-record">
        <h3>收支记录</h3>
        <hr style="height: 20px; width:100%;color: blue">
        <table></table>
        <tr v-for="(order,index) in oreRecordPage.list" :key="order.orderId" :class="{on:index%2===0,off:index%2!==0}">
          <td>{{ index+1 }}</td>
          <td>{{ buildDate(order.addTime) }}</td>
          <td>{{ order.ore }}</td>
          <td>{{ order.source == 1?"正常领取":"其他" }}</td>
        </tr>
        <div class="page-bar">
        <ol>
          <li v-if="oreRecordPage.isFirstPage"><a class="banclick">上一页</a></li>
          <li v-else><a v-on:click="pageNum--, getOreRecord()">上一页</a></li>
          <li v-for="index in oreRecordPage.pages" v-bind:class="{ 'active': pageNum === index}" :key="index"><a
            v-on:click="pageNum = index, getOreRecord()">{{ index }}</a></li>
          <li v-if="oreRecordPage.isLastPage"><a class="banclick">下一页</a></li>
          <li v-else><a v-on:click="pageNum++, getOreRecord()">下一页</a></li>
          <li><a>共<i>{{ oreRecordPage.pages }}</i>页</a></li>

        </ol>
        </div>
        <ul>
          <li v-for="news of list">
            <p class="ore-source">{{ news.title }}</p>
            <p class="ore-date">{{ news.create_at }}</p>
            <p class="ore-num">By: {{ news.author.loginname }}</p>
          </li>
        </ul>
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
        title: '矿石记录',
        userId: 100001,
        oreNumber: null,
        oreRecordPage:null,
      }
    },
    components: {
      commonHeader
    },
    created() {
      this.login();
      this.getOreNumber();
      this.getOreRecord();
    },
    methods: {
      login() {
        service('post', '/user/login', {
          userId: 100001,
          password: 'liuwen',
        }).then(data => {
          console.log(data)
        })
      },
      getOreNumber() {
        service('get', '/user/oreNumber', {}).then(data => {
          console.log(data)
          this.oreNumber = data.data.oreNumber
        })
      },
      getOreRecord() {
        service('get', '/user/oreRecord', {
          pageNum: 1,
          pageSize: 1
        }).then(data => {
          this.oreRecordPage =data.data.oreRecordDTOPageInfo
          console.log(data)
        })
      },
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

    }
  }
</script>
<style>
  .ore-header {
    display: block;
  }

  .ore-number {
    height: 150px;
    width: 100%;
    background-color: #9d6efa;
  }
  .page-bar {
    text-align: center;
  }

  .page-bar ul {
    display: table;
    margin: 40px auto;
    position: relative;
    left: 300px;
  }

  .page-bar li {
    display: table-cell;
  }

  .page-bar a {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
  }

  .page-bar a:hover {
    background-color: #eee;
  }

  .page-bar a.banclick {
    cursor: not-allowed;
  }

  .page-bar .active a {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }

  .page-bar i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
</style>
