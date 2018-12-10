<template>
  <div class="body">
    <div>
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div class="top_table">
      <h3 id="top_h3">亚欧小镇招商信息登记表</h3>
      <h5 id="top_h5">本表格用于入驻星球的商家基本信息统计，需仔细填写，以便后续商家的联系！（每位商家仅填写一份）</h5>
    </div>
    <div class="info">
      <div class="info_div"><span>
        星球账户注册手机号<span style="color: red">*</span></span></div>
      <div>注：该小镇账户用于后续矿石收益发放，请仔细填写</div>
      <input class="info_input" id="registerPhone" v-model="registerPhone"  @blur.prevent="check_phone()"/><span id="err_registerPhone"></span>
      <div class="info_div"><span>商家姓名<span style="color: red">*</span></span></div>
      <input class="info_input" v-model="name"/>
      <div class="info_div"><span>商家联系方式<span style="color: red">*</span></span></div>
      <input class="info_input" id="phone" v-model="phone"  @blur.prevent="check_phones()"/><span id="err_phone"></span>
      <div class="info_div">商家联系微信</div>
      <input class="info_input" v-model="weChat"/>
      <div class="info_div"><span>商家介绍</span></div>
      <div>注：简要介绍商家性质、经营范围、品牌等。（100字内）</div>
      <input class="info_input" v-model="introduce"/>
      <div class="info_div"><span>商品类型<span style="color: red">*</span></span></div>
      <select class="info_input" style="height: 25px" v-model="selected">
        <option v-for="option in options" v-bind:value="option.value">
          {{ option.text }}</option>
      </select>
      <div class="info_div"><span>备注</span></div>
      <input class="info_input" v-model="remarks"/>
      <div class="info_button"><button class="button_style" @click="insertInfo()">提交</button></div>
    </div>
  </div>
</template>
<script>
  import commonHeader from '../components/common-header'
  import {service} from '../js/api'
  import $ from 'jquery'
  export default {
    data() {
      return{
        title: '小镇集市招商信息登记',
        registerPhone: null,
        name: null,
        phone: null,
        weChat: null,
        introduce: null,
        remarks: null,
        selected: null,
        options: [
          { text: '母婴用品', value: '1' },
          { text: '服装箱包', value: '2' },
          { text: '美妆个护', value: '3' },
          { text: '家具家居', value: '4' },
          { text: '数码电器', value: '5' },
          { text: '珠宝文化', value: '6' },
          { text: '其他___', value: '7' }
        ]
      }
    },
    methods: {
      insertInfo(){
        if (this.registerPhone === null || this.name === null || this.phone === null || this.selected === null){
          alert("请完善相关信息，以便我们联系您！");
          return
        }
        service('get', '/businessInfo', {
          registerPhone: this.registerPhone,
          name: this.name,
          phone: this.phone,
          weChat: this.weChat,
          introduce: this.introduce,
          type: this.selected,
          remarks: this.remarks
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("登记成功，稍后会有工作人员与您联系！！！")
        });
      },
      check_phone() {
        let phone = document.getElementById("registerPhone").value;
        let regPhone = /[13,15,18]\d{9}/;
        if (phone === "" || phone.trim() === "") {
          document.getElementById("err_registerPhone").innerHTML = "*输入手机号";
          return false;
        } else if (!regPhone.test(phone)) {
          document.getElementById("err_registerPhone").innerHTML = "*不合法";
          document.getElementById("registerPhone").focus();
          return false;
        } else {
          document.getElementById("err_registerPhone").innerHTML = "ok!!!";
          return true;
        }
      },
      check_phones() {
        let phone = document.getElementById("phone").value;
        let regPhone = /[13,15,18]\d{9}/;
        if (phone === "" || phone.trim() === "") {
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
    },
    components: {
      commonHeader
    }
  }
</script>
<style scoped="scoped">
  .top_table {
    width: 100%;
    height: 140px;
  }
  #top_h3 {
    padding-top: 60px;
  }
  #top_h5 {
    margin-top: 20px;
    width: 330px;
    margin-left: 10%;
  }
  .info {
    width: 100%;
    height: auto;
  }
  .info_div {
    height: 20px;
    background-color: lightgrey;
    margin-top: 25px
  }
  .info_input {
    width: 300px;
    margin-top: 10px;
  }
  .info_button {
    margin-top: 5px;
  }
  .button_style {
    width: 80px;
    height: 30px;
    background-color: lightgrey;
    border-radius: 10px;
    border-color: #EDEFF2;
  }
  #err_phone {
    font-size: 11px;
    color: #af2e29;
  }
</style>
