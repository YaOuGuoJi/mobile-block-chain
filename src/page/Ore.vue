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
      <div v-if="oreRecordPage">
        <ol v-for="record in oreRecordPage.list">
          <li>{{ buildDate(record.addTime) }}
          <li>{{ record.ore }}</li>
          <li>{{ record.source }}</li>
        </ol>
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
        oreRecordPage: null,
        pageNum: 1,
        pageSize:2,
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
          password: '2198d45569dbbd23dce3a48c77497b59',
        })
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
          this.oreRecordPage = data.data.oreRecordDTOPageInfo;
          console.log(this.oreRecordPage)
        })
      },
      // 注册scroll事件并监听
      window: addEventListener('scroll', function () {
        // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
        // console.log(document.body.scrollTop); // 滚动高度
        // console.log(document.body.offsetHeight); // 文档高度
        // 判断是否滚动到底部
        if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
          // console.log(sw);
          // 如果开关打开则加载数据
          /*if (sw == true) {
            // 将开关关闭
            sw = false;
            axios.get('http://localhost:3000/proxy?url=http://news.at.zhihu.com/api/4/news/before/20170608')
              .then(function (response) {
                console.log(JSON.parse(response.data));
                // 将新获取的数据push到vue中的data，就会反应到视图中了
                JSON.parse(response.data).stories.forEach(function (val, index) {
                  _this.articles.push(val);
                  // console.log(val);
                });
                // 数据更新完毕，将开关打开
                sw = true;
              })
              .catch(function (error) {
                console.log(error);
              });
          }*/
          service('get', '/user/oreRecord', {
            pageNum: this.pageNum++,
            pageSize: 2
          }).then(data => {
            this.oreRecordPage = data.data.oreRecordDTOPageInfo;
            console.log(this.oreRecordPage)
          })
        }
      }),
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
