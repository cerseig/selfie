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
      }
    },
    methods: {
      initPosingStep () {
        this.createStepObject()
      },
      createStepObject () {
        let stepObject = new Step(stepsConfig.posing)
        this.stepObject = stepObject
      }
    },
    mounted () {

    },
    watch: {

    }
  }
</script>
