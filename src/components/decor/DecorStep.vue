<template>
  <div :class="`decor ${isActive ? 'is-active' : ''}`">
    <a :class="`decor__next ${step && step.isVoice ? 'is-unactive' : ''}`" href="#" @click="onValidateStep">
      {{ $t('experience.decor.nextStep') }}
      <Icon name="little-arrow" width="12" height="12" stroke="#000000" />
    </a>
    <div class="decor__inner">
      <ul :class="`list list--decor ${step && step.isVoice ? 'is-unactive' : ''}`">
        <span class="list__indicator" :style="{transform: `translateX(${selectionIndex * 10}rem)`}"></span>
        <li v-for="(decor, index) in decors.list" :key="`decor-${index}`" :class="`list__item ${decor.title === selection ? 'is-active' : ''}`" @click="onSelectItem" :data-decor="decor.title" :data-index="index">
           <Icon :name="decor.title" :width="decor.width" :height="decor.height" stroke="#000000" fill="#000000"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Modules
import decors from '@/config/decors'
import stepsConfig from '@/config/steps'
import utils from '@/modules/helpers/utils.js'

import Icon from '@/components/icons/Icon.vue'
import Step from '@/modules/sound/step/Step'

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
      decors: decors,
      selection: decors.default,
      selectionIndex: 0,
      errorPlayed: 0,
      maxLevelError: 5,
      step: null
    }
  },
  methods: {
    onValidateStep (e) {
      e.preventDefault()

      if (this.selection === this.decors.wanted) {
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
      }, timeout || 1500)
      this.errorPlayed = 0
    },
    initDecorStep () {
      this.createStepObject()
    },
    createStepObject () {
      let stepObject = new Step(stepsConfig.decorPersonnalisation)
      this.stepObject = stepObject
    },
    onSelectItem (e) {
      const item  = e.currentTarget
      const selectionIndex = item.getAttribute('data-index')
      const decor = item.getAttribute('data-decor')
      this.$parent.$emit('Decor:Change', decor)
      this.selection = decor
      this.selectionIndex = selectionIndex
      this.launchSound()
    }
  },
  mounted () {
    this.step = new Step(stepsConfig.decorPersonnalisation)
    this.decors.list.forEach((decor, index) => {
      if (decor.title === this.decors.default) {
        this.selection = decor.title
        this.selectionIndex = index
      }
    })
    if (this.isActive) {
      this.launchSound(3000)
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
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    opacity: 0;
    pointer-events: none;
    transform: translateY(10rem);
    transition: transform .3s, opacity .3s;

    &__next {
      @include outlinedButton(1rem 2rem, 1.5rem);
      z-index: 5;

      position: absolute;
      top: 30px;
      right: 30px;

      transition: opacity .3s;

      .icon {
        margin-left: 10px;
      }

      &:focus {
        .icon {
          fill: $color__white;
          stroke: $color__white;
        }
      }

      &.is-unactive {
        pointer-events: none;
        opacity: .6;
      }
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
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);

      .list__indicator {
        opacity: 1;
      }

      .list--decor {
        .list__item {
           @for $i from 1 through 6 {
            &:nth-of-type(#{$i}) {
              transform: scale(1);
              transition: transform #{$i * .1s} .3s, opacity .3s;;
            }
          }
        }
      }
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
    box-shadow: 0px 5px 10px rgba($color__black, 0.1);

    transition: opacity .3s;

    .list__indicator {
      content: '';
      position: absolute;
      left: 5.5rem;
      bottom: 0;
      width: 9rem;
      height: .5rem;
      background: $color__black;
      transition: transform .3s, opacity .1s .3s;;
      opacity: 0;
    }

    &.is-unactive {
      pointer-events: none;
      opacity: .7;

      .list__item {
        opacity: .15;

        &.is-active {
          opacity: .6;
        }
      }
    }

    .list__item {
      opacity: 0.2;
      margin: 0 10px -1px 10px;

      transform: scale(0);

      .icon {
        padding: 10px;
      }
      &.is-active {
        opacity: 1;
      }
    }
  }
</style>
