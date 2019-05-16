<template>
  <div class="experience gui__wrapper">
    <div class="decor__list">
      <div v-for="(decor, index) in decors.list" :key="`background-${index}`" :class="`decor__item ${(selection.decor === decor.title) && (currentStep === STEPS.DECOR) ? 'is-active' : ''}`" :style="{backgroundImage: `url(${decor.background})`}"  :data-decor="decor.title"></div>
    </div>

    <div :class="`avatar ${currentStep === STEPS.PERSONNALISATION || currentStep === STEPS.DECOR || currentStep === STEPS.POSING ? 'is-active' : ''}`" ref="avatarElement"></div>

    <div :class="`detection ${currentStep === STEPS.ANALYSIS ? 'is-active' : ''}`">
      <Detection />
      <DetectionStep :validateStep="onValidateStep" :isActive="currentStep === STEPS.ANALYSIS" :isReady="detection.states.isReady" :isAnalysed="detection.states.isAnalysed" :positions="detection.positions" :errors="detection.errors" :sizes="detection.resolutionFrameSize" />
    </div>

    <PersonnalisationStep :validateStep="onValidateStep" :isActive="currentStep === STEPS.PERSONNALISATION" />
    <DecorStep :validateStep="onValidateStep" :isActive="currentStep === STEPS.DECOR" />
    <PosingStep :validateStep="onValidateStep" :isActive="currentStep === STEPS.POSING" :positions="detection.positions"/>

  </div>
</template>

<script>
// Modules
import DetectionManager from '@/modules/detection/DetectionManager.js'
import PersonnalisationStep from '@/components/personnalisation/PersonnalisationStep'
import DetectionStep from '@/components/experience/DetectionStep'
import DecorStep from '@/components/decor/DecorStep'
import PosingStep from '@/components/experience/PosingStep'
import Detection from '@/components/experience/Detection'

// webgl
import Scene from '@/modules/webgl/Scene.js'

// Config
import config from '@/config/config'

export default {
  name: 'Experience',
  components: {
    PersonnalisationStep,
    DetectionStep,
    DecorStep,
    PosingStep,
    Detection
  },
  data () {
    return {
      isDebug: true,
      currentStep: 0,
      currentStepSprite: [],
      detection: {
        positions: {},
        resolutionFrame: {},
        resolutionFrameSize: {},
        errors: {
          outOfCamera: false,
          tooClose: false,
          tooFar: false,
          detection: false,
        },
        states: {
          isReady: false,
          isAnalysed: false
        }
      },
      selection: {
        decor: config.decors.default
      },
      decors: config.decors,

      STEPS: {
        ANALYSIS: 0,
        PERSONNALISATION: 1,
        DECOR: 2,
        POSING: 3
      }
    }
  },
  methods: {
    updateBodyClass () {
      document.querySelector('.nav').classList.remove('nav--start')
      document.querySelector('body').className = ''
      if (this.detection.states.isAnalysed) {
        document.querySelector('body').classList.add('experience')
      } else {
        document.querySelector('body').classList.add('application')
      }
    },
    onValidateStep () {
      this.currentStep++

      if (this.currentStep === this.STEPS.PERSONNALISATION) {
        this.updateBodyClass()
        if (this.detectionManager) {
          console.error('Bruh');
        }
      }

      // if (this.currentStep === this.STEPS.DECOR) {
      //   this.scene.decors.show()
      // }

      if (this.currentStep >= 3) {
        // todo : camera screenshot
        this.$router.push({ name: 'gallery' })
      }
    },
    setResolutionFrameSize (resolutionFrame) {
      this.detection.resolutionFrameSize = { width: resolutionFrame.width, height: resolutionFrame.height }
    },
    handleSizes () {
      this.detection.resolutionFrame = this.detectionManager.getResolutionFrame()
      this.detection.outOfCamera = this.detectionManager.getOutOfCamera()
      this.detection.tooClose = this.detectionManager.getTooClose()
      this.detection.tooFar = this.detectionManager.getTooFar()

      if (this.detection.outOfCamera === true || this.detection.tooClose === true || this.detection.tooFar === true) {
        this.detection.errors.detection = true
      } else {
        this.detection.errors.detection = false
      }

      if (this.detection.resolutionFrame !== null && this.currentStep === 0) {
        this.setResolutionFrameSize(this.detection.resolutionFrame)
      }
    },
    onPersonnalisationChange (change) {
      this.scene.avatar.personnalisation.handlePersonnalisation(change)
    },
    onDecorChange (change) {
      // this.scene.decors.handleChange(change)
      this.selection.decor = change
    },
    update () {
      this.rafID = requestAnimationFrame(this.update)

      if (this.detectionManager) {
        this.handleSizes()

        if (!this.detection.states.isReady && this.detectionManager.getIsDetectionReady()) {
          this.detection.states.isReady = this.detectionManager.getIsDetectionReady()
        }

        if (this.detectionManager.getIsAnalyse()) {
          this.detection.states.isAnalysed = this.detectionManager.getIsAnalyse()
        }
      }

      if (this.currentStep === this.STEPS.PERSONNALISATION || this.detectionManager) {
        this.detection.positions = this.detectionManager.getPositions()
      }

      if (this.currentStep === this.STEPS.PERSONNALISATION || this.currentStep === this.STEPS.DECOR || this.currentStep === this.STEPS.POSING) {
        this.scene.update(this.detection.positions)
      }
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.step) {
      this.currentStep = this.$route.params.step * 1
    }
    this.updateBodyClass()

    if (this.STEPS.ANALYSIS === this.currentStep || this.STEPS.PERSONNALISATION === this.currentStep) {
      this.detectionManager = new DetectionManager({
        camera: document.getElementById('_camera'),
        imageData: document.getElementById('_imageData'),
        pointsData: document.getElementById('_points')
      })
    }

    this.$on('Personnalisation:Change', this.onPersonnalisationChange)
    this.$on('Decor:Change', this.onDecorChange)

    this.scene = new Scene({
      config: config,
      element: this.$refs.avatarElement,
      mode: 'debug',
      sizes: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      showDecor: this.currentStep === this.STEPS.DECOR
    })

    this.update()
  },
  beforeDestroy () {
    if (this.detectionManager) {
      cancelAnimationFrame(this.rafID)
      this.detectionManager.destroy()
    }
    this.stepObject.sound.stop()
  }
}
</script>

<style lang="scss">

.experience {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .decor {
    &__list {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;

      .decor__item {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0;

        &.is-active {
          opacity: 1;
        }
      }
    }
  }
  .dg.main {
    display: none;
  }

  .avatar {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;

    &.is-active {
      display: block;
    }
  }

  .detection {
    $self: &;
    position:  relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    z-index: 3;

    &.is-active {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>
