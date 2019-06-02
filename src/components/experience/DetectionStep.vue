<template>
  <div :class="`detection__box ${isActive ? 'is-active' : ''}`">
    <div :class="`detection__loader ${isReady ? 'is-ready' : ''}`">
      <div class="loader">
        <div class="loader__counter">{{counter}}%</div>
        <div class="loader__progressBar"><span class="loader__progression" :style="`width: ${loaderProgression}px;`"></span></div>
      </div>
    </div>
    <div :class="`detection__restriction ${errors.detection === true ? `hasError` : ``}`"  :style="sizes.width !== null && sizes.height !== null ? {width: sizes.width + 'px', height: sizes.height + 'px' } : {}"></div>
    <div class="detection__check">
      <div class="detection__check--progressRound"></div>
      <div class="detection__check--progression" :style="`height: ${checkProgression}px;`"></div>
      <Icon name="check" width="70" height="70" fill="#FFFFFF" stroke="#FFFFFF" />
    </div>
  </div>
</template>

<script>
// Modules
import Step from '@/modules/step/Step'
import SoundDesign from "@/modules/soundDesign/SoundDesign"
import BackgroundMusic from "@/modules/backgroundMusic/BackgroundMusic"
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
      currentStep: {},
      counter: 0,
      loaderProgression: 0,
      checkProgression: 0
    }
  },
  methods: {
    initDetectionStep () {
      this.stepObject = new Step(stepsConfig.detection)
      this.currentStep = this.stepObject.currentSubStep
      this.soundDesign = new SoundDesign()
      this.backgroundMusic = new BackgroundMusic()
    },
    getPositionCenter () {
      this.stepObject.init()
    },
    launchError (error) {
      let time = 1000
      if (this.errorPlayed === 0) {
        this.currentStep.status = 'error'
        const timeOut = setTimeout(() => {
          this.stepObject.changeSubStepState(error, () => {
            this.currentStep.status = 'inprogress'
          })
          this.errorPlayed = 1
          clearTimeout(timeOut)
        }, time)
      }
    },
    changeStep () {
      if (this.currentStep.index < this.stepObject.subSteps.length) {
        this.stepObject.changeSubStep()
        this.errorPlayed = 0
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
          if ((currentValue > minValue && currentValue < maxValue)) {
            this.currentStep.status = 'posing'
          }
          break
        case 'posing':
          this.currentStep.status = 'done'
          const timeOutDone = setTimeout(() => {
            switch (this.currentStep.hasSuccess) {
              case true:
                if (this.currentStep.name === 'rotationCentered') {
                  let callSuccess = setTimeout(() => {
                    this.updateCheckProgression('analyse', () => {
                      this.stepObject.changeSubStepState('success', () => {
                        window.clearTimeout(callSuccess)
                        this.stepObject.sound.stop()
                        this.soundDesign.sound.stop()
                        this.backgroundMusic.sound.stop()
                        this.validateStep()
                      })
                    })
                  }, 500)
                } else {
                this.updateCheckProgression('validation', () => {
                  this.stepObject.changeSubStepState('success', () => {
                    this.changeStep()
                  })
                })
                }
                break
              case false:
                this.updateCheckProgression('validation', () => {
                  this.changeStep()
                })
                break
            }
            clearTimeout(timeOutDone)
          }, 1000)
          break
      }
    },
    loader () {
      let t = setInterval(() => {
        if (this.counter === 99) {
          clearInterval(t)
        } else {
          this.counter = this.counter + 1
          this.loaderProgression = (document.querySelector('.loader__progressBar').offsetWidth * this.counter) / 100
        }
      }, 30)
    },
    updateCheckProgression (type, callback) {
      this.checkProgression = this.checkProgression + (document.querySelector('.detection__check').offsetHeight / 4)
      this.soundDesign.playSpriteSoundDesign(type, callback)
    }
  },
  mounted () {
    if (this.isActive) {
      this.initDetectionStep()
      this.loader()
    }
  },
  watch: {
    isReady () { // when BRF is ready
      this.backgroundMusic.playSpriteBackgroundMusic('detection')
      if (this.isReady && this.isActive) {
        this.counter = this.counter + 1
        const timeOut = setTimeout(() => {
          this.getPositionCenter()
          clearTimeout(timeOut)
        }, 1500)
      }
    },
    isAnalysed () { // when BRF got initial face values
      if (!this.stepObject.isVoice && this.isAnalysed && this.isActive) {
        this.updateCheckProgression('validation')
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
      background: $color__green--pastel;
      z-index: 20;
      transition: opacity 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;

      &.is-ready {
        transition-delay: 0.5s;
        opacity: 0;
        z-index: 0;
      }

      .loader {
        position: relative;

        &__counter {
          font-size: 15rem;
          color: $color__black;
          margin-bottom: 20px;
        }

        &__progressBar {
          position: relative;
          width: 40rem;
          height: 0.5rem;
          background-color: rgba(0, 0, 0, 0.2);
        }

        &__progression {
          width: 0;
          position: absolute;
          left: 0;
          top: 0;
          height: 0.5rem;
          background-color: rgba(0, 0, 0, 1);
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
      @include flexCenter();
      width: 70px;
      height: 70px;
      border-radius: 50%;
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
</style>
