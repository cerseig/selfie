<template>
  <div class="intro">
    <Icon class="intro__animation" width="500" height="500" name="logo"/>
  </div>
</template>

<script>
// Modules
import AssetsLoader from '@/modules/loader/AssetsLoader'
import BackgroundMusic from '@/modules/sound/backgroundMusic/BackgroundMusic'
import Step from '@/modules/sound/step/Step'
import store from '@/store/index'

// Config
import stepsConfig from '@/config/steps'

// Components
import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'intro',
  components: {
    Icon
  },
  data () {
    return {
      step: stepsConfig.intro
    }
  },
  methods: {
    playIntro () {
      this.stepObject.init(() => {
        this.$router.push({ name: 'experience' })
      })
    },
    createStepObject () {
      let stepObject = new Step(this.step)
      this.stepObject = stepObject
    },
    createMusicObject () {
      this.backgroundMusic = new BackgroundMusic()
      store.commit('setMusic', this.backgroundMusic)
    }
  },
  mounted () {
    AssetsLoader.loadAsset('/img/gifs/loader.gif', 'image')
    this.createMusicObject()
    this.createStepObject()
    this.playIntro()
  },
  beforeDestroy () {
    this.stepObject.sound.stop()
  }
}
</script>

<style lang="scss">
  .intro {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__animation {
      font-size: 15rem;
      animation: blink 2s infinite;
      opacity: 0;
      transition: opacity .5s;
    }
  }

  //Transitions
  .home-fade-enter {
    .intro__animation {
      opacity: 1;
    }
  }

  .experience-fade-leave-active {
    .intro__animation {
      opacity: 0;
    }
  }
</style>
