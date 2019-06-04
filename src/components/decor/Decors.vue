<template>
  <div class="decor--list">
    seletion : {{selection.decor}}
    <div v-for="(decor, index) in decors.list" :key="`background-${index}`" :class="`decor__item ${(selection.decor === decor.title) && (currentStep >= STEPS.DECOR) ? 'is-active' : ''}`"  :data-decor="decor.title">
      <div class="decor__background" :style="{backgroundImage: `url(${decor.background})`}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Decors',
    props: {
      decors: {
        type: Object,
        required: false
      },
      selection: {
        type: String,
        required: false
      },
    },

    mounted() {
      console.log('mounted', this)
    }
  }
</script>

<style lang="scss">

  .decor--list {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    .decor {
      &__item {
        position: absolute;
        width: 0;
        height: 100%;
        opacity: 0;

        overflow: hidden;
        transition: width 3s;

        &.is-active {
          opacity: 1;
          width: 100%;
        }
      }

      &__background {
        width: 100vw;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }
</style>
