<template>
  <div id="max">
    <div id="ww">
      <common-header :title="title" :showback="false"></common-header>
    </div>
    <div id="w">
      <table id="power">
        <tr>
          <td>力量:{{totalPower}}</td>
          <td>财富:{{totalOre}}</td>
        </tr>
      </table>
      <div id="news"></div>
      <div id="ore">
        <table id="oreId" border="1px">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div id="bottom">

      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'

  export default {
    data() {
      return {
        title: '首页',
        totalPower: null,
        totalOre: null,
        num: 0
      }
    },
    components: {
      commonHeader
    }
  }
</script>
<style scoped>
  #max {
    height: 100%;
    width: 100%;
  }

  #w {
    height: 100%;
    width: 100%;
    padding-top: 55px;
    padding-bottom: 55px;
    font-size: x-small;
  }

  #power {
    font-size: 20px;
    color: #3124f9;
  }
  #oreId{
    width: 100%;
    height: 100%;
    margin-left: 20%;
    margin-top: 10%;
  }
  #ore{
    width: 70%;
    height: 35%;
  }
  #news{
    margin-top: 5%;
    margin-left: 10%;
    width: 80%;
    height: 10%;
    background-color: #121007;
  }
  #bottom{
    margin-top: 10%;
    width: 100%;
    height: 35%;
    background-color: aqua;
  }

</style>
