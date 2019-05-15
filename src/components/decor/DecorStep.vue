<template>
  <div :class="`decor ${isActive ? 'is-active' : ''}`">
    <a class="decor__next" href="#" @click="onValidateStep">{{ $t('experience.decor.nextStep') }}</a>
    <div class="decor__inner">
      <ul class="list list--decor">
        <li v-for="(background, index) in backgrounds.list" :key="`decor-${index}`" :class="`list__item ${background.title === selection ? 'is-active' : ''}`" @click="onSelectItem" :data-decor="background.title">
           <Icon :name="background.title" :width="background.width" :height="background.height" stroke="#000000" fill="#000000"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Modules
import config from '@/config/config'
import stepsConfig from '@/config/steps'
import utils from '@/modules/helpers/utils.js'

import Icon from '@/components/icons/Icon.vue'
import Step from '@/modules/step/Step'

export default {
  name: 'DecorStep',
  props: {
    validateStep: {
      required: false,
      type: Function
    },
    isActive: {
      required: false,
      type: Boolean
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      backgrounds: config.backgrounds,
      selection: config.backgrounds.default,
      errorPlayed: 0,
      maxLevelError: 5
    }
  },
  methods: {
    onValidateStep (e) {
      e.preventDefault()

      if (this.selection === this.backgrounds.wanted) {
        console.log('SUCCESS')
        const timeOut = setTimeout(() => {
          this.step.changeSubStepState('success', () => {
            if (utils.isFunction(this.validateStep)) {
              this.validateStep()
            }
          })
          clearTimeout(timeOut)
        }, 200)
      } else {
        const timeOut = setTimeout(() => {
          if (this.errorPlayed <= this.maxLevelError && this.errorPlayed > 0) {
            this.step.changeSubStep(`level${this.errorPlayed}`)
            this.step.changeSubStepState('error')
            this.errorPlayed++
            if (this.errorPlayed === this.maxLevelError) {
              this.errorPlayed = 0
            }
          } else {
            this.errorPlayed = 1
            this.step.changeSubStepState('error')
          }
          clearTimeout(timeOut)
        }, 200)
      }
    },
    launchSound (timeout) {
      this.step.changeSubStep(this.selection)
      const timeOut = setTimeout(() => {
        this.step.changeSubStepState('advice')
        clearTimeout(timeOut)
      }, timeout || 1000)
      this.errorPlayed = 0
    },
    initDecorStep () {
      this.createStepObject()
    },
    createStepObject () {
      let stepObject = new Step(stepsConfig.backgroundPersonnalisation)
      this.stepObject = stepObject
    },
    onSelectItem (e) {
      const decor = e.currentTarget.getAttribute('data-decor')
      this.$parent.$emit('Decor:Change', decor)
      this.selection = decor
      this.launchSound()
    }
  },
  mounted () {
    this.step = new Step(stepsConfig.backgroundPersonnalisation)
    this.backgrounds.list.forEach(background => {
      if (background.title === this.backgrounds.default) {
        this.selection = background.title
      }
    })
    if (this.isActive) {
      this.launchSound(2000)
    }
  },
  watch: {
    isActive (nextProp) {
      if (nextProp) {
        this.launchSound()
      }
    }
  }
}
</script>

<style lang="scss">
  .decor {
    width: 100%;
    height: 100%;
    position: absolute;
    display: none;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;

    &__next {
      @include outlinedButton(1rem 2rem, 1.5rem);
      z-index: 5;

      position: absolute;
      top: 30px;
      right: 30px;
    }

    &__inner {
      display: flex;
      align-items: center;
      justify-content:  center;
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.is-active {
      display: block;
    }
  }

  .list--decor {
    width: fit-content;

    padding: 0 50px;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: $color__white;

    border-radius: 50px;
    box-shadow: 0px 5px 10px #aaa;
    .list__item {
      opacity: 0.2;
      margin: 0 10px -1px 10px;
      .icon {
        padding: 10px;
      }
      &.is-active {
        opacity: 1;
        .icon {
          border-bottom: .5rem solid $color__black;
        }
      }
    }
  }
</style>
