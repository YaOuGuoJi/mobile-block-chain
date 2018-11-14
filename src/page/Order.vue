<template>
  <div class="order-list">
    <common-header :title="title" :showback="true"></common-header>
    <div class="no-order">
      <img class="image" src="../assets/order.png"/>
      <span>没有订单</span>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../components/common-header'

  export default {
    data() {
      return {
        title: '我的订单'
      }
    },
    components: {
      commonHeader
    }
  }
</script>

<style scoped>

  .order-list {
    width: 100%;
    height: 100%;
  }

  .no-order {
    position: fixed;
    top: 30%;
    left: 30%;
  }

  .image {
    width: 100px;
    height: 100px;
  }

  span {
    font-size: 20px;
  }
</style>
