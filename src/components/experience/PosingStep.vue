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
      errorPlayed: 0,
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
      console.log('launch error')
      let time = 1000
      if (this.errorPlayed === 0) {
        this.currentStep.status = 'error'
        const timeOut = setTimeout(() => {
          this.stepObject.changeSubStepState(error, () => {
            this.currentStep.status = 'inprogress'
          })
          this.errorPlayed = 1
          clearTimeout(timeOut)
        }, time)
      }
    },
    changeStep () {
      if (this.currentStep.index < this.stepObject.subSteps.length) {
        this.stepObject.changeSubStep()
        this.errorPlayed = 0
      } else {
        this.isPosing = false
      }
      console.log(this.isPosing)
    },
    onMoveFace () {
      console.log(this.currentStep.name)
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
          if ((currentValue > minValue && currentValue < maxValue && rotationCondition) || (expressionCondition && currentValue > minValue)) {
            this.currentStep.status = 'posing'
          } /* else if (currentValue === undefined && rotationCondition) {
            console.log('error opposite')
            this.launchError('errorOpposite')
          } */
          break
        case 'posing':
          console.log('is posing')
          this.currentStep.status = 'done'
          const timeOutDone = setTimeout(() => {
              console.log('done')
              switch (this.currentStep.hasSuccess) {
                case true:
                  console.log('has success')
                  this.stepObject.changeSubStepState('success', () => {
                    this.changeStep()
                  })
                  break
                case false:
                  console.log('has no success')
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
