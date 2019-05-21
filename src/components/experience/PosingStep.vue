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
      let currentSubStep = this.stepObject.subSteps[this.i]
      let stepEvent = currentSubStep.name
      let type = currentSubStep.type
    },
    launchSound () {
      this.stepObject.init()
    },
    onStepChange(index) {
      this.event = this.stepObject.subSteps[index].name
      this.type = this.stepObject.subSteps[index].type
    },
    getPosing () {
      if (this.type === 'rotation') {
        if (this.positions.rotation.y > this.currentSubStep.values.max) {
          this.stepObject.changeSubStepState('errorTooMuch')
        } else if (this.positions.rotation.y < this.currentSubStep.values.opposite) {
          this.stepObject.changeSubStepState('errorOpposite')
        }
      } else if (this.type === 'expression') {
      }
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
        this.getPosing()
      }
    }
  }
}
</script>

<style lang="scss">

</style>
