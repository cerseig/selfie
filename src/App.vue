<template>
  <div id="app">
    <Nav />
    <transition :name="transitionName" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'app',
  data () {
    return {
      transitionName: ''
    }
  },
  components: {
    Nav
  },
  watch: {
    '$route' (to, from) {
      switch (to.name) {
        case 'intro':
          this.transitionName = 'home-fade'
          break

        case 'experience':
          this.transitionName = 'experience-fade'
          break
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

.home-fade-enter {
  transition: .7s;
}

.experience-fade-enter {
  transition: 20s;
}

.experience-fade-leave-active {
  transition: .3s;
}
</style>
