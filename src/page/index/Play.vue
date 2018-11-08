<template>
  <div>
    <common-header :title="title" :showback="false"></common-header>
  </div>
</template>

<script>
  import commonHeader from '../../components/common-header'

  export default {
    data() {
      return {
        title: '玩转',
        num: 0
      }
    },
    components: {
      commonHeader
    }
  }
</script>
