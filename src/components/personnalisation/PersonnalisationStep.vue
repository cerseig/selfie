<template>
  <div :class="`personnalisation ${isActive ? 'is-active' : ''}`">
    <a class="personnalisation__next" href="#" @click="onValidateStep">
      {{ $t('experience.personnalisation.nextStep') }}
      <Icon name="little-arrow" width="12" height="12" stroke="#000000" />
    </a>
    <CategoryPanel :categories="configCategories" :selectionChange="onSelectionChange" :show="isActive" />
  </div>
</template>

<script>
// Modules
import Icon from '@/components/icons/Icon.vue'
import CategoryPanel from '@/components/personnalisation/CategoryPanel'
import store from '@/store/index'
import utils from '@/modules/helpers/utils.js'
import Step from '@/modules/sound/step/Step'

// Config
import stepsConfig from '@/config/steps'
import config from '@/config/config'

export default {
  name: 'PersonnalisationStep',
  components: {
    CategoryPanel,
    Icon
  },
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
  data () {
    return {
      configCategories: config.categories,
      change: {},
      avatarProperties: {}
    }
  },
  computed: {
    hairColor: () => store.getters.getHairColor,
    glassesColor: () => store.getters.getGlassesColor

  },
  methods: {
    initPersonnalisationStep () {
      this.createStepObject()
    },
    createStepObject () {
      let stepObject = new Step(stepsConfig.avatarPersonnalisation)
      this.stepObject = stepObject
    },
    onValidateStep (e) {
      e.preventDefault()
      this.stepObject.init(() => {
        if (utils.isFunction(this.validateStep)) {
          this.validateStep()
        }
      })
    },
    onSelectionChange (change) {
      this.$parent.$emit('Personnalisation:Change', change)
    },
    getConfigColor (category, color) {
      return category.colors[color]
    },
    getConfigAttribute (category, attribute) {
      return category.attributes[attribute].ref
    }
  },
  watch: {
    isActive () {
      if (this.isActive) {
        this.initPersonnalisationStep()
      }
    }
  }
}
</script>

<style lang="scss">
  .personnalisation {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition-property: opacity;
    transition-delay: .3s;

    &__next {
      @include outlinedButton(1rem 2rem, 1.5rem);
      z-index: 5;

      position: absolute;
      top: 30px;
      right: 30px;

      .icon {
        margin-left: 10px;
      }

      &:focus {
        .icon {
          fill: $color__white;
          stroke: $color__white;
        }
      }

    }

    &.is-active {
      opacity: 1;
      pointer-events: all;
      transition-delay: 0s;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px)  {
    .personnalisation {
      position: fixed;
      bottom: 0;
      text-align: center;
    }
  }

</style>
