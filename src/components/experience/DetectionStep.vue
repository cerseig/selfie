<template>
  <div :class="`detection__box ${isActive ? 'is-active' : ''}`">
    <div :class="`detection__loader ${isReady && isLoadedAssets ? 'is-ready' : ''}`">
      <div class="loader">
        <img class="loader__gif" :src="`${publicPath}/img/gifs/loader.gif`" alt="Loader">
        <div class="loader__counter">{{counter}}%</div>
        <div class="loader__progressBar"><span class="loader__progression" :style="`width: ${loaderProgression}px;`"></span></div>
      </div>
    </div>
    <div :class="`detection__restriction ${errors.detection ? 'hasError' : ''} ${isAnalyseDone || isAnalyseProgress ? 'is-hidden' : ''}`"  :style="sizes.width !== null && sizes.height !== null ? {width: sizes.width + 'px', height: sizes.height + 'px' } : {}">
      <div class="detection__restriction__container">
        <span><Icon name="corner" width="40" height="40" :fill="`${errors.detection === true ? '#FF0000' : '#FFFFFF'}`" /></span>
        <span><Icon name="corner" width="40" height="40" :fill="`${errors.detection === true ? '#FF0000' : '#FFFFFF'}`" /></span>
        <span><Icon name="corner" width="40" height="40" :fill="`${errors.detection === true ? '#FF0000' : '#FFFFFF'}`" /></span>
        <span><Icon name="corner" width="40" height="40" :fill="`${errors.detection === true ? '#FF0000' : '#FFFFFF'}`" /></span>
      </div>
    </div>
    <div :class="`detection__validate validate ${isStepValidate ? 'is-active' : ''}`">
      <div class="validate__check">
        <Icon name="check" width="80" height="80" fill="#FFFFFF" stroke="#FFFFFF" />
      </div>
    </div>
    <div :class="`detection__analyse analyse ${isAnalyseProgress ? 'is-active' : ''}`">
      <div class="analyse__progressBar"><span class="analyse__progression" :style="`width: ${analyseProgression}%;`"></span></div>
    </div>
  </div>
</template>

