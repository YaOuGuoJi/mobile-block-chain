<template>
  <div id="max">
    <div id="backgroundDiv">
      <img src="../../assets/imgs/backgroud.jpg" id="background"/>
    </div>
    <div id="content">
      <div id="w">
        <div id="powerAll">
          <div id="newWealth"></div>
          <div id="newPower"></div>
        </div>
        <div id="news">
        </div>
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
            <div class="swiper-slide">
              <img src="../../assets/imgs/a.png" @click="getOutLink({name:'购物' ,link:'https://s.click.taobao.com/EfHjHJw'})"/>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/imgs/b.png" @click="getOutLink({name:'看小说' ,link:'http://www.17k.com'})"/>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/imgs/c.png" @click="getOutLink({name:'玩游戏' ,link:'http://www.4399.com'})"/>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/imgs/d.png" @click="getOutLink({name:'看新闻' ,link:'http://www.toutiao.com'})"/>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/imgs/e.png" @click="getOutLink({name:'看视频' ,link:'http://www.youku.com'})"/>
            </div>
            <div class="swiper-slide">
              <img src="../../assets/imgs/f.png"
                   @click="togoPlay()"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {service} from '../../js/api.js'
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    data() {
      return {
        title: '首页',
        num: 0,
        photoPath: ["../../../static/image/one.png", "../../../static/image/two.png", "../../../static/image/three.png", "../../../static/image/four.png", "../../../static/image/five.png", "../../../static/image/six.png", "../../../static/image/seven.png", "../../../static/image/eight.png"],
        message: '请求失败！'
      }
    },

    mounted() {
      this.getInitialise()
      let mySwiper = new Swiper(".swiper-container", {
        // direction: 'vertical',
        loop: "true",
        // effect : 'coverflow',
        slidesPerView: 2,
        freeMode: true,
        // centeredSlides: true,
        watchSlidesProgress: true
      });
    },
    methods: {
      getInitialise() {
        service("get", "/user/oreNumber").then(data => {
          if (data === undefined) {
            return
          }
          if (data.code !== 200) {
            alert(this.message)
          }
          else {
            if (data.data.oreNumber) {
              document.getElementById("newWealth").innerHTML = "<img  src='../../../static/image/money.png' width='12%' height='70%'/>&nbsp;&nbsp;<span>矿石:" + data.data.oreNumber.toFixed(5) + "</span>"
            }
            else {
              document.getElementById("newWealth").innerHTML = "<img  src='../../../static/image/money.png' width='12%' height='70%'/>&nbsp;&nbsp;<span>矿石:0.00000</span>"
            }
          }
        });
        service("get", "/user/power/isValid").then(data => {
          if (data === undefined) {
            return
          }
          if (data.code !== 200) {
            alert(this.message)
          }
          else {
            if (data.data.validPowerSum) {
              document.getElementById("newPower").innerHTML = "<img  src='../../../static/image/resouce.png' width='20%' height='70%'/>&nbsp;&nbsp;<span>算力:" + data.data.validPowerSum.toFixed(0) + "</span>"
            } else {
              document.getElementById("newPower").innerHTML = "<img  src='../../../static/image/resouce.png' width='20%' height='70%'/>&nbsp;&nbsp;<span>算力:0.00000</span>"
            }
          }
        });
        service("get", "/user/unreceived/ore").then(data => {
          if (data === undefined) {
            return
          }
          if (data.code !== 200) {
            alert(this.message)
          }
          else {
            if (data.data) {
              this.getUnreceive(data.data)
            }
          }
        });
        document.getElementById("newWealth").onclick = function () {
          window.location.href = "/ore"
        };
        document.getElementById("newPower").onclick = function () {
          window.location.href = "/power"
        }
      },
      getOutLink(item) {
        this.$router.goLeft({
            path: '/find-classify-link', query: {
              pageTitle: item.name,
              findLink: item.link
            }
          }
        )
      },
      getUnreceive(unreceive) {
        // let photo = ["../../../static/image/one.png", "../../../static/image/two.png", "../../../static/image/three.png", "../../../static/image/four.png", "../../../static/image/five.png", "../../../static/image/six.png", "../../../static/image/seven.png", "../../../static/image/eight.png"];
        let photo=this.photoPath;
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
            oreTable.rows[row].cells[col].innerHTML = "<table><tr><td><img width='100%' height='10%' src='" + this.photoPath[Math.floor(Math.random() * 8)] + "' alt='加载中'/></td></tr></table>" + unreceive[i].ore
            oreTable.rows[row].cells[col].value = unreceive[i].id;
            oreTable.rows[row].cells[col].className="move"
            oreTable.rows[row].cells[col].onclick = function () {
              let inner = this.innerHTML;
              let value = this.value;
              this.className = 'not-received-ore';

              function sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
              }

              sleep(900).then(() => {
                this.innerHTML = '';
                this.value = '';
              });
              this.onclick = '';
              numOfReceive -= 1;
              if (!numOfReceive) {
                sleep(1000).then(() => {
                  let oreTable = document.getElementById("oreId")
                  oreTable.rows[0].cells[0].width = 47;
                  oreTable.rows[0].cells[0].height = 47;
                  document.getElementById("oreId").rows[0].cells[2].innerHTML = "<table><tr><td><img width='30%' height='10%' src='" + photo[Math.floor(Math.random() * 8)] + "' alt='加载中'/></td></tr></table>" + "矿石生成中";
                  document.getElementById("oreId").rows[0].cells[2].className="move";
                })
              }
              service("get", "/user/received/ore", {oreId: value}).then(data => {
                if (data.code != 200) {
                  alert(data.message)
                }
                if (data.code == 200) {
                  let wealthStr = document.getElementById("newWealth").innerHTML;
                  let wealth = (parseFloat(wealthStr.substr(wealthStr.indexOf(":") + 1)) + parseFloat(inner.substr(inner.lastIndexOf(">") + 1))).toFixed(5)
                  document.getElementById("newWealth").innerHTML = wealthStr.substring(0, wealthStr.indexOf(':') + 1) + wealth + "</span>"
                }
              })
            }
          }
        }
        else {
          let oreTable = document.getElementById("oreId")
          oreTable.rows[1].cells[3].width = 47;
          oreTable.rows[1].cells[3].height = 47;
          document.getElementById("oreId").rows[0].cells[2].innerHTML = "<table><tr><td><img width='25%' height='10%' src='" + photo[Math.floor(Math.random() * 8)] + "' alt='加载中'/></td></tr></table>" + "矿石生成中";
          document.getElementById("oreId").rows[0].cells[2].className="move";
        }
      },
      togoPlay() {
        this.$router.togo('/Play')
      }
    }
  }
