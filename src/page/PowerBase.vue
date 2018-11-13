<template>
  <div class="power-base">
    <common-header :title="title" :showback="true"></common-header>
    <span>暂未开放</span>
  </div>
</template>

<script>
  import commonHeader from '../components/common-header'

  export default {
    data() {
      return {
        title: '算力基地'
      }
    },
    components: {
      commonHeader
    }
  }
</script>

<style scoped>
  span {
    position: fixed;
    left: 40%;
    top: 40%;
    font-size: 20px
  }
</style>
