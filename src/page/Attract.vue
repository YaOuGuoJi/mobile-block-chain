<template>
  <div>
    <div class="top_header">
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div class="top_table">
      <h3 id="top_h3">亚欧小镇招商信息登记表</h3>
      <h5 id="top_h5">本表格用于入驻星球的商家基本信息统计，需仔细填写，以便后续商家的联系！（每位商家仅填写一份）</h5>
    </div>
    <div class="info">
      <div class="info_div"><span>星球账户注册手机号<span style="color: red">*</span></span></div>
      <div>注：该小镇账户用于后续矿石收益发放，请仔细填写</div>
      <input class="info_input" id="phone" v-model="registerPhone"  @blur.prevent="check_phone()"/><span id="err_phone"></span>
      <div class="info_div"><span>商家姓名<span style="color: red">*</span></span></div>
      <input class="info_input" v-model="name"/>
      <div class="info_div"><span>商家联系方式<span style="color: red">*</span></span></div>
      <input class="info_input" v-model="phone"  @blur.prevent="check_phone()"/>
      <div class="info_div">商家联系微信</div>
      <input class="info_input" v-model="weChat"/>
      <div class="info_div"><span>商家介绍</span></div>
      <div>注：简要介绍商家性质、经营范围、品牌等。（100字内）</div>
      <input class="info_input" v-model="introduce"/>
      <div class="info_div"><span>商品类型*</span></div>
      <select class="info_input" style="height: 25px">
        <option>--请选择--</option>
        <option>母婴用品</option>
        <option>服装箱包</option>
        <option>美妆个护</option>
        <option>家具家居</option>
        <option>数码电器</option>
        <option>珠宝文化</option>
        <option>其他___</option>
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
        type: 1
      }
    },
    methods: {
      insertInfo(){
        service('get', '/businessInfo', {
          registerPhone: this.registerPhone,
          name: this.name,
          phone: this.phone,
          weChat: this.weChat,
          introduce: this.introduce,
          type: this.type,
          remarks: this.remarks
        }).then(data => {
        });
      },
      check_phone() {
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
<style>
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
    margin-top: 20px;
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
