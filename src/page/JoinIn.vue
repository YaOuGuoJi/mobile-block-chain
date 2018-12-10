<template>
  <div>
    <div class="top_header">
      <common-header :title="title" :showback="true"></common-header>
    </div>
    <div class="body_img">
      <button class="button_style" @click="goAttract()">申请入驻</button>
    </div>
  </div>
</template>
<script>
  import commonHeader from '../components/common-header'
  export default {
    data(){
      return{
        title: '火热招商'
      }
    },
    methods: {
      goAttract(){
        this.$router.togo("/Attract")
      }
    },
    components: {
      commonHeader
    }
  }
</script>
<style scoped>
  .body_img {
    background: url("../assets/imgs/joinIn.jpg") no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    margin-top: 50px;
  }
  .button_style {
    width: 300px;
    height: 35px;
    background-color: #e4ad26;
    border-radius: 20px;
    border-color: deeppink;
    margin-top: 370px;
    color: #af3a59;
    font-size: 16px;
  }
</style>
