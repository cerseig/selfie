<template>
  <nav class="nav">
    <SVGSprite />
  </nav>
</template>

<script>

import SVGSprite from '@/components/icons/SVGSprite.vue'

export default {
  name: 'Nav',
  components: {
    SVGSprite
  }
}

</script>

<style scoped lang="scss">

  .nav {
    position: fixed;
    width: 100%;
    height: 100px;
  }

</style>
