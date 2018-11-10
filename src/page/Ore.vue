<template>
  <div class="ore-page" style="background-color: white">
    <div class="ore-header">
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div style="height:50px; width:100%"></div>
    <div class="ore-number" style="text-align:left;">
      <br/><br/>
      <span class="ore-number-font" style="font-family: 宋体; font-size:16px; color:white;margin-left: 30px">{{oreInfoTitle}}</span>
      <br/><br/>
      <span class="" style="font-size:40px; color:white;margin-left: 30px">{{oreNumber}}</span>
    </div>
    <h4>{{oreRecordTitle}}</h4>
    <hr>
    <div v-if="oreList">
      <div v-for="record in oreList" >
        <div style="height: 30px">
          <div class="oreList-source">{{ record.source }}</div>
          <div class="oreList-time">{{ buildDate(record.addTime) }}</div>
          <div class="oreList-Number">{{ record.ore }}</div>
        </div>
        <hr>
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
        oreInfoTitle: '矿石详情',
        oreRecordTitle: '矿石收支纪录',
        userId: 100001,
        oreNumber: null,
        pageInfo: null,
        oreList: [],
        pageNum: 1,
        pageSize: 15,
        nextPage: true,
      }
    },
    components: {
      commonHeader
    },
    mounted() {
      this.getOreNumber();
      this.getOreRecord(this.pageNum);
      if (this.nextPage) {
        window.addEventListener('scroll', () => {
          if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
            if (this.nextPage) {
              this.nextPage = false;
              this.pageNum++;
              this.getOreRecord();
              this.nextPage = true;
            }
          }
        });
      }
    },
    methods: {
      getOreNumber() {
        service('get', '/user/oreNumber', {}).then(data => {
          this.oreNumber = data.data.oreNumber
        })
      },
      getOreRecord() {
        service('get', '/user/oreRecord', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(data => {
          if (data.code !== 200) {
            //window.alert(data.message);
            return;
          }
          this.pageInfo = data.data.oreRecordDTOPageInfo;
          console.log(this.pageInfo)
          if (!this.pageInfo.hasNextPage) {
            this.nextPage = false
          }
          for (let ore in this.pageInfo.list) {
            this.oreList.push(this.pageInfo.list[ore]);
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
        if (document.compatMode == "CSS1Compat") {
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
  ul li{
    list-style-type:none;
    background-color: white;
  }
  hr{
    background-color: #fffbf9;
    height: 2px;
  }
  .oreList-source oreList-time{
    margin-left: 40px;

  }
</style>
