<template>
  <div :class="`detection__box ${isActive ? 'is-active' : ''}`">
    <div :class="`detection__loader ${isReady ? 'is-ready' : ''}`">
      <div class="loader">LOADER</div>
    </div>
    <div :class="`detection__restriction ${errors.detection === true ? `hasError` : ``}`"  :style="sizes.width !== null && sizes.height !== null ? {width: sizes.width + 'px', height: sizes.height + 'px' } : {}"></div>
    <div class="detection__check">
      <Icon name="check" width="70" height="70" fill="#FFFFFF" stroke="#FFFFFF" />
    </div>
  </div>
</template>

<script>
// Modules
import Step from '@/modules/step/Step'
import Icon from '@/components/icons/Icon.vue'
// Config
import stepsConfig from '@/config/steps'

export default {
  name: 'DetectionStep',
  components: {
    Icon
  },
  props: {
    isReady: {
      required: false,
      type: Boolean
    },
    isAnalysed: {
      required: false,
      type: Boolean
    },
    errors: {
      required: false,
      type: Object
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
    },
    sizes: {
      required: false,
      type: Object
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
      this.stepObject = new Step(stepsConfig.detection)
    },
    getPositionCenter () {
      this.stepObject.init()
    },
    getPositionRight () { // turn head to the right
      if (this.stepObject.currentSubStep.name === 'right' && this.isActive) {
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
      if (this.stepObject.currentSubStep.name === 'left' && this.positions.rotation.y < 0 && this.isActive) {
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
        if (this.positions.rotation.y > this.stepObject.currentSubStep.interval[0] && this.positions.rotation.y < this.stepObject.currentSubStep.interval[1] && this.isActive) {
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
    isReady (nextProps) {
      if (this.isReady && this.isActive) {
        const timeOut = setTimeout(() => {
          this.getPositionCenter()
          clearTimeout(timeOut)
        }, 1500)
      }
    },
    isAnalysed () {
      if (!this.stepObject.isVoice && this.isAnalysed && this.isActive) {
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

<style lang="scss">
  .detection {

    &__loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $color__green--pastel;
      z-index: 20;
      transition: opacity 0.3s;

      &.is-ready {
        opacity: 0;
        z-index: 0;
      }

      .loader {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10rem;
        color: $color__black;
        animation: blink 2s infinite;
      }

    }
    &__box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__restriction {
      position: absolute;
      border: 4px solid #FEFEFE;

      &.hasError {
        border-color: red;
      }
    }

    &__errors {
      position: absolute;
      top: 5em;
      left: 50%;
      transform: translateX(-50%);
    }

    &__check {
      position: absolute;
      bottom: 5rem;
      background-color: $color__black;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      cursor: pointer;
    }

    &__message {
      display: none;

      font-size: 2.5rem;

      &--active {
        display: block;
      }

    }
  }
</style>
