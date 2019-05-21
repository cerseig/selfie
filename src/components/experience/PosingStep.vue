<template>
  <div :class="`posing ${isActive ? 'is-active' : ''}`">
  </div>
</template>

<script>
// Modules
import Step from '@/modules/step/Step'
// Config
import stepsConfig from '@/config/steps'

export default {
  name: 'PosingStep',
  props: {
    validateStep: {
      required: false,
      type: Function
    },
    isActive: {
      required: false,
      type: Boolean
    },
    positions: {
      required: false,
      type: Object
    }
  },
  data () {
    return {
      i: 0
    }
  },
  methods: {
    initPosingStep () {
      this.createStepObject()
    },
    createStepObject () {
      let stepObject = new Step(stepsConfig.posing)
      this.stepObject = stepObject
    },
    launchSound () {
      this.stepObject.init()
    },
    getPosing () {
      console.log(this.stepObject.subSteps[this.i])
      console.log(this.positions)
    }
  },
  mounted () {
    this.initPosingStep()
  },
  watch: {
    isActive () {
      this.launchSound()
    },
    positions () {
      if (this.isActive) {
        this.getPosing
      }
    }
  }
}
</script>

<style lang="scss">

</style>
