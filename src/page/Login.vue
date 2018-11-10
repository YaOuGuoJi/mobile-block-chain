<template>
  <div class="mobile-wrapper" style="background:url('../../static/image/register.jpg');background-size: contain;">
    <!--<img src="https://preview.ibb.co/dktKWL/bg-1.jpg">-->
    <div class="login-wrapper">
      <div class="brand-logo">
        <span>Mall Fun</span>
      </div>
      <div class="form-wrapper">
        <div class="input-group">
          <input v-model="userId" type="text" placeholder="userName">
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="password">
        </div>
        <button v-on:click="login" style="background:url('../../static/image/button.png');background-size: contain;">LOGIN</button>
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
        userId: null,
        password: null
      }
    },
    methods: {
      login: function () {
        service('post', '/user/login', {
          userId: this.userId,
          password: md5(this.password)
        }).then(data => {
          if (data.code !== 200 || !data.data) {
            alert(data.message);
          } else {
            this.$router.push({path: '/home'})
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
  /*@charset "UTF-8";*/

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
    background-color: #1c485c;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25), 0 5px 15px 0 rgba(0, 0, 0, 0.25);
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
    background: rgba(255, 232, 140, 0.22);
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);*/
    color: #fff;
    font-size: 0.5rem;
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
