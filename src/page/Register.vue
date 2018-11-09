<template>
  <div class="mobile-wrapper">
    <img src="https://preview.ibb.co/dktKWL/bg-1.jpg">
    <div class="login-wrapper">
      <div class="brand-logo">
        <span>Sign Up For Free</span>
      </div>
      <div class="form-wrapper">
        <div class="input-group">
          <input v-model="userName" type="text" placeholder="Set An UserName">
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Set A Password">
        </div>
        <button v-on:click="register">Register</button>
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
          password: null
        }
      },
      methods: {
        register: function () {
          service('post', '/user/register', {
            userName: this.userName,
            password: md5(this.password)
          }).then(data => {
            if (data.code !== 200 || !data.data) {
              alert(data.message)
            } else {
              this.$router.push({path: '/home'})
            }
          })
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
    color: #46c0c0;
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
    background-color: #46c0c0;
  }

  .form-wrapper {
    width: 100%;
    /*float: left;*/
    margin-top: 3rem;
  }

  .input-group {
    width: 100%;
    float: left;
    margin-bottom: 1rem;
  }

  .input-group label {
    width: 60px;
    height: 60px;
    float: left;
    display: block;
    text-align: center;
    background-color: #0e2c3d;
  }

  .input-group label i {
    display: block;
    line-height: 60px;
    color: #fff;
    font-size: 1.2rem;
  }

  .input-group input {
    width: calc(100% - 60px);
    height: 60px;
    background-color: #0e2c3d;
    color: #7f7f7f;
  }

  .form-wrapper button {
    width: 80%;
    height: 50px;
    background: linear-gradient(to right, #6ddec7, #46c0c0);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
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

</style>
