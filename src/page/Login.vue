<template>
  <div class="mobile-wrapper">
    <div class="login-wrapper">
      <div class="brand-logo">
        <span>Mall Fan</span>
      </div>
      <div class="form-wrapper">
        <div class="input-group">
          <input v-model="phone" type="text" placeholder="请输入手机号" id="phone"
                 onkeyup="value=value.replace(/[^\d]/g,'')"/>
          <input type="image" src="../../static/image/delete.png" id="deleteOne" v-show="phone" v-on:click="deleteOne('phone')"/>
        </div>
        <hr/>
        <div class="input-group">
          <input v-model="verifyCode" type="text" placeholder="短信验证码" @keyup.enter="login" id="verCode"
                 onkeyup="value=value.replace(/[^\d]/g,'')"/>
          <input type="image" src="../../static/image/delete.png" id="deleteTwo" v-show="verifyCode" v-on:click="deleteOne('verifyCode')"/>
          <input type="text" value="获取验证码" readonly id="getCode" v-on:click="getCode"/>
        </div>
        <hr/>
        <div class="input-group">
          <input v-model="inviteCode" type="text" placeholder="邀请码(选填)" id="inviteCode"/>
          <input type="image" src="../../static/image/delete.png" id="deleteThree" v-show="inviteCode" v-on:click="deleteOne('inviteCode')"/>
        </div>
        <hr/>
        <button id="btn" v-on:click="login"
                style="background-image: url('../../static/image/button.png'); background-size: 100% 100%">登录
        </button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import {service} from "../js/api";
  import md5 from 'js-md5'

  export default {
    name: "Login",
    data() {
      return {
        phone: null,
        verifyCode: null,
        inviteCode:null
      }
    },
    methods: {
      getCode: function () {
        if (this.phone.length < 11) {
          alert("请输入正确的手机号");
          return
        }
        console.log(this.phone.toString())
        service('get', '/user/verificationCode', {phoneNum: this.phone.toString()})
          .then(data => {
          console.log(data)
          if (data.code !== 200) {
            alert("请输入正确的手机号")
          }
          else {
            document.getElementById("getCode").value = "重发"
          }
        })
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
          inviteCode:this.inviteCode
        }).then(data => {
          console.log(data)
          if (data.code !== 200 || !data.data) {
            alert(data.message);
          } else {
            this.$router.push({path: '/home'})
          }
        });
      },
      deleteOne(me){
        document.getElementById(me).value="";
        document.getElementById(me).focus();
      },
      deleteTwo(){
        document.getElementById("verCode").value="";
      },
      deleteThree(){
        document.getElementById("inviteCode").value="";
      }
    }
  }

</script>

<style scoped>

  * {
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    width: 100%;
    height: 100vh;
    background: linear-gradient(to right, #6ddec7, #46c0c0);
  }

  button {
    border: 0;
    padding: 0;
    outline: none;
  }

  button {
    cursor: pointer;
  }

  .mobile-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25), 0 5px 15px 0 rgba(0, 0, 0, 0.25);
    background: #1c485c url('../../static/image/register.jpg');
    background-size: 100% 100%;
  }

  .mobile-wrapper img {
    width: 100%;
    height: 100%;
  }

  .login-wrapper {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .brand-logo {
    width: 100%;
    float: left;
    text-align: center;
    color: rgba(87, 15, 18, 0.8);
    font-weight: bold;
    font-size: 1rem;
    position: relative;
  }

  .brand-logo span {
    font-weight: normal;
  }

  .brand-logo::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 4px;
    border-radius: 2px;
    left: 50%;
    bottom: -12px;
    transform: translateX(-50%);
  }

  .form-wrapper {
    width: 100%;
    margin-top: 3rem;
    /*border:1px solid #ffe88c;*/
  }

  .input-group {
    /*position: relative;*/
    /*border:1px solid #ffe88c;*/
    /*margin:0%  15%  15%;*/
    /*border-bottom: 1px solid #ffe88c;*/
    /*margin-bottom: 45px;*/
  }

  hr {
    color: #ffe88c;
    margin: 0 10% 15%;
  }

  .input-group input {
    /*font-size: 18px;*/
    /*padding: 10px 10px 10px 5px;*/
    /*display: inline-block;*/
    /*vertical-align: bottom;*/
    /*width: 50%;*/
    border: none;
    /*border-bottom: 1px solid #ffe88c;*/
    background-color: transparent;
  }

  #phone {
    font-size: 130%;
    width: 90%;
    vertical-align: bottom;
  }

  #deleteOne {
    width: 10%;
    vertical-align: bottom;
  }
  #inviteCode {
    font-size: 130%;
    width: 90%;
    vertical-align: bottom;
  }

  #deleteThree {
    width: 10%;
    vertical-align: bottom;
  }
  #verCode {
    padding: 0;
    font-size: 130%;
    width: 44%;
    vertical-align: bottom;
  }

  #deleteTwo {
    width: 7%;
    vertical-align: bottom;
  }

  #getCode {
    font-size: 130%;
    width: 24%;
    vertical-align: bottom;
    color: grey;
  }

  .input-group input:focus {
    outline: none;
  }

  .form-wrapper button {
    width: 70%;
    height: 50px;
    color: #fff;
    font-size: 0.5rem;
    background: transparent;
    background-size: 100% 100%;
  }

  .help-text {
    width: 100%;
    text-align: center;
    color: #7f7f7f;
    position: absolute;
    bottom: 50px;
    cursor: pointer;
  }

  .help-text span {
    font-size: 0.45rem;
    color: white;
  }
</style>
