<template>
  <div class="ore-page" style="background-color: white">
    <div class="ore-header">
      <common-header :title="oreInfoTitle" :showback="true"></common-header>
    </div>
    <div style="height:50px;"></div>
    <div class="ore-info" style="text-align:left;">
      <br/><br/>
      <div class="ore-number-title">{{oreNumberTitle}}
      </div>
      <br/>
      <div>
        <div class="ore-number">{{oreNumber}}</div>
        <router-link tag="a" :to="'/Play'">
          <div class="ore-exchange">
            <div class="ore-come" style=""></div>
            兑换
          </div>
        </router-link>
      </div>
    </div>
    <div style="height: 15px"></div>
    <div class="ore-record-title">{{oreRecordTitle}}</div>
    <hr>
    <div v-if="oreList">
      <div v-for="record in oreList">
        <div class="ore-List">
          <div class="oreList-source">{{ record.source }}</div>
          <div>
            <div class="oreList-time">{{ buildTime(record.updateTime) }}</div>
            <div class="oreList-Number">+{{ record.ore }}</div>
          </div>
        </div>
        <hr>
      </div>
      <label class="last-trip">loading...</label>
    </div>
  </div>
</template>
<script>
  import commonHeader from '../components/common-header'
  import {service} from '../js/api'
  import {buildDate, isDown} from '../js/isBottom'

  export default {
    data() {
      return {
        title: '矿石记录',
        oreNumberTitle: '矿石数量',
        oreInfoTitle: '矿石详情',
        oreRecordTitle: '矿石收支纪录',
        userId: 100001,
        oreNumber: null,
        pageInfo: null,
        oreList: [],
        pageNum: 1,
        pageSize: 15,
        address: null,
        nextPage: true,
        flag:true
      }
    },
    components: {
      commonHeader
    },
    mounted() {
      this.getOreNumber();
      this.getOreRecord(this.pageNum);
      window.addEventListener('scroll', () => {
        if (isDown()) {
          this.pageNum++;
          this.getOreRecord();
        }
      });
    },
    methods: {
      buildTime(str) {
        return buildDate(str)
      },
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
          if (data.code === 200) {
            this.flag=false;
            this.pageInfo = data.data.oreRecordDTOPageInfo;
            if (!this.pageInfo || !this.pageInfo.hasNextPage) {
              this.nextPage = false
              document.getElementsByClassName('last-trip')[0].innerHTML = "到底了，没有更多了"
            }
            for (let ore in this.pageInfo.list) {
              this.oreList.push(this.pageInfo.list[ore]);
            }
          }
          if (data.code === 404 && this.flag) {
            document.getElementsByClassName('last-trip')[0].innerHTML = "您还没有纪录"
          }
        })
      },

    }
  }
</script>
<style>
  .ore-header {
    display: block;
  }

  .ore-info {
    height: 150px;
    width: 100%;
    background: url(../assets/imgs/oreBackImg.jpg) no-repeat left top;
    background-size: cover;
  }

  .last-trip {
    font-size: 10px;
    color: #b3b3b3;
  }

  .ore-come {
    height: 28px;
    width: 28px;
    float: right;
    background: url(../assets/imgs/input.png) no-repeat left center;
  }

  .ore-exchange {
    font-size: 20px;
    color: white;
    text-align: right;
    width: 20%;
    float: right;
    margin-right: 5%;
  }

  .ore-number {
    font-size: 40px;
    color: white;
    text-align: left;
    width: 50%;
    float: left;
    margin-left: 5%;
  }

  .ore-number-title {
    font-family: 宋体;
    font-size: 16px;
    color: white;
    text-align: left;
    width: 50%;
    margin-left: 5%;
  }

  .ore-List {
    text-align: left;
    width: 90%;
    margin-left: 5%;
    height: 44px;
    font-size: 16px;
  }

  hr {
    background-color: #fffbf9;
    height: 0.5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .oreList-source {
    width: 50%;
  }

  .oreList-time {
    width: 50%;
    float: left;
  }

  .oreList-Number {
    width: 50%;
    text-align: right;
    float: right;
    color: #ff5342
  }

  .ore-record-title {
    text-align: left;
    width: 90%;
    margin-left: 5%;
    font-size: 16px;
  }

  div {
    width: 100%;
  }
</style>
