<template>
  <div class="decor--list">
    seletion : {{selection}}
    <div v-for="(decor, index) in decors.list" :key="`background-${index}`" :class="`decor__item ${(selection === decor.title)? 'is-active' : ''} ${formerSelection === decor.title ? 'is-former-active' : ''}`"  :data-decor="decor.title">
      <div class="decor__wrapper">
        <div class="decor__background" :style="{backgroundImage: `url(${decor.background})`}"></div>
      </div>
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
    }
  },
  data () {
    return {
      formerSelection: null
    }
  },
  mounted () {
    console.log('mounted decor', this)
  },
  watch: {
    selection (newProp, formerProp) {
      this.formerSelection = formerProp
    }
  }
}
</script>

<style lang="scss">
  $t-duration: .8s;
  $t-delay: .2s;

  @mixin decorTransition {
    transition-property: transform;
    transition-duration: $t-duration;
    transition-delay: $t-duration;
    transition-timing-function: initial;
  }

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
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        height: 100vh;

        transform: translateX(50%);
        transform-origin: right;

        z-index: 0;

        &.is-active {
          z-index: 1;

          animation-name: translateIn;
          animation-duration: $t-duration;
          animation-delay: .2s;
          animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          animation-fill-mode: forwards;

          .decor__wrapper {
            width: 100vw;
          }
        }

        &.is-former-active {
          transform: translateX(0);

          animation-name: translateOut;
          animation-delay: .2s;
          animation-duration: $t-duration;
          animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
          animation-fill-mode: forwards;

          .decor__wrapper {
            transition-delay: $t-duration
          }
        }
      }

      &__wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;

        width: 0;
        height: 100vh;

        overflow: hidden;

        transition-property: width;
        transition-duration: $t-duration;
        transition-delay: .2s;
        transition-timing-function: initial;

      }

      &__background {
        position: absolute;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }

  @keyframes translateIn {
    0% {
      transform: translateX(50%)
    }
    100% {
      transform: translateX(0)
    }
  }

  @keyframes translateOut {
    0% {
      transform: translateX(0)
    }
    100% {
      transform: translateX(-50%)
    }
  }
</style>
