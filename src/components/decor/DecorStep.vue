<template>
  <div :class="`decor ${isActive ? 'is-active' : ''}`">
    <div class="decor__inner">
      <ul class="list list--decor">
        <li v-for="(background, index) in backgrounds.list" :key="`background-${index}`" :class="`list__item ${background.title === selection ? 'is-active' : ''}`" @click="onSelectItem" :data-decor="background.title">
           <Icon :name="background.title" :width="background.width" :height="background.height" stroke="#000000" fill="#000000"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Modules
import config from '@/config/config'
import Icon from '@/components/icons/Icon.vue'

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
      selection: config.backgrounds.default
    }
  },
  methods: {
    onSelectItem (e) {
      const decor = e.currentTarget.getAttribute('data-decor')
      this.$parent.$emit('Decor:Change', decor)
      this.selection = decor
    }
  }
}
</script>

<style lang="scss">
  .decor {
    position: fixed;
    bottom: 3rem;
    left: 0;
    right: 0;
    display: none;

    &__inner {
      display: flex;
      align-items: center;
      justify-content:  center;
    }

    &.is-active {
      display: block;
    }
  }

  .list--decor {
    display: flex;

    .list__item {
      cursor: pointer;
      &.is-active {
        border: .3rem solid green;
      }

    }
  }
</style>
