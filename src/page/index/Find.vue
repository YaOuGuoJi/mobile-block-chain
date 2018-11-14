<template>
  <div class="find-page">
    <div class="overview">
      <p class="text">
        <span id="main-title">发现原力</span>
        <br/>
        <span>贡献越多原力越多，矿石生长越快</span>
      </p>
      <p class="power">
        <span id="userPower">{{userPower}}</span>
        <span id="powerText">原力值</span>
        <a class="lottery" href="http://www.baidu.com">抽奖大富翁</a>
      </p>
    </div>
    <div class="content">
      <div class="content-title">
        <p>原力分类</p>
      </div>
      <div id="classify">
        <div>
          <a class="" href="http://www.baidu.com"><img src="../../assets/imgs/shopping-cart.png"
                                                       style="width: 15%; height: 15%"/></a>
        </div>
        <div>
          <img class="" src="../../assets/imgs/entertainment.png" style="width: 15%; height: 15%"/>
        </div>
        <div>
          <img src="../../assets/imgs/game.png" style="width: 15%; height: 15%"/>
        </div>
        <div>
          <img src="../../assets/imgs/book.png" style="width: 15%; height: 15%"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'
  import {service} from "../../js/api";

  export default {
    data() {
      return {
        title: '发现',
        num: 0,
        userPower: null
      }
    },
    components: {
      commonHeader
    },
    mounted() {
      this.getUserPower()
    },
    methods: {
      getUserPower: function () {
        service('get', '/user/power/all', {}).then(data => {
          if (data.code !== 200 || !data.data) {
            alert('请求失败')
            return
          } else {
            this.userPower = data.data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .find-page {
    width: 100%;
  }

  .overview {
    width: 100%;
    height: 200px;
    background: url("../../assets/imgs/oreBackImg.jpg");
    background-size: 100% 100%;
    position: relative;
  }

  .text {
    padding-left: 5%;
    padding-top: 10%;
    text-align: left;
  }

  #main-title {
    font-size: x-large;
  }

  .power {
    padding-left: 5%;
    width: 100%;
    position: absolute;
    bottom: -5px;
    text-align: left;
  }

  #userPower {
    font-size: x-large;
  }

  .lottery {
    padding-left: 50%;
    font-size: large;
  }

  .content-title {
    text-align: left;
    padding-left: 5%;
    padding-top: 5%;
    font-size: large;
  }

  .classify {
    float: left;
    width: 100%;
    /*display: flex;*/
    /*justify-content: space-around;*/
    /*align-items: center;*/
  }

  /*.classify img {*/
    /*position: relative;*/
  /*}*/

  /*.classify img {*/
  /*width: 15%;*/
  /*height: 15%;*/
  /*}*/

  /*.find-page {*/

  /*}*/

  /*.find-header {*/

  /*}*/

  /*.overview {*/
  /*display: block;*/
  /*width: 100%;*/
  /*height: 200px;*/
  /*!*float: left;*!*/
  /*background: url("../../assets/imgs/oreBackImg.jpg");*/
  /*background-size: 100% 100%;*/
  /*}*/

  /*#main-title {*/
  /*font-size: x-large;*/
  /*float: left;*/
  /*padding-left: 5%;*/
  /*padding-top: 5%;*/
  /*padding-bottom: -5%;*/
  /*}*/

  /*#subtitle {*/
  /*font-size: small;*/
  /*float: left;*/
  /*padding-left: 5%;*/
  /*}*/

  /*#userPower {*/
  /*font-size: xx-large;*/
  /*}*/

  /*#powerText {*/
  /*font-size: small;*/
  /*}*/

  /*#power {*/
  /*padding-left: 5%;*/
  /*padding-bottom: 5%;*/
  /*text-align: left;*/
  /*}*/

  /*#lottery {*/
  /*float: right;*/
  /*font-size: large;*/
  /*padding-top: 5%;*/
  /*padding-right: 5%;*/
  /*}*/

  /*.content {*/
  /*width: 100%;*/
  /*!*height: 400px;*!*/
  /*}*/

  /*#classify {*/
  /*width: 100%;*/
  /*display: flex;*/
  /*justify-content: space-around;*/
  /*align-items:center;*/
  /*}*/

  /*#classify img {*/
  /*width: 15%;*/
  /*height: 15%;*/
  /*vertical-align: bottom;*/
  /*}*/

  /*#classify a {*/
  /*text-decoration: none;*/
  /*display: inline-block;*/
  /*}*/

</style>
