<template>
  <div class="user-info">
    <common-header :title="title" :showback="true"></common-header>
    <div class="userInfo">
      {{ userInfo }}
    </div>
  </div>
</template>

<script>
  import commonHeader from '../components/common-header'
  import {service} from "@/js/api";

  export default {
    data() {
      return {
        title: '我的信息',
        userInfo: null
      }
    },
    created () {
      service('get', 'user/detail', {}).then(response => {
        if (response.code !== 200 || !response.data) {
          alert(response.message);
        }
        this.userInfo = response.data;
      })
    },
    components: {
      commonHeader
    }
  }
</script>

<style scoped>
  .userInfo {
    position: relative;
    top: 20%;
  }
</style>