</script>
<style scoped>

  .not-received-ore {
    animation: slideOut 1s;
    -moz-animation: slideOut 1s;
    -webkit-animation: slideOut 1s;
    -o-animation: slideOut 1s;
  }
    .move{
    position:relative;
    animation:float ease-in-out 3s infinite;
    }

  @keyframes float {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(10px);
      transform: translateY(10px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-400px);
    }
  }

  @-moz-keyframes slideOut {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-400px);
    }
  }

  @-webkit-keyframes slideOut {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-400px);
    }
  }

  @-o-keyframes slideOut {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-400px);
    }
  }

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
    font-size: 70%;}

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
    margin-left: 0;
    padding-left: 0;
    margin-top: 5%;
    width: 100%;
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

  #newWealth {
    padding-top: 3%;
    color: #d2d017;
    margin-top: 1%;
    margin-left: 3%;
    height: 100%;
    width: 45%;
    float: left;
    background-color: rgba(255, 165, 0, 0.3);
    /*border-radius: 5%;*/
    border-radius: 25px;
  }

  #newPower {
    padding-top: 3%;
    color: #d2d017;
    margin-top: 1%;
    margin-left: 3%;
    height: 100%;
    width: 35%;
    float: left;
    background-color: rgba(255, 165, 0, 0.3);
    border-radius:25px;
    /*border-radius: 10%;*/
  }
</style>
