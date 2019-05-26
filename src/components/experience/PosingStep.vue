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
      currentStep: {},
      errorPlayed: 0
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
    launchError (error) {
      if (this.errorPlayed === 0) {
        this.currentStep.status = 'error'
        const timeOut = setTimeout(() => {
          this.stepObject.changeSubStepState(error, () => {
            this.currentStep.status = 'inprogress'
          })
          this.errorPlayed = 1
          clearTimeout(timeOut)
        }, 1000)
      }
    },
    changeStep () {
      console.log('change step')
      this.stepObject.changeSubStep()
      this.errorPlayed = 0
    },
    onMoveFace () {
      this.currentStep = this.stepObject.currentSubStep // update current step
      let currentValue = this.positions.events[this.currentStep.name] // update current value of the movement depend on the current event
      let rotationCondition = this.currentStep.type === 'rotation' && this.currentStep.values.max !== '' && this.currentStep.values.opposite !== ''
      // let expressionCondition = this.currentStep.type === 'expression'
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
          break
        case 'inprogress':
          console.log('step in progress')
          if (currentValue > minValue && currentValue < maxValue && rotationCondition) {
            switch (this.currentStep.hasSuccess) {
              case true:
                console.log('has success')
                this.currentStep.status = 'done'
                const timeOut = setTimeout(() => {
                  this.stepObject.changeSubStepState('success', () => {
                    this.changeStep()
                  })
                  clearTimeout(timeOut)
                }, 1000)
                break
              case false:
                console.log('has no success')
                this.changeStep()
                break
            }
          } else if (currentValue > maxValue && rotationCondition) {
            console.log('error too much')
            this.launchError('errorTooMuch')
          } else if (currentValue === undefined && rotationCondition) {
            console.log('error opposite')
            this.launchError('errorOpposite')
          }
          break
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
