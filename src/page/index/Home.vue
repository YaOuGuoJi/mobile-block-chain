<template>
  <div id="max">
    <div id="ww">
      <common-header :title="title" :showback="false"></common-header>
    </div>
    <div id="w">
      <table id="power">
        <tr>
          <td>力量:{{totalPower}}</td>&nbsp;&nbsp;&nbsp;&nbsp;
          <td>财富:{{totalOre}}</td>
        </tr>
      </table>
      <div id="news"></div>
      <div id="ore">
        <table id="oreId" border="1px">
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </table>
      </div>
      <div id="bottom">
        <div class="swiper-container">
          <div id="header"><img src="../../images/header.png"></div>
          <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="../../images/shouye_nvsheng_washblow_one.png" class="main-img"></div>
            <div class="swiper-slide"><img src="../../images/shouye_nvsheng_washcutblow_two.png" class="main-img"></div>
            <div class="swiper-slide"><img src="../../images/shouye_nvsheng_hairperm_three.png" class="main-img"></div>
            <div class="swiper-slide"><img src="../../images/shouye_nvsheng_hairdye_four.png" class="main-img"></div>
            <div class="swiper-slide"><img src="../../images/shouye_nvsheng_haircare_five.png" class="main-img"></div>
            <div class="swiper-slide"><img src="../../images/shouye_nvsheng_packeage_six.png" class="main-img"></div>
          </div>
        </div>
        <div class="swiper-pagination" id="pagination"></div>
        <div id="footer">
          <img src="../../images/footer.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'
  //import("../../js/swiper.min.js")
  //import("../../js/choumei.min.js")
  import {service} from '../../js/api.js'

  export default {
    data() {
      return {
        title: '首页',
        totalPower: 0,
        totalOre: 0,
        num: 0
      }
    },
    components: {
      commonHeader
    },
    mounted() {
      this.getPower()
    },
    methods: {
      getPower() {
        service("post", "/user/login", {userId: 100001, password: "2198d45569dbbd23dce3a48c77497b59"}).then(data => {
          console.log(data)
        })
        service("get", "/user/oreNumber").then(data => {
          if (data.code != 200) {
            alert(data.message)
          }
          else {
            if (data.data.oreNumber) {
              this.totalOre = data.data.oreNumber
            }
          }
        })
        service("get", "/user/power/isValid").then(data => {
          if (data.code != 200) {
            alert(data.message)
          }
          else {
            if (data.data.validPowerSum) {
            }
            this.totalPower = data.data.validPowerSum
          }
        })
        service("get", "user/unreceived/ore").then(data => {
          if (data.code != 200) {
            alert(data.message)
          }
          else {
            if (data.data) {
              this.getUnreceive(data.data)
            }
          }
        })
      },
      getUnreceive(unreceive) {
        if (unreceive.length != 0) {
          for (let i in unreceive) {
            let oreTable = document.getElementById("oreId");
            let row = 1;
            let col = 3;
            let j=0;
            while (oreTable.rows[row].cells[col].innerHTML!=null) {
              if (j>100)break;
              j++
              row = Math.floor(Math.random() * 4);
              col = Math.floor(Math.random() * 6);
            }
            oreTable.rows[row].cells[col].width=48
            oreTable.rows[row].cells[col].innerHTML= unreceive[i].ore
            oreTable.rows[row].cells[col].value=unreceive[i].id
          }
        }
      }
    }
  }
</script>
<style scoped>
  @import "../../css/choumei.min.css";
  @import "../../css/swiper.min.css";

  #max {
    height: 100%;
    width: 100%;
  }

  #w {
    height: 100%;
    width: 100%;
    padding-top: 55px;
    padding-bottom: 55px;
    font-size: x-small;
  }

  #power {
    font-size: 20px;
    color: #3124f9;
  }

  #oreId {
    width: 100%;
    height: 100%;
    margin-left: 20%;
    margin-top: 10%;
  }

  #ore {
    width: 70%;
    height: 35%;
  }

  #news {
    margin-top: 5%;
    margin-left: 10%;
    width: 80%;
    height: 10%;
    background-color: #121007;
  }

  #bottom {
    margin-top: 10%;
    width: 100%;
    height: 10%;
    background-color: aqua;
  }
</style>
