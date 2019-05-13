<template>
  <div>
    {{ isReady }}
  </div>
</template>

<script>
// Modules
import DetectionManager from '@/modules/detection/DetectionManager.js'
import Step from '@/modules/step/Step'
// Config
import stepsConfig from '@/config/steps'

export default {
  name: 'detection',
  props: ['isReady', 'isAnalyse'],
  methods: {
    initDetection () {
      this.createStepObject()
    },
    createStepObject () {
      let stepObject = new Step(stepsConfig.detection)
      this.stepObject = stepObject
    }
  },
  mounted () {
    this.initDetection()
  },
  watch: {
    isReady() {
      if (this.isReady) {
        this.stepObject.init()
      }
    },
    isAnalyse() {
      if (this.isAnalyse) {
        this.stepObject.changeSubStep()
        this.stepObject.playSpriteVoice('advice')
      }
    }
  }
}
</script>
