<template>
  <div :class="`personnalisation ${isActive ? 'is-active' : ''}`">
    <CategoryPanel :categories="configCategories" :selectionChange="onSelectionChange" />
    <a href="#" @click="onValidateStep">{{ $t('experience.personnalisation.nextStep') }}</a>
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
      // this.selection.forEach((selection, index) => {
      //   const currentCategory = this.configCategories[index]
      //   const selectionType = currentCategory.title
      //   const configColor = selection.color !== undefined && selection.color >= 0 ? this.getConfigColor(currentCategory, selection.color) : null
      //   const configAttribute = selection.attribute !== undefined && selection.attribute >= 0 ? this.getConfigColor(currentCategory, selection.attribute) : null

      //   switch (selectionType) {
      //     case 'hair':
      //       store.commit('setHairCut', configAttribute)
      //       store.commit('setHairColor', configColor)
      //       break

      //     case 'eye':
      //       store.commit('setEyeColor', configColor)
      //       break

      //     case 'skin':
      //       store.commit('setSkinColor', configColor)
      //       break

      //     case 'facialHair':
      //       store.commit('setFacialHair', configAttribute)
      //       store.commit('setFacialHairColor', configColor)
      //       break

      //     case 'setGlasses':
      //       store.commit('setGlasses', configAttribute)
      //       store.commit('setGlassesColor', configColor)
      //       break
      //   }
      // })

      if (utils.isFunction(this.validateStep)) {
        this.validateStep()
      }
    },
    onSelectionChange (change) {
      console.log(change)
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
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    z-index: 3;

    &.is-active {
      display: block;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px)  {
    .personnalisation {
      position: fixed;
      bottom: 5rem;
      text-align: center;
    }
  }

</style>
