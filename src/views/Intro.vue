<template>
  <div class="intro">
    <h1 class="intro__animation">A.M.Y</h1>
  </div>
</template>

<script>
import store from '@/store/index'
import stepsConfig from '@/config/steps'
import Step from '@/modules/step/Step'

export default {
  name: 'intro',
  data () {
    return {
      step: stepsConfig.intro,
    }
  },
  methods: {
    playIntro () {
      const introSound = this.soundContext.play('intro_intro_advice')
      this.audioId = introSound

      this.soundContext.on('end', () => {
        if (this.audioId === introSound) {
          this.$router.push({ name: 'experience' })
        }
      })
    },
    createStepObject () {
      let stepObject = new Step(this.step)
      store.commit('setCurrentStep', stepObject)
    }
  },
  mounted () {
    this.createStepObject()
    this.playIntro()
  },
  beforeDestroy () {
    this.soundContext.stop()
  },
  computed: {
    currentStepObject: () => store.getters.getCurrentStep,
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
