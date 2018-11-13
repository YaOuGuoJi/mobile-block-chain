<template>
  <div id="max">
    <div id="backgroundDiv">
      <img src="../../assets/imgs/backgroud.jpg" id="background"/>
    </div>
    <div id="content">
      <div id="w">
        <div id="powerAll">
          <!--<table id="power">-->
            <!--<tr>-->
              <!--<td></td>-->
              <!--<td></td>-->
            <!--</tr>-->
          <!--</table>-->
          <div id="newWealth"></div>
          <div id="newPower"></div>
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
            <div class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/a.png"/></a></div>
            <div class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/b.png"/></a></div>
            <div class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/c.png"/></a></div>
            <div class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/d.png"/></a></div>
            <div class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/e.png"/></a></div>
            <div class="swiper-slide"><a href="http://localhost:8080/Home"><img
              src="../../assets/imgs/f.png"/></a></div>
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
        photoPath: ["../../../static/image/one.png","../../../static/image/two.png","../../../static/image/three.png","../../../static/image/four.png","../../../static/image/five.png","../../../static/image/six.png","../../../static/image/seven.png","../../../static/image/eight.png"]
      }
    },
    components: {
      commonHeader
    },
    mounted() {
      this.getInitialise()
      let mySwiper = new Swiper(".swiper-container", {
        loop: "true",
        // effect : 'coverflow',
        slidesPerView: 2,
        freeMode : true,
        centeredSlides: false,
        watchSlidesProgress: true
      });
    },
    methods: {
      getInitialise() {
        service("get", "/user/oreNumber").then(data => {
          if (data.code != 200) {
            alert(data.message)
          }
          else {
            if (data.data.oreNumber) {
              document.getElementById("newWealth").innerHTML="<span>财富:"+data.data.oreNumber.toFixed(5)+"</span>"
            }
            else {
              document.getElementById("newWealth").innerHTML="<span>财富:0.00000</span>"
            }
          }
        })
        service("get", "/user/power/isValid").then(data => {
          if (data.code != 200) {
            alert(data.message)
          }
          else {
            if (data.data.validPowerSum) {
              document.getElementById("newPower").innerHTML="<span>力量:"+data.data.validPowerSum.toFixed(0)+"</span>"
            } else {
              document.getElementById("newPower").innerHTML = "<span>力量:0.00000</span>"
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
        let photo=["../../../static/image/one.png","../../../static/image/two.png","../../../static/image/three.png","../../../static/image/four.png","../../../static/image/five.png","../../../static/image/six.png","../../../static/image/seven.png","../../../static/image/eight.png"];
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
            oreTable.rows[row].cells[col].height = 47;
            oreTable.rows[row].cells[col].innerHTML="<table><tr><td><img width='100%' height='10%' src='"+this.photoPath[Math.floor(Math.random() * 8)]+"' alt='加载中'/></td></tr></table>"+ unreceive[i].ore
            oreTable.rows[row].cells[col].value = unreceive[i].id;
            oreTable.rows[row].cells[col].onclick = function () {
              let inner=this.innerHTML;
              let value=this.value;
              this.innerHTML='';
              this.value='';
              this.onclick='';
              numOfReceive -= 1;
              if (!numOfReceive) {
                let oreTable = document.getElementById("oreId")
                oreTable.rows[0].cells[0].width = 47;
                oreTable.rows[0].cells[0].height = 47;
                document.getElementById("oreId").rows[0].cells[2].innerHTML ="<table><tr><td><img width='25%' height='10%' src='"+photo[Math.floor(Math.random() * 8)]+"' alt='加载中'/></td></tr></table>"+"财富生成中";
              }
              service("get", "user/received/ore", {oreId: value}).then(data => {
                if (data.code != 200) {
                  alert(data.message)
                }
                if (data.code == 200) {
                  let wealthStr = document.getElementById("newWealth").innerHTML;
                  let wealth = (parseFloat(wealthStr.substr(wealthStr.indexOf(":") + 1)) + parseFloat(inner.substr(inner.lastIndexOf(">") + 1))).toFixed(5)
                  document.getElementById("newWealth").innerHTML = "<span>"+wealthStr.substring(wealthStr.indexOf('>')+1, wealthStr.indexOf(':')+1 ) + wealth+"</span>"
                }
              })
            }
          }
        }
        else {
          let oreTable = document.getElementById("oreId")
          oreTable.rows[1].cells[3].width = 47;
          oreTable.rows[1].cells[3].height = 47;
          document.getElementById("oreId").rows[0].cells[2].innerHTML = "<table><tr><td><img width='25%' height='10%' src='"+photo[Math.floor(Math.random() * 8)]+"' alt='加载中'/></td></tr></table>"+"财富生成中";
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
  }

  #content {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
  }

  #w {
    height: 100%;
    width: 100%;
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
    margin-top: 2%;
    width: 100%;
    height: 35%;
  }

  #powerAll {
    font-size: 180%;
    width: 100%;
    height: 7%;
  }

  .swiper-slide img {
    /*padding: 1%;*/
    width: 100%;
    height: 100%;
  }

  #oreId img {
    height: 5%;
    width: 10%;
  }
  #newWealth{
    padding-top: 3%;
    color: #d2d017;
    margin-top: 1%;
    margin-left: 3%;
    height: 100%;
    width: 40%;
    float: left;
    background-color: rgba(	255,165,0,0.3);
    border-radius: 5%;
  }
  #newPower{
    padding-top: 3%;
    color: #d2d017;
    margin-top: 1%;
    margin-left: 3%;
    height: 100%;
    width: 35%;
    float: left;
    /*background-color: rgba(	255,165,0,0.3);*/
    border-radius: 5%;
    background: url("../../assets/imgs/power.png") no-repeat left top;
  }
</style>
