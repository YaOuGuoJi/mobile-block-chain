<template>
  <div class="mobile-wrapper">
    <div class="left-icon">
      <span class="icon-back" @click="back">Back</span>
    </div>
    <div class="login-wrapper">
      <div class="brand-logo">
        <span>Sign Up For Free</span>
      </div>
      <div class="form-wrapper">
        <div class="input-group">
          <input v-model="userName" type="text" placeholder="Set An UserName 4-20 character">
        </div>
        <div class="input-group">
          <input v-model="firstPassword" type="password" placeholder="Set A Password 6-16 character">
        </div>
        <div class="input-group">
          <input v-model="secondPassword" type="password" placeholder="Confirm Password" @keyup.enter="register">
        </div>
        <div class="input-group">
          <input v-model="inviteCode" type="text" placeholder="Input Invitation Code"/>
        </div>
        <button v-on:click="register" style="background: url('../../static/image/button.png'); background-size: 100% 100%">Register</button>
      </div>
    </div>
  </div>

</template>

<script>
  import {service} from "../js/api";
  import md5 from 'js-md5'

  export default {
      name: "Register",
      data() {
        return {
          userName: null,
          firstPassword: null,
          secondPassword:null,
          inviteCode: null
        }
      },
      methods: {
        register: function () {
          if (this.userName === null) {
            alert('请输入用户名')
            return
          }
          if (this.userName.length < 3 || this.userName.length > 20) {
            alert('请输入3-20字符内用户名')
            return
          }
          if (this.firstPassword === null) {
            alert('请输入密码')
            return
          }
          if (this.firstPassword.length < 6 || this.firstPassword.length > 16) {
            alert("请输入6-16位的密码")
            return
          }
          if (this.secondPassword === null) {
            alert('请输入确认密码')
            return
          }
          if (this.secondPassword.length < 6 || this.secondPassword.length > 16) {
            alert('请输入6-16位的密码')
            return
          }
          if (this.firstPassword !== this.secondPassword) {
            alert('两次密码输入不一致')
            return
          }
          if (this.inviteCode !== null){
            let telRex =/^[A-Z]{6}$/;
            if (this.inviteCode.length !== 6 || !telRex.test(this.inviteCode)){
              alert('输入的邀请码错误,请确认后再输入')
              return
            }
          }
          service('post', '/user/register', {
            userName: this.userName,
            password: md5(this.secondPassword),
            inviteCode: this.inviteCode === null ? "" : this.inviteCode
          }).then(data => {
            if (data.code !== 200 || !data.data) {
              alert(data.message)
            } else {
              this.$router.push({path: '/home'})
            }
          })
        },
        back: function () {
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>
  .icon-back {
    float: left;
    padding-left: 5%;
    padding-top: 3%;
    color: rgba(255, 232, 140, 0.8);
    font-weight: bold;
    font-size: 0.4rem;
  }

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

  input,
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
    background: #1c485c url("../../static/image/register.jpg");
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
  }


  .input-group {
    position: relative;
    margin-bottom: 45px;
  }

  .input-group input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 300px;
    border: none;
    border-bottom: 1px solid #ffe88c;
    background-color: transparent;
  }

  .input-group input:focus {
    outline: none;
  }

  .form-wrapper button {
    width: 80%;
    height: 50px;
    background-color: rgba(255, 232, 140, 0.2);
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);*/
    color: #fff;
    font-size: 0.5rem;
  }

</style>
