<template>
  <div>
    <common-header :title="title" :showback="true"></common-header>
    <div class="top_banner">
      <h5 id="valid_message">{{validMessage}}</h5>
      <h1 id="valid_power_sum">{{validPowerSum}}</h1>
      <ul id="not_valid_sum">
        <li><h5>{{notValidMessage}}</h5></li>
        <li><h5>{{notValidPowerSum}}</h5></li>
      </ul>
    </div>
    <div>
      <ul class="valid_record">
        <li><a href="#valid_record_table">生效中算力记录</a></li>
        <li><a href="#not_valid_record_table">未生效算力记录</a></li>
      </ul>
      <hr>
      <template v-if="">
        <table id="valid_record_table" class="table">
          <tbody>
            <tr v-for="">
              <td>11111111111111111111111</td>
              <td>22211111111111111111111</td>
            </tr>
            <tr>
              <td>333</td>
              <td>444</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template>
        <table id="not_valid_record_table">
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>
<script>
  import commonHeader from '../components/common-header'
  import {service} from '../js/api'

  export default {
    data() {
      return {
        title: "算力记录",
        validMessage: "生效算力值",
        notValidMessage: "未生效算力值",
        validPowerSum: 0,
        notValidPowerSum: 0,
        pageNum: 1,
        pageSize: 20
      }
    },
    created() {
      this.getPowerSum();
      this.getPowerRecord();
    },
    methods: {
      getPowerSum() {
        service('post', '/user/login', {
          userId: 1,
          password: 'liuwen'
        }).then(data => {
          console.log(data)
        })
        service('get', '/user/power/isValid', {}).then(data => {
          console.log(data);
          this.validPowerSum = data.data.validPowerSum;
          this.notValidPowerSum = data.data.notValidPowerSum;
        });
      },

      getPowerRecord() {
        service('get', '/user/power/valid', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(data => {
          console.log(data)
        })
      }
    },
    components: {
      commonHeader
    },
  }
</script>
<style scoped="scoped">
  .top_banner{
    width: 100%;
    height: 25%;
    background-color: #7e8c8d;
  }

  #valid_message{
    position: absolute;
    top: 8%;
    left: 4%;
    float: left;
  }
  #valid_power_sum{
    position: absolute;
    top: 9%;
    left: 4%;
    float: left;
  }
  #not_valid_sum{
    position: absolute;
    top: 20%;
    left: -11%;
  }
  #not_valid_sum li{
    float: left;
    list-style: none;
    margin-left: 20px;
  }
  .valid_record li{
    font-family: verdana,arial,sans-serif;
    font-size:15px;
    float: left;
    list-style: none;
    margin-left: 40px;
  }
  hr{
    border: 0.5px solid;
    width: 100%;
    color: #7e8c8d;
  }
  #valid_record_table{
    /*background-color: cadetblue;*/
    width: 100%;
    height: 200px;
    display: none;
  }
  #not_valid_record_table{
    background-color: lightskyblue;
    width: 100%;
    height: 200px;
    display: none;
  }
  #valid_record_table:target{
    display:block;
  }
  #not_valid_record_table:target{
    display: block;
  }
  a{
    text-decoration: none;
  }
  .table{
    width: 100%;
  }
  .table tr{
    height: 50px;
  }
</style>
