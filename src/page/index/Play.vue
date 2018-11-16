<template>
  <div class="body">
    <div class="top_title">
      <h3 id="title_h3" style="color: #EDEFF2">玩转矿石</h3>
      <h5 id="title_h5" style="color: #EDEFF2">多种玩法，赢矿石、拿现金、享权益</h5>
    </div>
    <div class="ore_active">
      <h4 id="active_h4" style="color: #EDEFF2">黑钻活动</h4>
      <h5 id="active_h5" style="color: #EDEFF2" v-on:click="getMore()">更多<img class="more" src="../../assets/to.png" style="width: 18px"/></h5>
    </div>
    <div class="active_div">
      <ul class="active_ul">
        <li>111</li>
        <li>222</li>
        <li>333</li>
      </ul>
    </div>
    <div class="market">
      <h4 style="color: #EDEFF2" id="market_h4">小镇集市</h4>
      <h5 style="color: #EDEFF2" id="market_h5">算力达到350方可参与兑换</h5>
    </div>
    <div class="goods_list">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <label class="last-trips">~矿石免费换物~</label>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'

  export default {
    data() {
      return {
        title: '玩转',
        num: 0
      }
    },
    components: {
      commonHeader
    },
    methods: {
      getMore(){
        alert("敬请期待！")
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .body {
    margin-top: -20px;
    width: 100%;
    background: url("../../assets/imgs/background-play.jpg") no-repeat;
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
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #e3337c;
  }
  .active_ul li{
    text-decoration: none;  /*去掉前面的圆点*/
    list-style: none;
    float: left;
    border: 1px solid #FFFFFF;
    background-color: #30DDEB;
    margin-left: 50px;
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
    height: 1000px;
  }
  .item{
    float: left;
    width: 46%;
    height: 250px;
    border: 1px solid #F00;
    border-radius: 20px;
    margin-left: 2.7%;
    margin-top: 10px;
  }
  .last-trips {
    font-size: 10px;
    color: #b3b3b3;
  }
</style>
