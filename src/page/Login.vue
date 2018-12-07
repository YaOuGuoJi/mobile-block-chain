<template>
  <div id="max">
    <div id="backgroundDiv">
      <img src="../assets/imgs/backgroud.jpg" id="background"/>
    </div>
    <div id="content">
      <div id="logo">
        <span id="realLogo">Mall Fan</span>
      </div>
      <div class="inputClass">
        <input v-model="phone" type="text" placeholder="请输入手机号" id="phone"
               onkeyup="value=value.replace(/[^\d]/g,'')" class="one" v-on:focus="flagOne=true" v-on:blur="flagOne=false"/>
        <input type="text" value="" readonly class="two"/>
        <input type="image" src="../../static/image/delete.png" v-show="phone && flagOne"
               v-on:click="deleteOne('a')" class="three"/>
      </div>
      <hr/>
      <div class="inputClass">
        <input v-model="verifyCode" type="text" placeholder="短信验证码" @keyup.enter="login"
               id="verifyCode" onkeyup="value=value.replace(/[^\d]/g,'')" class="one" v-on:focus="flagTwo=true" v-on:blur="flagTwo=false"/>
        <input type="image" src="../../static/image/delete.png" v-show="verifyCode && flagTwo"
               v-on:click="deleteOne('b')" class="three"/>
        <input type="text" value="获取验证码" readonly id="getCode" v-on:click="getCode" class="two"/>
      </div>
      <hr/>
      <div class="inputClass">
        <input v-model="inviteCode" type="text" placeholder="邀请码(选填)" class="one" id="inviteCode" v-on:focus="flagThree=true" v-on:blur="flagThree=false"/>
        <input type="text" value="" readonly class="two"/>
        <input type="image" src="../../static/image/delete.png" v-show="inviteCode && flagThree"
               v-on:click="deleteOne('c')" class="three"/>
      </div>
      <hr/>
      <div id="buttonOne"><span id="buttonContent" v-on:click="login">登录</span></div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import {service} from "../js/api";
  import $ from 'jquery'

  export default {
    name: "Login",
    data() {
      return {
        phone: null,
        verifyCode: null,
        inviteCode: null,
        countdown: 60,
        interval: null,
        flagOne:false,
        flagTwo:false,
        flagThree:false
      }
    },
    methods: {
      getCode: function () {
        if (!this.phone || this.phone.length < 11) {
          alert("请输入正确的手机号");
          return
        }
        service('get', '/user/verificationCode', {phoneNum: this.phone.toString()})
          .then(data => {
            if (data.code !== 200) {
              alert("请输入正确的手机号或稍后再试")
            }
            else {
              $("#verifyCode").focus();
              this.getSuccess();
            }
          })
      },
      getSuccess() {
        if (this.countdown == 0) {
          $("#getCode").removeAttr("disabled");
          $("#getCode").val("获取验证码")
          this.countdown = 60;
          return
        } else {
          $("#getCode").attr("disabled", "disabled");
          $("#getCode").val("重发(" + this.countdown + ")秒");
          this.countdown -= 1;
          setTimeout(() => {
            this.getSuccess();
          }, 1000);
        }
      },
      deleteOne(me){
        switch (me){
          case 'a': this.phone=null;
            $("#phone").focus();
            break;
          case 'b': this.verifyCode=null;
            $("#verifyCode").focus();
            break;
          case 'c':this.inviteCode=null;
            $("#inviteCode").focus();
            break;
        }
      },
      login: function () {
        if (this.phone === null || this.verifyCode === null) {
          alert('请完成所有输入再登录')
          return
        }
        if (this.verifyCode.length !== 6 || this.phone < 11) {
          alert('手机号或验证码不正确')
          return
        }
        service('post', '/user/verification', {
          phoneNum: this.phone,
          code: this.verifyCode,
          inviteCode: this.inviteCode
        }).then(data => {
          if (data.code !== 200 || !data.data) {
            alert(data.message);
          } else {
            this.$router.push({path: '/home'})
          }
        });
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

  #logo {
    width: 100%;
    height: 40%;
  }

  #realLogo {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 350%;
    /*font-style:italic;*/
    font-family: 宋体;
    padding-top: 35%;
    color: rgba(87, 15, 18, 0.8);
    vertical-align: bottom;
  }

  .inputClass {
    padding: 10% 12% 0;
    vertical-align: bottom;
    outline: none;
    font-size: 150%;
    width: 100%;
    height: 10%;
  }

  .inputClass input {
    font-family: 宋体;
    border: none;
    background-color: transparent;
    vertical-align: bottom;
  }

  .inputClass input:focus {
    outline: none;
  }

  .one {
    width: 38%;
  }

  .two {
    width: 33%;
  }

  .three {
    width: 8%;
    height: 75%;
  }

  #getCode {
    color: grey;
  }

  hr {
    margin: -1% 15%;
  }

  #buttonOne {
    width: 100%;
    height: 20%;
  }

  #buttonContent {
    display: inline-block;
    margin-top: 17%;
    width: 40%;
    line-height: 200%;
    font-size: 200%;
    font-family: 宋体;
    border-radius: 25px;
    background-color: rgba(238, 154, 73, 0.2);
    border:1px solid 	#EE7942;
    color: white;
  }
  #getCode{
    background-color: rgba(	255, 255, 0 ,0.5);
    border-radius: 12px;
    padding:1% 2% 0;
  }

</style>
