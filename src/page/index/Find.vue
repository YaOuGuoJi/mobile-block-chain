<template>
  <div class="find-page">
    <div class="overview">
      <p class="text">
        <span id="main-title">发现算力</span>
        <br/>
        <span>贡献越多算力越多，矿石生长越快</span>
      </p>
      <p class="power">
        <span id="userPower">{{userPower}}</span>
        <span id="powerText">算力值</span>
        <a class="lottery" href="http://www.baidu.com">抽奖大富翁</a>
      </p>
    </div>
    <div class="content">
      <div class="content-title">
        <h4>算力分类</h4>
      </div>
      <div class="classify">
        <img v-for="item in findClassify" class="classify-img" :src="item.img" @click="showClassifyIgrame(item)"/>
      </div>
      <div class="recommend">
        <div>
          <h4>推荐算力</h4>
        </div>
        <div class="recommend-li">
          <div v-for="item in webAddress">
            <div class="recommend-sub" @click="showIframe(item)">
              <img class="title-img" :src="item.img"/>
              <span class="title-up">{{item.name}}</span>
            </div>
            <div class="div-interval"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'
  import {service} from "../../js/api";
  import fiction from '../../assets/imgs/fiction-li.png'
  import game from '../../assets/imgs/game-li.png'
  import invite from '../../assets/imgs/invite-li.png'
  import news from '../../assets/imgs/news-li.png'
  import weChat from '../../assets/imgs/weChat-li.png'
  import shoppingCart from '../../assets/imgs/shopping-cart.png'
  import entertainment from '../../assets/imgs/entertainment.png'
  import classifyGame from '../../assets/imgs/game.png'
  import health from '../../assets/imgs/health.png'

  export default {
    data() {
      return {
        title: '发现',
        num: 0,
        userPower: null,
        webAddress: [
          {
            name: '看小说',
            link: 'http://m.yznnw.com/',
            img: fiction
          },
          {
            name: '游戏',
            link: 'http://www.4399.com',
            img: game
          },
          {
            name: '邀请好友',
            link: '/invite',
            img: invite
          },
          {
            name: '新闻',
            link: 'http://www.toutiao.com',
            img: news
          },
          {
            name: '关注微信公众号',
            link: '/getWeChat',
            img: weChat
          }
        ],
        findClassify: [
          {
            name: '购物',
            link: 'http://www.taobao.com',
            img: shoppingCart
          },
          {
            name: '娱乐',
            link: 'https://music.163.com/',
            img: entertainment
          },
          {
            name: '游戏',
            link: 'http://www.4399.com',
            img: classifyGame
          },
          {
            name: '健康',
            link: 'https://www.iqiyi.com/lib/',
            img: health
          }
        ]
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
          if (data === undefined) {
            return
          }
          if (data.code !== 200 || !data.data) {
            alert('请求失败')
            return
          } else {
            this.userPower = data.data
          }
        })
      },
      showIframe: function (item) {
        this.$router.goLeft({
          path: '/find-link', query: {
            pageTitle: item.name,
            findLink: item.link
          }
        });
      },
      showClassifyIgrame: function (item) {
        this.$router.goLeft({
          path: 'find-classify-link', query: {
            pageTitle: item.name,
            findClassifyLink: item.link
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
    width: 100%;
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
