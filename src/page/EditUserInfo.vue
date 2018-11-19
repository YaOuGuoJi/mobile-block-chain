<template>
  <div class="user-info">
    <div>
      <div class="header-back-color">
        <router-link tag="a" :to="'/userInfo'">
          <span class="header-back">返回</span>
        </router-link>
        <span style="color: #ff8f47;text-align: center;font-size: 16px;line-height:40px;">
          资料编辑
        </span>
      </div>
      <hr style="background-color: #eef5ed;width: 100%;height: 1px;margin-top: 0;margin-bottom: 0">
      <div style="height: 20px;"></div>
      <div style="text-align:left;width: 100%;">
        <div class="show-text"><label>用户名：</label>
          <input id="userName" type="text" v-model="userName" readonly="readonly"/>
          <span class="userName-point"></span><br/></div>
        <div style="height: 20px;"></div>
        <div class="show-text"><label> 性别：</label>
          <input class="user-sex-boy" type="radio" name="sex" value="1"/>
          <span style="">男</span>
          <input class="user-sex-girl" type="radio" name="sex" value="2"/>
          <span>女</span>
        </div>
        <div style="height: 20px;"></div>
        <div class="show-text"><label>生日：</label>
          <input id="birthday" type="date" v-model="birthday"/><br/></div>
        <div style="height: 35px;"></div>
        <div class="show-text"><label>电话：</label>
          <input id="phone" name="phone" type="text" v-model="phone" @blur.prevent="check_phone()"/><span
            id="err_phone"></span><br/></div>
        <div style="height: 20px;"></div>
        <div class="show-text"><label>邮箱：</label>
          <input id="email" name="email" type="text" v-model="email" @blur.prevent="check_email()"/><span
            id="err_email"></span><br/></div>
        <div style="height: 20px;"></div>
        <div class="show-text"><label>地址：</label>
          <input id="address" type="text" v-model="address" @blur.prevent=""/><span
            id=""></span><br/></div>
        <div style="height: 20px;"></div>
        <div class="show-text"><label>工作：</label>
          <input id="job" type="text" v-model="job" @blur.prevent=""/><br/></div>
      </div>
      <div class="userInfo">
        <!--{{ userInfo }}-->
        <div style="height: 20px;"></div>
        <button class="raise" v-on:click="updateUserInfo()" style="">保存</button>

      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../components/common-header'
  import {service} from "@/js/api";

  export default {
    data() {
      return {
        title: '我的信息',
        userInfo: null,
        userId: null,
        userName: null,
        birthday: null,
        sex: null,
        phone: null,
        email: null,
        job: null,
        address: null,
        motto: null

      }
    },
    created() {
      service('get', 'user/detail', {}).then(response => {
        if (response.code !== 200 || !response.data) {
          alert(response.message);
        }
        this.userInfo = response.data;
        this.userId = this.userInfo.userId
        this.birthday = this.buildBirth(this.userInfo.birthday);
        this.userName = this.userInfo.userName;
        this.sex = this.userInfo.sex;
        let sexInput = document.getElementsByName("sex");
        if (this.sex === 1) {
          sexInput[0].checked = true
        } else {
          sexInput[1].checked = true
        }
        this.phone = this.userInfo.phone
        this.email = this.userInfo.email;
        this.address = this.userInfo.address;
        this.job = this.userInfo.job
      })
    },
    components: {
      commonHeader
    },
    methods: {
      //验证手机号
      check_phone() {
        let phone = document.getElementById("phone").value;
        let regPhone = /[13,15,18]\d{9}/;
        if (phone == "" || phone.trim() == "") {
          document.getElementById("err_phone").innerHTML = "*输入手机号";
          return false;
        } else if (!regPhone.test(phone)) {
          document.getElementById("err_phone").innerHTML = "*不合法";
          document.getElementById("phone").focus();
          return false;
        } else {
          document.getElementById("err_phone").innerHTML = "ok!!!";
          return true;
        }
      },
      //验证邮箱
      check_email() {
        let email = document.getElementById("email").value;
        let regEmail = /^\w+@\w+((\.\w+)+)$/;
        if (email == "" || email.trim() == "") {
          document.getElementById("err_email").innerHTML = "*输入邮箱";
          return false;
        } else if (!regEmail.test(email)) {
          document.getElementById("err_email").innerHTML = "*邮箱不合理";
          document.getElementById("email").focus();
          return false;
        } else {
          document.getElementById("err_email").innerHTML = "ok!!!";
          return true;
        }
      },
      getSex() {
        let radio = document.getElementsByName("sex")
        for (let i = 0; i < radio.length; i++) {
          if (radio[i].checked) {
            return radio[i].value
          }
        }
      },
      updateUserInfo() {
        service('post', '/user/updateInfo', {
          userId: this.userId,
          birthday: this.birthday,
          userName: this.userName,
          sex: this.getSex(),
          phone: this.phone,
          email: this.email,
          address: this.address,
          job: this.job
        }).then(response => {
          if (response.code !== 200 || !response.data) {
            alert(response.message);
            window.location.href = "/editUserInfo"
          }
          window.location.href = "/userInfo"
        })
      },
      buildBirth(str) {
        let date = new Date(str),
          year = date.getFullYear(),
          // 月份从0开始，需要+1
          month = date.getMonth() + 1,
          day = date.getDate();
        return year + '-' +
          (month < 10 ? '0' + month : month) + '-' +
          (day < 10 ? '0' + day : day)

      }
    }
  }
</script>

<style scoped>
  .header-back {
    color: #ffa252;
    font-size: 16px;
    line-height: 40px;
    float: left;
    margin-left: 5%
  }

  .header-back-color {
    background-color: #ffffff;
    width: 100%;
    height: 40px;
    vertical-align: center
  }

  .raise {
    color: black;
    font-size: 16px
  }

  #err_phone {
    font-size: 10px;
    color: #af2e29;
  }

  #err_email {
    font-size: 10px;
    color: #af2e29;
  }

  .show-text {
    background-color: aliceblue;
    border-top: 1px solid #b3b3b3;
    border-bottom: 1px solid #b3b3b3;
  }

  .user-sex-boy {
    width: 16px;
  }

  .user-sex-girl {
    width: 16px;

  }

  .userInfo {
    position: relative;
    top: 20%;
  }

  label {
    display: inline;
    margin-left: 5%;
    background-color: transparent;
    width: 25%;
    height: 45px;
    font-size: 20px;
  }

  input {
    border: 0;
    width: 55%;
    height: 45px;
    font-size: 20px;
    margin-left: 7%;
  }

  span {
    font-size: 20px;
    line-height: 2;
  }
</style>
