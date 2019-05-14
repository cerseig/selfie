<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
