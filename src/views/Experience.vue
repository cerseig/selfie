<template>
  <div class="experience gui__wrapper">

    <div :class="`experience__scene ${currentStep === STEPS.ANALYSIS ? '' : 'is-active'}`" ref="scene">
      <Decors :isActive="currentStep >= STEPS.DECOR" :decors="decors" :selection="selection.decor" :isChosen="currentStep > STEPS.DECOR " :showAll="currentStep === STEPS.DECOR" />
      <div :class="`avatar ${currentStep >= STEPS.PERSONNALISATION ? 'is-active' : ''}`" ref="avatarElement"></div>
    </div>

    <div :class="`detection ${currentStep === STEPS.ANALYSIS ? 'is-active' : ''}`">
      <Detection :isReady="detection.states.isReady" />
      <DetectionStep v-if="currentStep < STEPS.DECOR" :validateStep="onValidateStep" :isActive="currentStep === STEPS.ANALYSIS" :isReady="detection.states.isReady" :isAnalysed="detection.states.isAnalysed" :positions="detection.positions" :errors="detection.errors" :sizes="detection.resolutionFrameSize" />
    </div>

    <PersonnalisationStep :validateStep="onValidateStep" :isActive="currentStep === STEPS.PERSONNALISATION"  v-if="currentStep < STEPS.POSING" />
    <DecorStep :validateStep="onValidateStep" :isActive="currentStep === STEPS.DECOR" />

    <PosingStep :validateStep="onValidateStep" :isActive="currentStep === STEPS.POSING" :positions="detection.positions" :detectionManager="detectionManager"/>

  </div>
</template>

<script>
// Modules
import DetectionManager from '@/modules/detection/DetectionManager.js'
import PersonnalisationStep from '@/components/personnalisation/PersonnalisationStep'
import DetectionStep from '@/components/experience/DetectionStep'
import DecorStep from '@/components/decor/DecorStep'
import Decors from '@/components/decor/Decors'
import PosingStep from '@/components/experience/PosingStep'
import Detection from '@/components/experience/Detection'

// webgl
import Scene from '@/modules/webgl/Scene.js'

import store from '../store/index'

// Config
import config from '@/config/config'

export default {
  name: 'Experience',
  components: {
    PersonnalisationStep,
    DetectionStep,
    DecorStep,
    PosingStep,
    Detection,
    Decors
  },
  data () {
    return {
      currentStep: 0,
      detection: {
        positions: {},
        resolutionFrame: {},
        resolutionFrameSize: {},
        errors: {
          outOfCamera: false,
          tooClose: false,
          tooFar: false,
          detection: false
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
      },
      detectionManager: null
    }
  },
  methods: {
    initScene () {
      this.scene = new Scene({
        config: config,
        element: this.$refs.avatarElement,
        mode: 'default',
        sizes: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        showDecor: this.currentStep === this.STEPS.DECOR
      })
    },
    initDetectionManager () {
      if (this.currentStep >= this.STEPS.ANALYSIS) {
        this.detectionManager = new DetectionManager({
          camera: document.getElementById('_camera'),
          imageData: document.getElementById('_imageData'),
          pointsData: document.getElementById('_points')
        })
      }
    },
    updateBodyClass () {
      document.querySelector('.nav').classList.add('is-active')
      document.body.className = ''
      if (!this.detection.states.isAnalysed) {
        document.body.classList.add('application')
      }
    },
    updateStoreStep () {
      store.commit('setStep', this.currentStep)
    },
    onValidateStep () {
      this.currentStep++

      this.updateStoreStep()
      if (this.currentStep === this.STEPS.PERSONNALISATION) {
        this.updateBodyClass()
        this.backgroundMusic.playSpriteBackgroundMusic('experience')
      } else if (this.currentStep > this.STEPS.POSING) {
        // todo : camera screenshot
        this.$router.push({ name: 'gallery' })
      }
    },
    setResolutionFrameSize (resolutionFrame) {
      this.detection.resolutionFrameSize = { width: resolutionFrame.width, height: resolutionFrame.height }
    },
    handleSizes () {
      this.detection.resolutionFrame = this.detectionManager.getResolutionFrame()
      this.detection.errors.outOfCamera = this.detectionManager.getOutOfCamera()
      this.detection.errors.tooClose = this.detectionManager.getTooClose()
      this.detection.errors.tooFar = this.detectionManager.getTooFar()

      if (this.detection.errors.outOfCamera === true || this.detection.errors.tooClose === true || this.detection.errors.tooFar === true) {
        this.detection.errors.detection = true
      } else {
        this.detection.errors.detection = false
      }

      if (this.detection.resolutionFrame !== null && this.currentStep === this.STEPS.ANALYSIS) {
        this.setResolutionFrameSize(this.detection.resolutionFrame)
      }
    },
    onPersonnalisationChange (change) {
      this.scene.avatar.personnalisation.handlePersonnalisation(change)
    },
    onDecorChange (change) {
      this.selection.decor = change
    },
    update () {
      this.rafID = requestAnimationFrame(this.update)

      if (this.detectionManager) {
        this.handleSizes()

        if (!this.detection.states.isReady && this.detectionManager.getIsDetectionReady()) {
          this.detection.states.isReady = this.detectionManager.getIsDetectionReady()
        }

        if (!this.detection.states.isAnalysed && this.detectionManager.getIsAnalysed()) {
          this.detection.states.isAnalysed = this.detectionManager.getIsAnalysed()
        }
      }

      if (this.currentStep >= this.STEPS.PERSONNALISATION || this.detectionManager) {
        this.detection.positions = this.detectionManager.getPositions()
      }

      if (this.currentStep >= this.STEPS.PERSONNALISATION) {
        const getDown = this.currentStep >= this.STEPS.DECOR && this.scene.avatar && this.scene.avatar.animations && !this.scene.avatar.animations.isDown
        this.scene.update(this.detection.positions, getDown)
      }
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.step) {
      this.currentStep = this.$route.params.step * 1
    }
    this.updateBodyClass()

    this.$on('Personnalisation:Change', this.onPersonnalisationChange)
    this.$on('Decor:Change', this.onDecorChange)

    this.initDetectionManager()
    this.initScene()

    this.update()
  },
  beforeDestroy () {
    if (this.detectionManager) {
      cancelAnimationFrame(this.rafID)
      this.detectionManager.destroy()
    }
    if (this.stepObject && this.stepObject.sound) {
      this.stepObject.sound.stop()
    }
    if (this.backgroundMusic && this.backgroundMusic.sound) {
      this.backgroundMusic.sound.stop()
    }
  },
  computed: {
    backgroundMusic: () => store.getters.getMusic
  }
}
</script>

<style lang="scss">

.experience {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &__scene {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;

    // display: none;

    &.is-active {
      opacity: 1;
      // display: block;
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
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s .3s;
    z-index: 3;

    &.is-active {
      opacity: 1;
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
