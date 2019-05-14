<template>
  <div>
    {{ positions }}
  </div>
</template>

<script>
// Modules
import DetectionManager from '@/modules/detection/DetectionManager.js'
import Step from '@/modules/step/Step'
// Config
import stepsConfig from '@/config/steps'
import sprite from '@/config/voiceSprite'
import store from '@/store/index'
import utils from '@/modules/helpers/utils.js'

export default {
  name: 'detection',
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
    validateDetection: {
      required: false,
      type: Function
    }
  },
  data () {
    return {
      elementToIncrease: 0
    }
  },
  methods: {
    initDetection () {
      this.createStepObject()
    },
    createStepObject () {
      let stepObject = new Step(stepsConfig.detection)
      this.stepObject = stepObject
    },
    getPositionRight () {
      // turn head to the right
      if (this.stepObject.currentSubStep.name === 'right') {
        if (this.positions.rotation.y > this.stepObject.currentSubStep.interval[0] && this.positions.rotation.y < this.stepObject.currentSubStep.interval[1]) {
            this.stepObject.changeSubStep()
            this.stepObject.changeSubStepState('advice')
        } else if (this.positions.rotation.y < -0.2) {
          this.stepObject.changeSubStepState('errorOpposite')
        } else if (this.positions.rotation.y > this.stepObject.currentSubStep.interval[1]) {
          this.stepObject.changeSubStepState('errorTooMuch')
        }
      }
    },
    getPositionLeft () {
      // turn head to the left
      if (this.stepObject.currentSubStep.name === 'left') {
        if (this.positions.rotation.y < this.stepObject.currentSubStep.interval[0] && this.positions.rotation.y > this.stepObject.currentSubStep.interval[1]) {
          this.stepObject.changeSubStep()
          this.stepObject.changeSubStepState('advice')
        } else if (this.positions.rotation.y > 0.1) {
          this.stepObject.changeSubStepState('errorOpposite')
        } else if (this.positions.rotation.y < this.stepObject.currentSubStep.interval[1]) {
          this.stepObject.changeSubStepState('errorTooMuch')
        }
      }
    },
    getPositionNormal () {
      // face to the camera
      if (this.stepObject.currentSubStep.name === 'normal') {
        if (this.positions.rotation.y > this.stepObject.currentSubStep.interval[0] && this.positions.rotation.y < this.stepObject.currentSubStep.interval[1]) {
          let callSuccess = setTimeout(() => {
            this.stepObject.changeSubStepState('success', () => {
              window.clearTimeout(callSuccess)
              this.stepObject.sound.stop()
              this.validateDetection()
            })
          }, 3000)
        }
      }
    }
  },
  mounted () {
    /* TO REMOVE AFTER TEST */
    const source = '/sounds/voice_fr.mp3'
    this.sound = new Howl({
      src: [source],
      sprite: sprite
    })
    store.commit('setSound', this.sound)
    console.log(store.getters.getSound)

    this.initDetection()
  },
  watch: {
    isReady() {
      if (this.isReady) {
        this.stepObject.init()
      }
    },
    isAnalyse() {
      if (!this.stepObject.isVoice && this.isAnalyse) {
        this.stepObject.changeSubStep()
        this.stepObject.changeSubStepState('advice')
      }
    },
    positions() {
      if (!this.stepObject.isVoice) {
        this.getPositionRight()
        this.getPositionLeft()
        this.getPositionNormal()
      }
    }
  }
}
</script>
