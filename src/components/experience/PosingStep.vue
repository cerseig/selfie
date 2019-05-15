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
    methods: {
      initPosingStep () {
        this.createStepObject()
        console.log('init posing step')
      },
      createStepObject () {
        let stepObject = new Step(stepsConfig.posing)
        this.stepObject = stepObject
      },
      launchSound () {
        this.stepObject.init()
        console.log(this.stepObject.subSteps)
      }
    },
    mounted () {
      this.initPosingStep()
    },
    watch: {
    }
  }
</script>

<style lang="scss">

</style>
