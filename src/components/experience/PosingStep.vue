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
      this.currentStep = this.stepObject.subSteps[this.i]
      this.currentStepType = this.currentStep.type
      this.launchSound()
    },
    launchSound () {
      this.stepObject.init(() => {
        this.currentStep.status = 'inprogress'
      })
    },
    onStepChange (index) {
      this.currentStepType = this.stepObject.subSteps[index].type
    },
    getPosing () {
      let currentValue = this.positions.events.rotationLeft

      switch (this.currentStepType) {
        case 'rotation':
          let minValue = this.currentStep.values.min
          let maxValue = this.currentStep.values.max
          let oppositeValue = this.currentStep.values.opposite

          if (currentValue > minValue && currentValue < maxValue) {
            switch (this.currentStep.hasSuccess) {
              case true:
                this.stepObject.changeSubStepState('success', () => {
                  this.stepObject.changeSubStep()
                  let callAdvice = setTimeout(() => {
                    this.stepObject.changeSubStepState('advice', () => {
                      window.clearTimeout(callAdvice)
                    })
                  }, 1000)
                })
                break;
              case false:
                console.log(this.stepObject)
                if (this.currentStep.status === 'inprogress') {
                  this.currentStep.status = 'done' // status done
                  this.stepObject.changeSubStep()
                  let callAdvice = setTimeout(() => {
                    this.stepObject.changeSubStepState('advice', () => {
                      window.clearTimeout(callAdvice)
                      this.currentStep.status = 'inprogress'
                    })
                  }, 1000)
                }
                break;
              default:
                console.log('default');
            }
          } else if (currentValue > maxValue) {
            this.stepObject.changeSubStepState('errorTooMuch')
          } else if (currentValue < oppositeValue) {
            this.stepObject.changeSubStepState('errorOpposite')
          }
          break;
        case 'expression':
          console.log('Mangoes and papayas are $2.79 a pound.');
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        default:
          console.log('Oops, a problem appear');
      }
    }
  },
  watch: {
    isActive () {
      this.initPosingStep()
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