<script>
// Modules
import Step from '@/modules/sound/step/Step'
import AssetsLoader from '@/modules/loader/AssetsLoader'
import SoundDesign from '@/modules/sound/soundDesign/SoundDesign'
import BackgroundMusic from '@/modules/sound/backgroundMusic/BackgroundMusic'
import utils from '@/modules/helpers/utils.js'
import Icon from '@/components/icons/Icon.vue'
import store from '@/store/index'

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
      publicPath: process.env.BASE_URL,
      currentStep: {},
      isLoadedAssets: false,
      isStepValidate: false,
      isAnalyseProgress: false,
      isAnalyseDone: false,
      counter: 0,
      errorPlayed: 0,
      loaderProgression: 0,
      checkProgression: 0,
      timeValidation: 0,
      analyseProgression: 0
    }
  },
  methods: {
    initDetectionStep () {
      this.backgroundMusic.playSpriteBackgroundMusic('detection')
      this.stepObject = new Step(stepsConfig.detection)
      this.currentStep = this.stepObject.currentSubStep
      this.soundDesign = new SoundDesign()
    },
    getPositionCenter () {
      this.stepObject.init()
    },
    launchError (error) {
      if (this.errorPlayed === 0) {
        this.currentStep.status = 'error'
        this.stepObject.changeSubStepState(error, () => {
          this.currentStep.status = 'inprogress'
        })
        this.errorPlayed = 1
      }
    },
    changeStep () {
      if (this.currentStep.index < this.stepObject.subSteps.length) {
        this.stepObject.changeSubStep()
        this.errorPlayed = 0
        this.timeValidation = 0
        const timeOut = setTimeout(() => {
          this.isStepValidate = false
          clearTimeout(timeOut)
        }, 1000)
        this.onDetection()
      }
    },
    onDetection () {
      this.currentStep = this.stepObject.currentSubStep // update current step
      let currentValue = this.positions.events[this.currentStep.name] // update current value of the movement depend on the current event
      let maxValue = this.currentStep.values.max
      let minValue = this.currentStep.values.min

      switch (this.currentStep.status) {
        case 'todo':
          this.currentStep.status = 'advice'
          const timeOut = setTimeout(() => {
            this.stepObject.changeSubStepState('advice', () => {
              this.currentStep.status = 'inprogress'
            })
            clearTimeout(timeOut)
          }, 1000)
          break
        case 'inprogress':
          if (this.timeValidation < 30) {
            this.timeValidation = utils.increase(this.timeValidation, 30)
          } else if (this.timeValidation === 30) {
            if ((currentValue > minValue && currentValue < maxValue)) {
              this.currentStep.status = 'posing'
            } else if (currentValue === undefined && this.currentStep.hasErrors) {
              this.launchError('errorOpposite')
            } else if (currentValue > maxValue && this.currentStep.hasErrors) {
              this.launchError('errorTooMuch')
            }
          }
          break
        case 'posing':
          this.currentStep.status = 'done'
          const timeOutDone = setTimeout(() => {
            this.isStepValidate = true
            switch (this.currentStep.hasSuccess) {
              case true:
                if (this.currentStep.name === 'rotationCentered') {
                  this.isStepValidate = false
                  this.stepObject.changeSubStepState('success', () => {
                    this.onProgressStep(4100)
                    this.soundDesign.playSpriteSoundDesign('analyse', () => {
                      this.isAnalyseDone = true
                      this.isAnalyseProgress = false
                      this.isStepValidate = true
                      this.soundDesign.playSpriteSoundDesign('success', () => {
                        this.isStepValidate = false
                        this.stepObject.changeSubStepState('success_transition', () => {
                          this.backgroundMusic.fadeOut(() => {
                            this.stepObject.sound.stop()
                            this.soundDesign.sound.stop()
                            this.backgroundMusic.sound.stop()
                            this.validateStep()
                          })
                        })
                      })
                    })
                  })
                } else {
                  this.soundDesign.playSpriteSoundDesign('validation', () => {
                    this.stepObject.changeSubStepState('success', () => {
                      this.changeStep()
                    })
                  })
                }
                break
              case false:
                this.soundDesign.playSpriteSoundDesign('validation', () => {
                  this.changeStep()
                })
                break
            }
            clearTimeout(timeOutDone)
          }, 1000)
          break
      }
    },
    loader (loading) {
      if (!loading) {
        this.counterMax = Math.round(this.counter + this.stepLoading)
      } else {
        this.counterMax = loading
      }

      let t = setInterval(() => {
        if (this.counter === this.counterMax) {
          clearInterval(t)
        } else {
          this.counter = this.counter + 1
          this.loaderProgression = (document.querySelector('.loader__progressBar').offsetWidth * this.counter) / 100
        }
      }, 30)
    },
    onProgressStep (duration) {
      this.isAnalyseProgress = true
      const time = duration / 100
      let t = setInterval(() => {
        if (this.analyseProgression === 100) {
          clearInterval(t)
        } else {
          this.analyseProgression = this.analyseProgression + 1
        }
      }, time)
    },
    updateStoreStep () {
      store.commit('setStep', 0)
    },
    startExperiment () {
      if (this.isLoadedAssets) {
        this.counter = this.counter + 1
        const timeOut = setTimeout(() => {
          this.updateStoreStep()
          this.getPositionCenter()
          clearTimeout(timeOut)
        }, 1500)
      } else {
        const timeOut = setTimeout(() => {
          this.startExperiment()
          clearTimeout(timeOut)
        }, 100)
      }
    }
  },
  mounted () {
    if (this.isActive) {
      this.initDetectionStep()
      AssetsLoader.loadAssets('image').then(() => {
        this.isLoadedAssets = true
      })
    }
    this.maxStep = 4
    this.stepLoading = 99 / this.maxStep
    window.addEventListener('DetectionInitializer:loading', (index) => {
      this.loader()
    })
  },
  watch: {
    isReady () { // when BRF is ready
      if (this.isReady && this.isActive) {
        this.startExperiment()
      }
    },
    isAnalysed () { // when BRF got initial face values
      if (!this.stepObject.isVoice && this.isAnalysed && this.isActive) {
        this.isStepValidate = true
        this.soundDesign.playSpriteSoundDesign('validation')
        const timeOut = setTimeout(() => {
          this.isStepValidate = false
          clearTimeout(timeOut)
        }, 1000)
        this.stepObject.changeSubStepState('success', () => {
          this.stepObject.changeSubStep()
        })
      }
    },
    positions () {
      if (!this.stepObject.isVoice && this.isActive && this.isAnalysed) {
        this.onDetection()
      }
    }
  },
  computed: {
    backgroundMusic: () => store.getters.getMusic
  }
}
</script>

