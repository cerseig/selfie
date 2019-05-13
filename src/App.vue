<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import store from '@/store/index'
import sprite from '@/config/voiceSprite'
import { Howl } from 'howler'

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
