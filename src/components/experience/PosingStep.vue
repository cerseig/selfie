<template>
  <div :class="`posing ${isActive ? 'is-active' : ''}`">
  </div>
</template>

<script>
// Modules
import Step from '@/modules/step/Step'
import utils from '@/modules/helpers/utils.js'
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
      errorPlayed: 0,
      timeValidation: 0,
      maxLevelError: 1,
      isPosing: true
    }
  },
  methods: {
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
      let time = 500
      this.currentStep.status = 'error'
      if (this.errorPlayed <= this.maxLevelError && this.errorPlayed > 0) {
        this.stepObject.changeSubStepState(`${error}_${this.errorPlayed}`, () => {
          this.currentStep.status = 'inprogress'
          this.timeValidation = 0
        })
        this.errorPlayed++
        if (this.errorPlayed === this.maxLevelError) {
          this.errorPlayed = 0
        }
      } else {
        this.errorPlayed = 1
        const timeOut = setTimeout(() => {
          this.stepObject.changeSubStepState(error, () => {
            this.currentStep.status = 'inprogress'
            this.timeValidation = 0
          })
          this.errorPlayed = 1
          clearTimeout(timeOut)
        }, time)
      }
    },
    changeStep () {
      if ((this.currentStep.index + 1) < this.stepObject.subSteps.length) {
        this.stepObject.changeSubStep()
        this.errorPlayed = 0
        this.timeValidation = 0
      } else {
        this.isPosing = false
      }
    },
    onMoveFace () {
      this.currentStep = this.stepObject.currentSubStep // update current step
      let currentValue = this.positions.events[this.currentStep.name] // update current value of the movement depend on the current event
      let rotationCondition = this.currentStep.type === 'rotation' && this.currentStep.values.max !== '' && this.currentStep.values.opposite !== ''
      let expressionCondition = this.currentStep.type === 'expression'
      let maxValue = 0
      let minValue = this.currentStep.values.min

      if (rotationCondition) { // get max value when event is a rotation
        maxValue = this.currentStep.values.max
      }

      switch (this.currentStep.status) {
        case 'todo':
          this.currentStep.status = 'advice'
          const timeOut = setTimeout(() => {
            this.stepObject.changeSubStepState('advice', () => {
              this.currentStep.status = 'inprogress'
            })
            clearTimeout(timeOut)
          }, 1000)
          break
        case 'inprogress':
          if (this.timeValidation < 40) {
            this.timeValidation = utils.increase(this.timeValidation, 40)
          } else if (this.timeValidation === 40) {
            if ((currentValue > minValue && currentValue < maxValue && rotationCondition) || (expressionCondition && currentValue > minValue)) {
              this.currentStep.status = 'posing'
            } else if (currentValue === undefined && rotationCondition) {
              this.launchError('errorOpposite')
            } else if (currentValue > maxValue && rotationCondition) {
              this.launchError('errorTooMuch')
            } else {
              this.launchError('errorNotEnough')
            }
          }
          break
        case 'posing':
          this.currentStep.status = 'done'
          const timeOutDone = setTimeout(() => {
            switch (this.currentStep.hasSuccess) {
              case true:
                this.stepObject.changeSubStepState('success', () => {
                  this.changeStep()
                })
                break
              case false:
                this.changeStep()
                break
            }
            clearTimeout(timeOutDone)
          }, 1000)
          break
      }
    }
  },
  watch: {
    isActive () {
      this.createStepObject()
    },
    positions () {
      if (this.isActive && this.isPosing) {
        this.onMoveFace()
      }
    }
  }
}
</script>

<style lang="scss">

</style>
