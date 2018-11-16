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
        <h4>原力分类</h4>
      </div>
      <div class="classify">
        <a href="http://www.taobao.com"><img class="classify-img" src="../../assets/imgs/shopping-cart.png"/></a>
        <a href="https://www.marvel.com"><img class="classify-img" src="../../assets/imgs/entertainment.png"/></a>
        <a href="https://www.battlenet.com.cn/zh/"><img class="classify-img" src="../../assets/imgs/game.png"/></a>
        <a href="http://www.dangdang.com/"><img class="classify-img" src="../../assets/imgs/health.png"/></a>
      </div>
      <div class="recommend">
        <div>
          <h4>推荐原力</h4>
        </div>
        <div class="recommend">
          <div class="recommend-sub">
            <a href="http://www.baidu.com">
              <img class="title-img" src="../../assets/imgs/fiction-li.png"/>
              <span class="title-up">看小说,叱咤风云、称霸武林</span>
            </a>
          </div>
          <div class="div-interval"></div>
        </div>
        <div class="recommend">
          <div class="recommend-sub">
            <a href="http://www.baidu.com">
              <img class="title-img" src="../../assets/imgs/game-li.png"/>
              <span class="title-up">跟好友一起玩游戏</span>
            </a>
          </div>
          <div class="div-interval"></div>
        </div>
        <div class="recommend">
          <div class="recommend-sub">
            <a href="http://www.baidu.com">
              <img class="title-img" src="../../assets/imgs/invite-li.png"/>
              <span class="title-up">邀请好友</span>
            </a>
          </div>
          <div class="div-interval"></div>
        </div>
        <div class="recommend">
          <div class="recommend-sub">
            <a href="http://www.baidu.com">
              <img class="title-img" src="../../assets/imgs/news-li.png"/>
              <span class="title-up">看新闻，了解最新时事动态</span>
            </a>
          </div>
          <div class="div-interval"></div>
        </div>
        <div class="recommend">
          <div class="recommend-sub">
            <a href="http://www.baidu.com">
              <img class="title-img" src="../../assets/imgs/weChat-li.png"/>
              <span class="title-up">关注微信公众号</span>
            </a>
          </div>
          <div class="div-interval"></div>
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
    background: url("../../assets/imgs/oreBackImg.jpg") no-repeat left top;
    width: 100%;
    height: 90%;
  }

  .overview {
    display: none;
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
    color: white;
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
    color: white;
  }

  #userPower {
    font-size: x-large;
  }

  .lottery {
    padding-left: 50%;
    font-size: large;
    color: white;
  }

  .content {
    display: none;
    width: 100%;
    height: 80%;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .content-title {
    text-align: left;
    padding-left: 5%;
    padding-top: 5%;
    font-size: large;
  }

  .classify {
    height: 70px;
  }

  .classify-img {
    width: 20%;
    height: 100%;
    float: left;
    margin-left: 4%;
  }

  .recommend h4 {
    text-align: left;
    padding-left: 5%;
    padding-top: 1%;
    font-size: large;
  }

  .recommend {
    text-align: left;
  }

  .recommend-sub {
    width: 100%;
    height: 60px;
    .title-img {
      width: 20%;
      height: 90%;
      padding-left: 5%;
      vertical-align: middle;
    }
    .title-up {
      font-size: small;
      color: black;
      vertical-align: middle;
    }
  }

  .div-interval {
    width: 90%;
    height: 1px;
    background-color: #c6c6c6;
    margin: 0 auto;
  }


</style>
