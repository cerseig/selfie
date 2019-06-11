<template>
  <div class="intro">
    <video :class="`intro__video`" ref="video"  preload playsinline>
      <source class="intro__video--source" :src="`${publicPath}/videos/amy_intro.mp4`" type="video/mp4">
    </video>
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
  props: {
    isIntro: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      step: stepsConfig.intro,
      publicPath: process.env.BASE_URL
    }
  },
  methods: {
    playIntro () {
      this.$refs.video.play()
      this.$refs.video.addEventListener('ended', () => {
        this.$refs.video.pause()
        this.$router.push({ name: 'experience' })
      })
    },
    createMusicObject () {
      this.backgroundMusic = new BackgroundMusic()
      store.commit('setMusic', this.backgroundMusic)
    }
  },
  mounted () {
    AssetsLoader.loadAsset('/img/gifs/loader.gif', 'image')
    this.createMusicObject()
  },
  watch: {
    isIntro () {
      if (this.isIntro) {
        this.playIntro()
      }
    }
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
      transition: opacity .2s .5s;
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
