<template>
  <div class="ore-page">
    <div class="ore-header">
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div style="height:50px; width:100%"></div>
    <div class="ore-number" style="text-align:left;">
      <br/><br/>
      <span class="ore-number-font" style="font-family: 宋体; font-size:16px; color:white;margin-left: 30px">黑矿总数</span>
      <br/><br/>
      <span style="font-size:40px; color:white;margin-left: 30px">11.0001{{oreNumber}}</span>
    </div>
    <div class="ore-introduction" style="width: 100%;height: 200px">
      <div style="margin-left: 20px;margin-right: 20px">
        控制字体位置可以用padding margin text-indent 单位可以是px em % (em是根据你设置的字体大小设定的，假如你设置字体为12px，那么2em就是24px。 %是根据父容器的宽度或高度决定的。
      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../components/common-header'
  import {service} from '../js/api'

  export default {

    data() {
      return {
        title: '矿石记录',

        userId: 100001,
        oreNumber: null,
      }
    },
    components: {
      commonHeader
    },
    created() {
      this.getOreNumber();
    },
    methods: {
      getOreNumber() {
        service('get','user/oreNumber',{}).then(data =>{
          console.log(data)
        })

      }
    }
  }
</script>
<style>
  .ore-header {
    display: block;
  }

  .ore-number {
    height: 150px;
    width: 100%;
    background-color: #fabd6f;
  }
</style>
