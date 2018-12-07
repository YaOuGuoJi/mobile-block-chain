<template>
  <div class="find-link">
    <common-header class="common-header" :title="title" :showback="true"></common-header>
    <div style="width: 100%; height: 70px"></div>
    <div class="commodity-list" v-for="commodity in commodityList">
      <div class="commodity" @click="goDetail(commodity.shortUrl)">
        <div class="right">
          <img :src="commodity.mainImageUrl" class="list-image">
        </div>
        <div class="left">
          <div class="list-title"><b>{{commodity.commodityName}}</b></div>
          <span class="list-price">¥ {{commodity.price}}</span>
          <span class="list-sales-volume">销量{{commodity.salesVolume}}</span><br/>
          <span class="list-buy">点击购买</span>
        </div>
      </div>
      <div class="div-interval"></div>
    </div>
  </div>
</template>

<style scoped>
  .find-link {
    background-color: white;
    position: relative;
    width: 100%;
    height: 800px;
  }

  .commodity-list {
    width: 100%;
    height: 120px;
  }

  .commodity {
    width: 100%;
    height: 100px;
  }

  .right {
    width: 30%;
    height: 100%;
    float: left;
  }

  .right img {
    height: 100%;
    width: 90%;
  }

  .left {
    width: 70%;
    height: 100%;
    float: left;
    padding: 5px 5px 5px 5px;
  }

  .list-title {
    width: 100%;
    font-family: "Microsoft Sans Serif";
    font-size: medium;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-price {
    color: red;
    font-size: x-large;
    float: left;
    padding-top: 35px;
  }

  .list-sales-volume {
    color: #c6c6c6;
    float: right;
    padding-right: 5px;
  }

  .list-buy {
    color: red;
    float: right;
    font-size: small;
    padding-top: 26px;
    padding-right: 10px;
  }

  .div-interval {
    width: 100%;
    height: 1px;
    background-color: #c6c6c6;
    margin: 5px auto;
  }

</style>

<script>
  import commonHeader from '../components/common-header'
  import {service} from "../js/api";

  export default {
    data() {
      return {
        title: this.$route.query.pageTitle,
        commodityList: []
      }
    },
    components: {
      commonHeader
    },
    mounted() {
      this.getcommodityList()
    },
    methods: {
      getcommodityList: function () {
        service('get', '/find/commodity', {}).then(data => {
          if (data === undefined) {
            return
          }
          if (data.code !== 200 || !data.data) {
            alert('请求失败')
            return
          } else {
            this.commodityList = data.data;
          }
        })
      },
      goDetail: function (url) {
        this.$router.goLeft({
          path: '/find-link', query: {
            pageTitle: this.title,
            findLink: url
          }
        })
      }
    }
  }
</script>
