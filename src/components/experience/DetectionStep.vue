<template>
  <div :class="`detection__box ${isActive ? 'is-active' : ''}`">
    <div :class="`detection__loader ${isReady ? 'is-ready' : ''}`">
      <div class="loader">
        <img class="loader__gif" :src="`${publicPath}/img/gifs/loader.gif`" alt="Loader">
        <div class="loader__counter">{{counter}}%</div>
        <div class="loader__progressBar"><span class="loader__progression" :style="`width: ${loaderProgression}px;`"></span></div>
      </div>
    </div>
    <div :class="`detection__restriction ${errors.detection === true ? `hasError` : ``}`"  :style="sizes.width !== null && sizes.height !== null ? {width: sizes.width + 'px', height: sizes.height + 'px' } : {}">
      <div class="detection__restriction__container">
        <span><Icon name="corner" width="40" height="40" :fill="`${errors.detection === true ? '#FF0000' : '#FFFFFF'}`" /></span>
        <span><Icon name="corner" width="40" height="40" :fill="`${errors.detection === true ? '#FF0000' : '#FFFFFF'}`" /></span>
        <span><Icon name="corner" width="40" height="40" :fill="`${errors.detection === true ? '#FF0000' : '#FFFFFF'}`" /></span>
        <span><Icon name="corner" width="40" height="40" :fill="`${errors.detection === true ? '#FF0000' : '#FFFFFF'}`" /></span>
      </div>
    </div>
    <div class="detection__check">
      <div class="detection__check--progressRound"></div>
      <div class="detection__check--progression" :style="`height: ${checkProgression}px;`"></div>
      <Icon name="check" width="70" height="70" fill="#FFFFFF" stroke="#FFFFFF" />
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
      counter: 0,
      errorPlayed: 0,
      loaderProgression: 0,
      checkProgression: 0,
      timeValidation: 0
    }
  },
  methods: {
    initDetectionStep () {
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
            switch (this.currentStep.hasSuccess) {
              case true:
                if (this.currentStep.name === 'rotationCentered') {
                  let callSuccess = setTimeout(() => {
                    this.soundDesign.playSpriteSoundDesign('analyse', () => {
                      this.updateCheckProgression()
                      this.soundDesign.playSpriteSoundDesign('success', () => {
                        this.stepObject.changeSubStepState('success', () => {
                          window.clearTimeout(callSuccess)
                          this.backgroundMusic.fadeOut(() => {
                            this.stepObject.sound.stop()
                            this.soundDesign.sound.stop()
                            this.backgroundMusic.sound.stop()
                            this.validateStep()
                          })
                        })
                      })
                    })
                  }, 500)
                } else {
                  this.updateCheckProgression()
                  this.soundDesign.playSpriteSoundDesign('validation', () => {
                    this.stepObject.changeSubStepState('success', () => {
                      this.changeStep()
                    })
                  })
                }
                break
              case false:
                this.updateCheckProgression()
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
    loader (step) {
      console.log(step)
      if (step === 0) {
        let t = setInterval(() => {
          if (this.counter === 50) {
            clearInterval(t)
          } else {
            this.counter = this.counter + 1
            this.loaderProgression = (document.querySelector('.loader__progressBar').offsetWidth * this.counter) / 100
          }
        }, 40)
      } else if (step === 1) {
        let t = setInterval(() => {
          if (this.counter === 75) {
            clearInterval(t)
          } else {
            this.counter = this.counter + 1
            this.loaderProgression = (document.querySelector('.loader__progressBar').offsetWidth * this.counter) / 100
          }
        }, 40)
      } else if (step === 2) {
        let t = setInterval(() => {
          if (this.counter === 85) {
            clearInterval(t)
          } else {
            this.counter = this.counter + 1
            this.loaderProgression = (document.querySelector('.loader__progressBar').offsetWidth * this.counter) / 100
          }
        }, 40)
      } else if (step === 3) {
        let t = setInterval(() => {
          if (this.counter === 99) {
            clearInterval(t)
          } else {
            this.counter = this.counter + 1
            this.loaderProgression = (document.querySelector('.loader__progressBar').offsetWidth * this.counter) / 100
          }
        }, 40)
      } else {
        clearInterval(t)
      }
    },
    updateCheckProgression () {
      this.checkProgression = this.checkProgression + (document.querySelector('.detection__check').offsetHeight / 4)
    }
  },
  mounted () {
    this.backgroundMusic = new BackgroundMusic()
    if (this.isActive) {
      this.initDetectionStep()
      AssetsLoader.loadAssets('image').then((data) => {
        console.log('Asset Loader : All assets pre-loaded')
      })
      this.loader()
    }
    this.loader(0)
    window.addEventListener('DetectionInitializer:loading', (index) => {
      this.loadingDetectionStep = index.detail
      this.loader(this.loadingDetectionStep)
    })
  },
  watch: {
    isReady () { // when BRF is ready
      if (this.isReady && this.isActive) {
        this.backgroundMusic.playSpriteBackgroundMusic('detection')
        this.counter = this.counter + 1
        const timeOut = setTimeout(() => {
          this.getPositionCenter()
          clearTimeout(timeOut)
        }, 1500)
      }
    },
    isAnalysed () { // when BRF got initial face values
      if (!this.stepObject.isVoice && this.isAnalysed && this.isActive) {
        this.soundDesign.playSpriteSoundDesign('validation')
        this.updateCheckProgression()
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
      background: $color__blue;
      z-index: 3;
      transition: opacity 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;

      &.is-ready {
        transition-delay: 0.5s;
        opacity: 0;
      }

      .loader {
        position: relative;

        &__gif {
          width: 200px;
          height: 200px;
          margin-bottom: 60px;
        }

        &__counter {
          font-size: 8rem;
          color: $color__blue--light;
          margin-bottom: 30px;
        }

        &__progressBar {
          position: relative;
          width: 25rem;
          height: 0.5rem;
          background-color: #D9F0FC;
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
      max-height: 600px;

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

    &__check {
      position: absolute;
      bottom: 5rem;
      @include flexCenter();
      width: 70px;
      height: 70px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      -khtml-border-radius: 50%;
      overflow: hidden;

      &--progressRound, &--progression {
        position: absolute;
        width: 70px;
        height: 70px;
      }

      &--progressRound {
        z-index: 0;
        background-color: $color__black;
        opacity: 0.2;
      }

      &--progression {
        z-index: 1;
        background-color: $color__green--pastel;
        bottom: 0;
        height: 0;
        transition: height 0.3s;
      }

      .icon {
        z-index: 2;
        position: absolute;
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
