<template>
  <div id="app">
    <Nav />
    <transition name="home-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'app',
  data() {
    return {
      transitionName: '',
    }
  },
  components: {
    Nav
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      switch(to.name) {
        case 'intro':
          this.transitionName = 'home-fade'
          break;

        case 'experience':
          this.transitionName = 'experience-fade'
          break;
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

.home-fade-leave-active {
  transition: .7s;
}

.home-fade-enter-active {
  transition: .7s;
}

.experience-fade-leave-active {
  transition: .3s;
}
</style>
