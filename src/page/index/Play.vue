<template>
  <div v-show="showPage" class="body">
    <div class="top_title">
      <h3 id="title_h3" style="color: #EDEFF2">玩转矿石</h3>
      <h5 id="title_h5" style="color: #EDEFF2">多种玩法，赢矿石、拿现金、享权益</h5>
    </div>
    <div class="ore_active">
      <h4 id="active_h4" style="color: #EDEFF2">矿石活动</h4>
      <h5 id="active_h5" style="color: #EDEFF2" v-on:click="getMore()">更多<img class="more" src="../../assets/to.png" style="width: 18px"/></h5>
    </div>
    <div class="active_div">
      <a><img class="classify-img" src="../../assets/imgs/play-1.png" @click="showIframe1()"/></a>
      <a><img class="classify-img" src="../../assets/imgs/play-2.png" @click="showIframe2()"/></a>
      <a><img class="classify-img" src="../../assets/imgs/play-3.png" @click="showIframe3()"/></a>
    </div>
    <div class="market">
      <h4 style="color: #EDEFF2" id="market_h4">小镇集市</h4>
      <h5 style="color: #EDEFF2" id="market_h5">算力达到350方可参与兑换</h5>
    </div>
    <div class="goods_list">
      <div class="item"><a><img src="../../assets/imgs/play-4.png" style="width: 190px; height: 250px"/></a></div>
      <div class="item"><a><img src="../../assets/imgs/play-5.png" style="width: 190px; height: 250px"/></a></div>
      <div class="item"><a><img src="../../assets/imgs/play-6.png" style="width: 190px; height: 250px"/></a></div>
      <div class="item"><a><img src="../../assets/imgs/play-6.png" style="width: 190px; height: 250px"/></a></div>
    </div>
    <div class="bottom-div">
      <label class="last-trips">~矿石免费换物~</label>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'
  import {service} from "../../js/api";

  export default {
    data() {
      return {
        title: '玩转',
        num: 0,
        showPage: false
      }
    },
    created() {
      service('get', '/user/isLogin').then(data => {
        this.showPage = data
      })
    },
    components: {
      commonHeader
    },
    methods: {
      getMore(){
        alert("敬请期待！")
      },
      showIframe1() {
        this.$router.goLeft({
          path: '/find-link', query: {
            pageTitle: '挖宝',
            findLink: 'http://www.taobao.com'
          }
        });
      },
      showIframe2() {
        this.$router.goLeft({
          path: '/find-link', query: {
            pageTitle: '抽奖',
            findLink: 'http://www.taobao.com'
          }
        });
      },
      showIframe3() {
        this.$router.goLeft({
          path: '/find-link', query: {
            pageTitle: '联赛竞猜',
            findLink: 'http://www.taobao.com'
          }
        });
      },
    }
  }
</script>

<style lang="less" scoped="scoped">
  .body {
    margin-top: -20px;
    width: 100%;
    background: url("../../assets/imgs/background-play.jpg") no-repeat center left;
  }
  .top_title{
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #e3337c;
  }
  #title_h3{
    padding-top: 40px;
    margin-left: -65%;
  }
  #title_h5{
    margin-left: -35%;
  }
  .ore_active{
    width: 100%;
    height: 50px;
  }
  #active_h4{
    float: left;
    margin-left: 5%;
  }
  #active_h5{
    float: right;
  }
  .active_div{
    height: 125px;
    border-bottom: 1px solid #e3337c;
  }
  .classify-img {
    width: 25%;
    height: 120px;
    float: left;
    margin-left: 6.2%;
  }
  .market{
    width: 100%;
    height: 50px;
  }
  #market_h4{
    float: left;
    margin-left: 5%;
  }
  #market_h5{
    float: left;
    margin-left: 7%;
    margin-bottom: -10px;
  }
  #bottom {
    margin-top: 3%;
    width: 100%;
    height: 35%;
  }
  .goods_list{
    width: 100%;
    height: 570px;
  }
  .item{
    float: left;
    width: 46%;
    height: 250px;
    margin-left: 2.7%;
    margin-top: 10px;
  }
  .bottom-div{
    width: 100%;
    height: 70px;
  }
  .last-trips {
    font-size: 10px;
  }
</style>
