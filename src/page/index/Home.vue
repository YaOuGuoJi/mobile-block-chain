<template>
  <div id="max">
    <div id="backgroundDiv">
      <img src="../../assets/imgs/backgroud.jpg" id="background"/>
    </div>
    <div id="content">
      <div id="ww">
        <common-header :title="title" :showback="false"></common-header>
      </div>
      <div id="w">
        <div id="powerAll">
          <table id="power">
            <tr>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div id="news"></div>
        <div id="ore">
          <table id="oreId">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div id="bottom" class="swiper-container">
          <div class="swiper-wrapper">
            <div id="first" class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/picture.jpg"/></a></div>
            <div id="second" class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/picture.jpg"/></a></div>
            <div id="third" class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/picture.jpg"/></a></div>
            <div id="fourth" class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/picture.jpg"/></a></div>
            <div id="fifth" class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/picture.jpg"/></a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'
  import {service} from '../../js/api.js'
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    data() {
      return {
        title: '首页',
        num: 0,
      }
    },
    components: {
      commonHeader
    },
    mounted() {
      this.getInitialise()
      let mySwiper = new Swiper(".swiper-container", {
        loop: "true",
        effect : 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,
        watchSlidesProgress: true,
        allowTouchMove: true,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }
      });
    },
    methods: {
      getInitialise() {
        service("post", "/user/login", {userId: 100001, password: "2198d45569dbbd23dce3a48c77497b59"}).then(data => {
        })
        service("get", "/user/oreNumber").then(data => {
          if (data.code != 200) {
            alert(data.message)
          }
          else {
            let power = document.getElementById("power");
            power.rows[0].cells[0].width = 80;
            if (data.data.oreNumber) {
              power.rows[0].cells[0].innerHTML = "财富:" + data.data.oreNumber;
            }
            else {
              power.rows[0].cells[0].innerHTML = "财富:0.0000";
            }
          }
        })
        service("get", "/user/power/isValid").then(data => {
          if (data.code != 200) {
            alert(data.message)
          }
          else {
            let power = document.getElementById("power");
            power.rows[0].cells[1].width = 80;
            if (data.data.validPowerSum) {
              power.rows[0].cells[1].innerHTML = "力量:" + data.data.validPowerSum
            } else {
              power.rows[0].cells[1].innerHTML = "力量:0.00000"
            }
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
        if (unreceive.length > 0) {
          let numOfReceive = unreceive.length
          for (let i in unreceive) {
            let oreTable = document.getElementById("oreId");
            let row = 1;
            let col = 3;
            while (oreTable.rows[row].cells[col].innerHTML != '') {
              row = Math.floor(Math.random() * 4);
              col = Math.floor(Math.random() * 6);
            }
            oreTable.rows[row].cells[col].width = 47;
            oreTable.rows[row].cells[col].innerHTML = unreceive[i].ore;
            oreTable.rows[row].cells[col].value = unreceive[i].id;
            oreTable.rows[row].cells[col].onclick = function () {
              service("get", "user/received/ore", {oreId: this.value}).then(data => {
                if (data.code != 200) {
                  alert(data.message)
                }
                if (data.code == 200) {
                  let wealthStr = document.getElementById("power").rows[0].cells[0].innerHTML
                  let wealth = parseFloat(wealthStr.substr(wealthStr.indexOf(":") + 1)) + parseFloat(this.innerHTML)
                  document.getElementById("power").rows[0].cells[0].width = 80
                  document.getElementById("power").rows[0].cells[0].innerHTML = wealthStr.substr(0, wealthStr.indexOf(":") + 1) + wealth;
                }
                this.innerHTML = '';
                this.value = '';
                this.onclick = "";
                numOfReceive -= 1;
                if (!numOfReceive) {
                  let oreTable = document.getElementById("oreId")
                  oreTable.rows[1].cells[3].width = 47;
                  document.getElementById("oreId").rows[1].cells[3].innerHTML = "<img src='../../assets/imgs/water.png'/>财富生成中";
                }
              })
            }
          }
        }
        else {
          let oreTable = document.getElementById("oreId")
          oreTable.rows[1].cells[3].width = 47;
          document.getElementById("oreId").rows[1].cells[3].innerHTML = "<img src='../../assets/imgs/water.png'/>财富生成中";
        }
      }
    }
  }
</script>
<style scoped>
  #max {
    height: 100%;
    width: 100%;
  }

  #backgroundDiv {
    position: absolute;
    z-index: 0;
    height: 100%;
    width: 100%;
  }

  #background {
    height: 100%;
    width: 100%;
    padding-top: 7%;
  }

  #bottom img {
    height: 100%;
    width: 100%;
  }

  #content {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
  }

  #w {
    height: 100%;
    width: 100%;
    padding-top: 55px;
    padding-bottom: 50px;
    font-size: x-small;
  }

  #power {
    font-size: 200%;
    color: #ff6d1f;
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
  }

  #bottom {
    margin-top: 5%;
    width: 100%;
    height: 30%;
    touch-action: none;
  }

  #powerAll {
    width: 100%;
    height: 7%;
  }

  #power {
    width: 55%;
    height: 100%;
    margin-left: 0;
    padding-left: 0;
  }

  .swiper-slide {
    padding: 0.5%;
    width: 40%;
    height: 100%;
    padding-bottom: 10%;
  }
</style>
