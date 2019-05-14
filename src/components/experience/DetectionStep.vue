<template>
  <div>
  </div>
</template>

<script>
// Modules
import Step from '@/modules/step/Step'
// Config
import stepsConfig from '@/config/steps'

export default {
  name: 'DetectionStep',
  props: {
    isReady: {
      required: false,
      type: Boolean
    },
    isAnalyse: {
      required: false,
      type: Boolean
    },
    positions: {
      required: false,
      type: Object
    },
    validateStep: {
      required: false,
      type: Function
    },
    isActive: {
      required: false,
      type: Boolean
    }
  },
  data () {
    return {
      elementToIncrease: 0,
      positionRight: false
    }
  },
  methods: {
    initDetectionStep () {
      this.createStepObject()
    },
    createStepObject () {
      let stepObject = new Step(stepsConfig.detection)
      this.stepObject = stepObject
    },
    getPositionCenter () {
      this.stepObject.init()
    },
    getPositionRight () { // turn head to the right
      if (this.stepObject.currentSubStep.name === 'right') {
        if (this.positions.rotation.y > this.stepObject.currentSubStep.interval[0] && this.positions.rotation.y < this.stepObject.currentSubStep.interval[1]) {
          this.stepObject.changeSubStep()
          let callAdvice = setTimeout(() => {
            this.stepObject.changeSubStepState('advice', () => {
              window.clearTimeout(callAdvice)
            })
          }, 1000)
        } else if (this.positions.rotation.y > this.stepObject.currentSubStep.interval[1]) {
          this.stepObject.changeSubStepState('errorTooMuch')
        } else if (this.positions.rotation.y < this.stepObject.currentSubStep.oppositeValue) {
          this.stepObject.changeSubStepState('errorOpposite')
        }
      }
    },
    getPositionLeft () { // turn head to the left
      if (this.stepObject.currentSubStep.name === 'left' && this.positions.rotation.y < 0) {
        if (this.positions.rotation.y > this.stepObject.currentSubStep.interval[0] && this.positions.rotation.y < this.stepObject.currentSubStep.interval[1]) {
          this.stepObject.changeSubStep()
          let callAdvice = setTimeout(() => {
            this.stepObject.changeSubStepState('advice', () => {
              window.clearTimeout(callAdvice)
            })
          }, 1000)
        } else if (this.positions.rotation.y > this.stepObject.currentSubStep.oppositeValue) {
          this.stepObject.changeSubStepState('errorOpposite')
        } else if (this.positions.rotation.y < this.stepObject.currentSubStep.interval[1]) {
          this.stepObject.changeSubStepState('errorTooMuch')
        }
      }
    },
    getPositionNormal () { // face to the camera
      if (this.stepObject.currentSubStep.name === 'normal') {
        if (this.positions.rotation.y > this.stepObject.currentSubStep.interval[0] && this.positions.rotation.y < this.stepObject.currentSubStep.interval[1]) {
          let callSuccess = setTimeout(() => {
            this.stepObject.changeSubStepState('success', () => {
              window.clearTimeout(callSuccess)
              this.stepObject.sound.stop()
              this.validateStep()
            })
          }, 2000)
        }
      }
    }
  },
  mounted () {
    if (this.isActive) {
      this.initDetectionStep()
    }
  },
  watch: {
    isReady () {
      if (this.isReady && this.isActive) {
        this.getPositionCenter()
      }
    },
    isAnalyse () {
      if (!this.stepObject.isVoice && this.isAnalyse && this.isActive) {
        this.stepObject.changeSubStepState('success', () => {
          this.stepObject.changeSubStep()
          this.stepObject.changeSubStepState('advice')
        })
      }
    },
    positions () {
      if (!this.stepObject.isVoice && this.isActive) {
        this.getPositionRight()
        this.getPositionLeft()
        this.getPositionNormal()
      }
    }
  }
}
</script>
