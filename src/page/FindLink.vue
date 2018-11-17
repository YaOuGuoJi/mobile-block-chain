<template>
  <div class="find-link">
    <common-header :title="title" :showback="true"></common-header>
    <div class="iFrame">
      <iframe id="show-iFrame" frameborder="0" name="showHere" scrolling="auto" :src="url"></iframe>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../components/common-header'

  export default {
    data() {
      return {
        title: this.$route.query.pageTitle,
        url: this.$route.query.findLink
      }
    },
    components: {
      commonHeader
    }
  }
</script>

<style scoped>
  .find-link {
    position: relative;
    width: 100%;
    height: 681px;
  }

  .iFrame {
    position: relative;
    top: 55px;
    height: 100%;
  }

  #show-iFrame {
    width: 100%;
    height: 100%;
  }

</style>
