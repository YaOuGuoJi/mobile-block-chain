<template>
  <div class="header-box">
    <div class="left-icon">
      <span v-if="showback" @click="back" class="icon-back"></span>
    </div>
    <div class="header-tittle">
      <span>{{title}}</span>
    </div>
    <div class="right-icon">
      <span v-if="showmore" class="icon"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      title: {
        type: String,
        default: '标题'
      },
      showback: {
        type: Boolean,
        default: true
      },
      showmore: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      back() {
        this.$router.goBack()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../styles/index.less";
  @import "../styles/variable.less";

  .header-box {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .h(100);
    .lh(100);
    background-color: @base-color;
    color: @base-header-color;
    .fs(@base-header-size);
    display: flex;
    .left-icon {
      position: relative;
      flex: 1;
      .icon-back {
        position: absolute;
        display: inline-block;
        .w(50);
        .h(50);
        .left(25);
        .top(25);
        background-image: url("../assets/imgs/w-back.svg");
        background-size: cover;
      }
    }
    .header-tittle {
      flex: 3;
    }
    .right-icon {
      position: relative;
      flex: 1;
      .icon {
        position: absolute;
        display: inline-block;
        .w(50);
        .h(50);
        .right(25);
        .top(25);
        background-image: url("../assets/imgs/more.svg");
        background-size: cover;
      }
    }
  }
</style>

<style scoped lang="less">
  @import "../styles/index.less";
  @import "../styles/variable.less";
</style>
