<template>
  <div class="home">
    <HelloWorld msg="Bienvenue sur le selfie parfait"/>
    {{hairCut}}
  </div>
</template>

<script>

import store from '../store/index'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    hairCut: () => store.state.hairCut
  }
}
</script>
