<template>
  <div v-show="showPage" class="body">
    <div class="top_title">
      <h3 id="title_h3" style="color: #EDEFF2">玩转矿石</h3>
      <h5 id="title_h5" style="color: #EDEFF2">多种玩法，赢矿石、拿现金、享权益</h5>
    </div>
    <div class="attract">
      <div id="attract_img"><img src="../../assets/imgs/attract.png" style="width: 90%; height: 100%;" @click="JoinIn()"/></div>
    </div>
    <div class="market">
      <h4 id="market_h4">商品兑换</h4>
      <h5 id="market_h5">限每人每日一次兑换机会</h5>
    </div>
    <div class="goods_list">
      <div class="item"><a><img src="../../assets/imgs/coupon15.png" style="width: 100%; height: 150px"/></a></div>
      <div class="item"><a><img src="../../assets/imgs/coupon30.png" style="width: 100%; height: 150px"/></a></div>
      <div class="item"><a><img src="../../assets/imgs/coupon50.png" style="width: 100%; height: 150px"/></a></div>
      <div class="item"><a><img src="../../assets/imgs/coupon100.png" style="width: 100%; height: 150px"/></a></div>
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
      JoinIn(){
        this.$router.togo("/JoinIn")
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .body {
    position: absolute;
    width: 100%;
    background: url("../../assets/imgs/play.jpg") no-repeat;
    background-size: 100%;
    height: 800px;
    margin-top: -20px;
  }
  .top_title{
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #e3337c;
    padding-top: 50px;
  }
  #title_h3{
    margin-left: -65%;
  }
  #title_h5{
    margin-left: -35%;
  }
  .attract {
    width: 100%;
    height: 100px;
    margin-top: 20px;
  }
  #attract_img{

  }
  .market{
    width: 100%;
    height: 50px;
    margin-top: 80px;
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
    height: 400px;
  }
  .item{
    float: left;
    width: 46%;
    height: 150px;
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
