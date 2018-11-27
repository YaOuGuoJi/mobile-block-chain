<template>
  <div class="body">
    <div>
      <h3><img src="../assets/imgs/invite-top.png" style="width: 200px; height: 50px"/></h3>
      <h5>亚欧国际小镇，等你来</h5>
    </div>
    <div>
      <div class="invite">
        <h3 id="invite_h3">您的邀请码</h3>
        <div id="invite_codes">{{invite_code}}</div>
        <button id="invite_button" @click="copyToClipboard()">复制</button>
        <h5 id="invite_h5">剩余邀请次数{{count}}次</h5>
        <p id="invite_p">您的邀请码总次数50次</p>
        <div id="QR_code">
          <img src="../assets/imgs/QR-code.png"/>
        </div>
        <h5 id="QR_h5">扫码下载亚欧小镇APP</h5>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return{
        invite_code: 'AAAAAAAA',
        count: 50
      }
    },
    methods: {
      copyToClipboard(){
        var aux = document.createElement("input");
        var content = document.getElementById('invite_codes').innerHTML;
        aux.setAttribute("value", content);
        document.body.appendChild(aux);
        aux.select();
        try{
          document.execCommand('copy');
          document.body.removeChild(aux);
          alert("复制成功")
        }catch(exception){
          alert("复制失败")
        }
      }
    }
  }
</script>
<style>
  .body{
    width: 100%;
    height: 100%;
    background: url("../assets/imgs/background-play.jpg") no-repeat center left;
  }
  .invite{
    background: url("../assets/imgs/invite-center.png") no-repeat;
    background-size: 300px 450px;
    width: 80%;
    height: 450px;
    margin-left: 14%;
  }
  #invite_h3{
    position: fixed;
    margin-left: 20%;
    top: 130px;
  }
  #invite_codes{
    position: fixed;
    top: 200px;
    width: 200px;
    height: 50px;
    margin-left: 12%;
    font-family: verdana, arial, sans-serif;
    font-size: 35px;
    color: darkorange;
  }
  #invite_button{
    position: fixed;
    top: 250px;
    margin-left: -15%;
    width: 80px;
    height: 30px;
    background-color: #e4ad26;
    border-radius: 10px;
    border-color: #EDEFF2;
  }
  #invite_h5{
    position: fixed;
    top: 300px;
    margin-left: 22%;
  }
  #invite_p{
    position: fixed;
    top: 335px;
    margin-left: 21%;
    background-color: khaki;
  }
  #QR_code{
    position: fixed;
    top: 380px;
    margin-left: 23%;
  }
  #QR_h5{
    position: fixed;
    top: 480px;
    margin-left: 17%;
  }
</style>
