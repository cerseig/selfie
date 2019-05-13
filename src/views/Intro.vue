<template>
  <div class="intro">
    <h1 class="intro__animation">A.M.Y</h1>
  </div>
</template>

<script>
import { Howl } from 'howler'
import store from '@/store/index'
import sprite from '@/config/voiceSprite'

export default {
  name: 'intro',
  methods: {
    playIntro () {
      const introSound = this.soundContext.play('intro')
      this.audioId = introSound

      this.soundContext.on('end', () => {
        if (this.audioId === introSound) {
          this.$router.push({ name: 'experience' })
        }
      })
    }
  },
  mounted () {
    store.commit('setCurrentStep', this.intro)
    this.playIntro()
  },
  beforeDestroy () {
    this.soundContext.stop()
  },
  computed: {
    currentStep: () => store.getters.getCurrentStep,
    soundContext: () => store.getters.getSound
  },
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
    }
  }
</style>
