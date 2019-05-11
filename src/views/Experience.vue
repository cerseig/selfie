<template>
  <div class="experience gui__wrapper">
    <div :class="`avatar ${currentStep === 1 ? 'is-active' : ''}`" ref="avatarElement"></div>
    <div :class="['detection']">
      <div :class="['detection__content js-detection', isDebug ? 'is-debug' : '', showCamera ? 'is-camera-shown' : '']">
        <video class="detection__camera" id="_camera"></video>
        <canvas class="detection__image" id="_imageData"></canvas>
        <canvas class="detection__points" id="_points"></canvas>
      </div>
      <div :class="`detection__restriction ${detection.errorDetection === true ? `hasError` : ``} ${currentStep === 0 ? 'is-active' : ''}`"  :style="detection.resolutionFrameSize.width !== null && detection.resolutionFrameSize.height !== null ? {width: detection.resolutionFrameSize.width + 'px', height: detection.resolutionFrameSize.height + 'px'} : {}"></div>
      <div :class="`detection__errors ${currentStep === 0 ? 'is-active' : ''}`">
        <p :class="`detection__message ${detection.outOfCamera === true ? `detection__message--active` : ``}`">
          {{ $t('experience.analyse.errors.outOfCamera') }}
        </p>
        <p :class="`detection__message ${detection.tooClose === true ? `detection__message--active` : ``}`">
          {{ $t('experience.analyse.errors.tooClose') }}
        </p>
        <p :class="`detection__message ${detection.tooFar === true ? `detection__message--active` : ``}`">
          {{ $t('experience.analyse.errors.tooFar') }}
        </p>
      </div>
      <div :class="`detection__check ${currentStep === 0 ? 'is-active' : ''}`" @click="onValidateStep">
        <Icon name="check" width="70" height="70" stroke="#FFFFFF" />
      </div>
    </div>
    <PersonnalisationStep :validateStep="onValidateStep" :class="`${currentStep === 1 ? 'is-active' : ''}`" />
    <div class="">
      <h1>Etape : la pose</h1>
      <a href="#" @click="onValidateStep">{{ $t('experience.personnalisation.nextStep') }} : {{ $t('share.subtitle') }}</a>
    </div>

  </div>
</template>

<script>
// Modules
import DetectionManager from '@/modules/detection/DetectionManager.js'
import PersonnalisationStep from '@/components/personnalisation/PersonnalisationStep'
import Icon from '@/components/icons/Icon.vue'

// webgl
import Scene from '@/modules/webgl/Scene.js'

// Config
import config from '@/config/config'

export default {
  name: 'Experience',
  components: {
    PersonnalisationStep,
    Icon
  },
  data () {
    return {
      isAnalyse: true,
      isDebug: true,
      showCamera: false,
      currentStep: 0,
      detection: {
        resolutionFrame: {},
        resolutionFrameSize: {},
        outOfCamera: false,
        tooClose: false,
        tooFar: false,
        errorDetection: false
      }
    }
  },
  methods: {
    updateBodyClass () {
      document.querySelector('body').className = ''
      if (this.isAnalyse === true) {
        document.querySelector('body').classList.add('application')
      } else {
        document.querySelector('body').classList.add('experience')
      }
    },
    onValidateStep () {
      this.currentStep++

      if (this.currentStep >= 3) {
        // todo : camera screenshot
        this.$router.push({ name: 'gallery' })
      }
    },
    setResolutionFrameSize (resolutionFrame) {
      let coefficient = (document.querySelector('#_points').offsetHeight * 100) / document.querySelector('.detection__content').offsetHeight
      let height = Math.round((((coefficient * 2) * resolutionFrame.height) / 100) + resolutionFrame.height)
      let width = Math.round((((coefficient * 2) * resolutionFrame.width) / 100) + resolutionFrame.width)
      this.detection.resolutionFrameSize = { width: width, height: height }
    },
    handleSizes () {
      this.detection.resolutionFrame = this.detectionManager.getResolutionFrame()
      this.detection.outOfCamera = this.detectionManager.getOutOfCamera()
      this.detection.tooClose = this.detectionManager.getTooClose()
      this.detection.tooFar = this.detectionManager.getTooFar()
      this.isAnalyse = this.detectionManager.getIsAnalyse()

      if (this.detection.outOfCamera === true || this.detection.tooClose === true || this.detection.tooFar === true) {
        this.detection.errorDetection = true
      } else {
        this.detection.errorDetection = false
      }

      if (this.detection.resolutionFrame !== null && this.currentStep === 0) {
        this.setResolutionFrameSize(this.detection.resolutionFrame)
      }
    },
    onPersonnalisationChange (change) {
      this.scene.avatar.handlePersonnalisation(change)
    },
    update () {
      this.rafID = requestAnimationFrame(this.update)

      this.handleSizes()

      if (this.currentStep === 1) {
        this.positions = this.detectionManager.getPositions()
        this.scene.update(this.positions)
      }
    }
  },
  mounted () {
    this.updateBodyClass()

    this.detectionManager = new DetectionManager({
      camera: document.getElementById('_camera'),
      imageData: document.getElementById('_imageData'),
      pointsData: document.getElementById('_points')
    })

    this.$on('Personnalisation:Change', this.onPersonnalisationChange)

    this.scene = new Scene({
      config: config,
      element: this.$refs.avatarElement,
      sizes: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })

    this.update()
  },
  beforeDestroy () {
    if (this.detectionManager) {
      cancelAnimationFrame(this.rafID)
      this.detectionManager.destroy()
    }
  }
}
</script>

<style lang="scss">

.experience {
  width: 100%;
  height: 100%;
  position: relative;

  .avatar {
    border: 2px solid black;
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

    &__content {
      overflow: hidden;
      width: calc(100vw - 20%);
      height: calc(100vh - 25%);
      max-width: 824px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__restriction {
      border: 4px solid $color__white;
      position: absolute;

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

    &__camera {
      display: none;
    }

    &__image {
      position: absolute;
      opacity: 0.5;
      height: 100%;
      z-index: 0;
    }

    &__points {
      position: relative;
      z-index: 1;
    }

    &.is-hidden {
      position: absolute;
      opacity: 0;
    }
  }
}

@media screen and (max-width: 600px){
  .experience {
    .detection {
      &__content {
        width: calc(100vw - 20px);
        height: calc(100vh - 200px);
      }
    }
  }
}

</style>
