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
      i: 0,
      currentStep: {},
      stepName: '',
      stepType: ''
    }
  },
  methods: {
    initPosingStep () {
      this.createStepObject()
    },
    createStepObject () {
      let stepObject = new Step(stepsConfig.posing)
      this.stepObject = stepObject
      this.currentStep = this.stepObject.subSteps[this.i]
      this.currentStepName = this.currentSubStep.name
      this.currentStepType = this.currentSubStep.type
    },
    launchSound () {
      this.stepObject.init()
    },
    onStepChange(index) {
      this.currentStepName = this.stepObject.subSteps[index].name
      this.currentStepType = this.stepObject.subSteps[index].type
    },
    getPosing () {
      let currentValue = this.positions.events.rotationLeft
      if (this.currentStepType === 'rotation') {
        let minValue = this.currentStep.values.min
        let maxValue = this.currentStep.values.max
        let oppositeValue = this.currentStep.values.opposite

        if (currentValue > minValue && currentValue < maxValue) {
          if (this.currentStep.hasSuccess) {

          }
          this.stepObject.changeSubStep()
          let callAdvice = setTimeout(() => {
            this.stepObject.changeSubStepState('advice', () => {
              window.clearTimeout(callAdvice)
            })
          }, 1000)
        } else if (currentValue > maxValue) {
          this.stepObject.changeSubStepState('errorTooMuch')
        } else if (currentValue < oppositeValue) {
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
