<template>
  <!--style="background:url('../../static/image/register.jpg') no-repeat;background-size: contain;"-->
  <div class="mobile-wrapper">
    <!--<img src="https://preview.ibb.co/dktKWL/bg-1.jpg">-->
    <div class="login-wrapper">
      <div class="brand-logo">
        <span>Mall Fun</span>
      </div>
      <div class="form-wrapper">
        <div class="input-group">
          <input v-model="userName" type="text" placeholder="userName">
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="password">
        </div>
        <button id="btn" v-on:click="login" style="background-image: url('../../static/image/button.png'); background-size: contain">LOGIN</button>
      </div>
    </div>
    <div class="help-text">
      <span v-on:click="register">Register</span>
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
        userName: null,
        password: null
      }
    },
    methods: {
      login: function () {
        if (this.userName === null) {
          alert('请输入用户名')
          return
        }
        if (this.userName.length < 3 || this.userName.length > 20) {
          alert('请输入3-20字符内用户名')
          return
        }
        if (this.password === null) {
          alert('请输入密码')
          return
        }
        if (this.password.length < 6 || this.password.length > 16) {
          alert("请输入6-16位的密码")
          return
        }
        service('post', '/user/login', {
          userName: this.userName,
          password: md5(this.password)
        }).then(data => {
          if (data.code !== 200 || !data.data) {
            alert(data.message);
          } else {
            this.$router.push({path: '/login'})
          }
        });
      },
      register: function () {
        this.$router.push({path: '/register'})
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
