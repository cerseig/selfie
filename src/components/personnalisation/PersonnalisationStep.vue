<template>
  <div :class="`personnalisation ${isActive ? 'is-active' : ''}`">
    <a class="personnalisation__next" href="#" @click="onValidateStep">{{ $t('experience.personnalisation.nextStep') }}</a>
    <CategoryPanel :categories="configCategories" :selectionChange="onSelectionChange" />
  </div>
</template>

<script>
// Modules
import CategoryPanel from '@/components/personnalisation/CategoryPanel'
import config from '@/config/config'
import store from '@/store/index'
import utils from '@/modules/helpers/utils.js'

export default {
  name: 'PersonnalisationStep',
  components: {
    CategoryPanel
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
      // selection: [],
      change: {},
      avatarProperties: {}
    }
  },
  computed: {
    hairColor: () => store.getters.getHairColor,
    glassesColor: () => store.getters.getGlassesColor
  },
  methods: {
    onValidateStep (e) {
      e.preventDefault()
      if (utils.isFunction(this.validateStep)) {
        this.validateStep()
      }
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
  }
}
</script>

<style lang="scss">
  .personnalisation {
    width: 100%;
    position: absolute;
    display: none;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;

    &__next {
      @include outlinedButton(1rem 2rem, 1.5rem);
      z-index: 10;

      position: fixed;
      top: 25px;
      right: 30px;
    }

    &.is-active {
      display: block;
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