<style lang="scss">
  .experience-fade-enter {
    .detection__loader {
      .loader__gif,
      .loader__progressBar {
        transform: scale(0);
      }
      .loader__counter {
        opacity: 0;
      }

    }
  }

  .experience-fade-enter-to {
    .detection__loader {
      .loader__gif,
      .loader__progressBar {
        transform: scale(1);
      }
      .loader__counter {
        opacity: 1;
      }

    }
  }

  .detection {

    &__loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $color__blue;
      z-index: 3;
      // transition: opacity 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;

      &.is-ready {
        transition: opacity .3s .3s;
        opacity: 0;

        .loader__gif,
        .loader__progressBar {
          transform: scale(0);
        }
        .loader__counter {
          opacity: 0;
        }
      }

      .loader {
        position: relative;

        &__gif {
          width: 200px;
          height: 200px;
          margin-bottom: 60px;
          transition: transform .3s;
        }

        &__counter {
          font-size: 8rem;
          color: $color__blue--light;
          margin-bottom: 30px;
          transition: opacity .5s;
        }

        &__progressBar {
          position: relative;
          width: 25rem;
          height: 0.5rem;
          background-color: #D9F0FC;
          transition: transform .5s;
        }

        &__progression {
          width: 0;
          position: absolute;
          left: 0;
          top: 0;
          height: 0.5rem;
          background-color: $color__blue--light;
        }

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
      max-height: 500px;

      &.is-hidden {
        display: none;
      }

      &__container {
        width: 100%;
        height: 100%;
        position: relative;

        span {
          display: block;
          position: absolute;
          &:nth-of-type(1) {
            transform: rotate(180deg);
            top: 0;
            left: 0;
          }
          &:nth-of-type(2) {
            transform: rotate(270deg);
            top: 0;
            right: 0;
          }
          &:nth-of-type(3) {
            bottom: 0;
            right: 0;
          }
          &:nth-of-type(4) {
            transform: rotate(90deg);
            bottom: 0;
            left: 0;
          }
        }

      }

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

    &__validate {
      opacity: 0;
      transform: scale(0);
      transition: all .3s ease;

      &.is-active {
        opacity: 1;
        transform: scale(1);
      }

      .validate {

        &__check {
          width: 80px;
          height: 80px;

          position: relative;
          background-color: $color__green--pastel;
          border-radius: 50%;
        }

      }

    }

    &__analyse {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      transition: all .3s ease;

      &.is-active {
        opacity: 1;
        transform: scale(1);
      }

      .analyse {
        position: relative;

        &__progressBar {
          position: relative;
          width: 40rem;
          height: 1rem;
          background-color: $color__gray;
          overflow: hidden;
          border-radius: .5rem;
        }

        &__progression {
          width: 0;
          position: absolute;
          left: 0;
          top: 0;
          height: 1rem;
          background-color: $color__black;
        }

      }

    }

    &__message {
      display: none;

      font-size: 2.5rem;

      &--active {
        display: block;
      }

    }
  }

  @media (min-width: 769px) and (max-width: 1024px)  {
    .detection {
      &__loader {
        .loader {
          &__gif {
            width: 500px;
            height: 500px;
            margin-bottom: 150px;
          }
          &__counter {
            font-size: 15rem;
            color: $color__blue--light;
            margin-bottom: 50px;
          }
          &__progressBar {
            width: 50rem;
            height: 0.5rem;
          }
          &__progression {
            height: 0.5rem;
          }
        }
      }
    }
  }
</style>
