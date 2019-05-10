<template>
  <div class="experience">

    <div class="detection">
      <div :class="['detection__content js-detection', isDebug ? 'is-debug' : '', showCamera ? 'is-camera-shown' : '']"></div>
      <div :class="`detection__restriction ${errorDetection === true ? `hasError` : ``}`" :style="resolutionFrameSize.width !== null && resolutionFrameSize.height !== null ? {width: resolutionFrameSize.width + 'px', height: resolutionFrameSize.height + 'px'} : {}"></div>
      <div class="detection__errors">
        <p :class="`detection__message ${outOfCamera === true ? `detection__message--active` : ``}`">
          {{ $t('experience.analyse.errors.outOfCamera') }}
        </p>
        <p :class="`detection__message ${tooClose === true ? `detection__message--active` : ``}`">
          {{ $t('experience.analyse.errors.tooClose') }}
        </p>
        <p :class="`detection__message ${tooFar === true ? `detection__message--active` : ``}`">
          {{ $t('experience.analyse.errors.tooFar') }}
        </p>
      </div>
      <div class="detection__check">
        <Icon name="check" width="70" height="70" stroke="#FFFFFF" />
      </div>
    </div>
    <PersonnalisationStep v-if="currentStep === 0" :validateStep="onValidateStep" />
    <div class="" v-if="currentStep === 1">
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
      resolutionFrame: {},
      resolutionFrameSize: {},
      outOfCamera: false,
      tooClose: false,
      tooFar: false,
      errorDetection: false
    }
  },
  methods: {
    updateBodyClass () {
      document.querySelector('body').className = ""
      if (this.isAnalyse === true) {
        document.querySelector('body').classList.add('application')
      } else {
        document.querySelector('body').classList.add('experience')
      }
    },
    onValidateStep () {
      this.currentStep++

      if (this.currentStep >= 2) {
        // todo : camera screenshot
        this.$router.push({ name: 'gallery' })
      }
    },
    getResolutionFrameSize (resolutionFrame) {
      let coefficient = (document.querySelector('#_points').offsetHeight * 100) / document.querySelector('.detection__content').offsetHeight
      let height = Math.round((((coefficient * 2) * resolutionFrame.height) / 100) + resolutionFrame.height)
      let width = Math.round((((coefficient * 2) * resolutionFrame.width) / 100) + resolutionFrame.width)
      this.resolutionFrameSize = { width: width, height: height }

      return this.resolutionFrameSize
    },
    update () {
      this.resolutionFrame = this.detectionManager.getResolutionFrame()
      this.outOfCamera = this.detectionManager.getOutOfCamera()
      this.tooClose = this.detectionManager.getTooClose()
      this.tooFar = this.detectionManager.getTooFar()
      this.isAnalyse = this.detectionManager.getIsAnalyse()

      if (this.outOfCamera === true || this.tooClose === true || this.tooFar === true) {
        this.errorDetection = true
      } else {
        this.errorDetection = false
      }

      if (this.resolutionFrame !== null) {
        this.getResolutionFrameSize(this.resolutionFrame)
      }

      requestAnimationFrame(this.update)
    }
  },
  mounted () {
    this.updateBodyClass()
    this.detectionManager = new DetectionManager()
    this.update()
  },
  beforeDestroy () {
    if (this.detectionManager) {
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
