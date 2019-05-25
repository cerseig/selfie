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
      this.stepObject = new Step(stepsConfig.posing)
      this.currentStep = this.stepObject.currentSubStep
      this.launchSound()
    },
    launchSound () {
      this.stepObject.init(() => {
        this.currentStep.status = 'inprogress'
      })
    },
    onMoveFace () {
      this.currentStep = this.stepObject.currentSubStep // update current step
      let currentValue = this.positions.events[this.currentStep.name] // update current value of the movement depend on the current event

      let rotationCondition = this.currentStep.type === 'rotation' && this.currentStep.values.max != '' && this.currentStep.values.opposite != ''
      let maxValue = 0
      let minValue = this.currentStep.values.min

      if (rotationCondition) { // get max value when event is a rotation
        maxValue = this.currentStep.values.max
      }

      switch (this.currentStep.status) {
        case 'todo':
          console.log('step in todo')
          this.currentStep.status = 'advice'
          const timeOut = setTimeout(() => {
            this.stepObject.changeSubStepState('advice', () => {
              this.currentStep.status = 'inprogress'
            })
            clearTimeout(timeOut)
          }, 1000)
          break;
        case 'inprogress':
          console.log('step in progress')
          if (rotationCondition) {
            console.log('rotation yes')
            if (currentValue > minValue && currentValue < maxValue) {
              switch (this.currentStep.hasSuccess) {
                case true:
                  console.log('has success')
                  this.currentStep.status = 'done'
                  this.stepObject.changeSubStepState('success', () => {
                    console.log('callback after success audio')
                    this.stepObject.changeSubStep()
                  })
                  break;
                case false:
                  console.log('has no success')
                  this.stepObject.changeSubStep()
                  break;
              }
            } else if (currentValue > maxValue) {
              console.log('error too much')
              this.currentStep.status = 'error'
              this.stepObject.changeSubStepState('errorTooMuch', () => {
                this.currentStep.status = 'inprogress'
              })
            } else if (currentValue === 'undefined') {
              console.log('error opposite')
            }
          } else {
            console.log('expression yes')
          }
          break;
      }
    }
  },
  watch: {
    isActive () {
      this.initPosingStep()
    },
    positions () {
      if (this.isActive) {
        this.onMoveFace()
      }
    }
  }
}
</script>

<style lang="scss">

</style>
