<template>
  <div>
    <div class="top_header">
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div class="message">
      <h4 id="message_h4" style="color: #EDEFF2">按照以下步骤完成关注微信公众号<br/>即可获取10个临时算力</h4>
      <div class="message_h5">
        <h5>1. 在微信公众号中搜索“亚欧国际小镇”并关注</h5>
        <h5>2. 在亚欧国际小镇公众号中输入“芝麻开门”获得验证码</h5>
        <h5>3. 在下方输入验证码，验证成功后即可领取算力</h5>
      </div>
      <hr id="message_hr"/>
      <h5 id="message_h5">说明：每个小镇居民仅有一次领取机会</h5>
    </div>
    <div class="code">
      <div>
        <h3>请输入4位验证码</h3>
      </div>
      <div class="code_div" id="wrap">
        <input type='text' name='code[]' class='now' maxlength="1"/>
        <input type='text' name='code[]' class='now' maxlength="1"/>
        <input type='text' name='code[]' class='now' maxlength="1"/>
        <input type='text' name='code[]' class='now' maxlength="1"/>
      </div>
      <button class="code_button" id="button_style">确定</button>
    </div>
  </div>

</template>
<script>
  import commonHeader from '../components/common-header'
  export default {
    data() {
      return {
        title: '关注微信公众号'
      }
    },
    mounted() {
      this.inputCode();
      document.getElementById("button_style").disabled=true;
    },
    methods: {
      inputCode(){
        var txts = wrap.getElementsByTagName("input");
        for(var i = 0; i<txts.length;i++){
          var t = txts[i];
          t.index = i;
          t.setAttribute("readonly", true);
          t.onkeyup=function(){
            this.value=this.value.replace(/^(.).*$/,'$1');
            var next = this.index + 1;
            if(next > txts.length - 1) return;
            txts[next].removeAttribute("readonly");
            txts[next].focus();
          }
        }
        txts[0].removeAttribute("readonly");
      }
    },
    components: {
      commonHeader
    }
  }

</script>
<style scoped="scoped">
  .message{
    width: 100%;
    height:240px;
    background: url("../assets/imgs/background-play.jpg") no-repeat right top;
    position: fixed;
    top: 45px;
  }
  #message_h4{
    width: 300px;
    text-align: center;
    position: fixed;
    left: 14%;
    top: 55px;
  }
  .message_h5{
    text-align: left;
    position: fixed;
    top: 15%;
    left: 5%;
    margin-top: 5px;
  }
  .message_h5 h5{
    color: #EDEFF2;
  }
  #message_hr{
    position: fixed;
    top: 200px;
    height:10px;
    width: 100%;
    border:none;
    border-top:2px dotted #EDEFF2;
  }
  #message_h5{
    position: fixed;
    top: 230px;
    left: 5%;
    color: #EDEFF2;
  }
  .code {
    width: 100%;
    height: 250px;
    position: fixed;
    top: 290px;
  }
  .code_div{
    margin-top: 50px;
  }
  .code_div input{
    font-size: 22px;
  }
  .now{
    width:70px;
    height:50px;
    border:1px #cccccc solid;
    text-align: center;
  }
  .now:focus{
    border:1px #587d18 solid;
  }
  .code_button{
    margin-top: 50px;
    background-color: #e4ad26;
    border-radius: 10px;
    border-color: #EDEFF2;
    width: 300px;
    height: 50px;
  }
</style>
