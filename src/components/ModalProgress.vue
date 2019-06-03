<template>
  <div :class="`modal modal--progress ${isActive ? 'is-active' : ''}`">
    <button class="modal__close" @click="onClickClose">
      <Icon name="close" width="30" height="30" fill="#ffffff" />
    </button>
    <div class="modal__inner">
      <h2 class="modal__title heading-1">{{ $t('modalProgress.title') }}</h2>
      <ul class="list list--progress">
        <li :class="`list__item ${step === (i - 1) ? 'is-active' : ''} ${step > (i - 1) ? 'is-done' : ''}`" v-for="i in 4" :key="`list-progress-${i}`">{{(i)}}</li>
      </ul>
      <a href="#" class="modal__button">
        {{ $t('modalProgress.button') }}
      </a>
    </div>

  </div>
</template>

<script>
import store from '../store/index'

import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'ModalProgress',
  props: {
    isActive: {
      required: true,
      type: Boolean
    }
  },
  components: {
    Icon
  },
  computed: {
    step: () => store.getters.getStep
  },
  methods: {
    onClickClose () {
      this.$parent.$emit('Modal:Progress:Close')
    },
    handleScroll (isActive) {
      if (isActive) {
        document.body.classList.add('is-unscrollable')
      } else {
        document.body.classList.remove('is-unscrollable')
      }
    }
  },
  mounted () {
    this.handleScroll(this.isActive)
  },
  watch: {
    isActive (nextProp) {
      this.handleScroll(nextProp)
    }
  }
}

</script>

<style scoped lang="scss">
.modal--progress {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba($color__black, 0.4);
  opacity: 0;
  transition: opacity .3s;

  pointer-events: none;

  &.is-active {
    opacity: 1;
    pointer-events: all;
  }

    .modal {
      &__close {
        position: absolute;
        top: 5rem;
        left: 5rem;
      }

      &__inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 12rem 16rem;
        background: $color__white--light;
        border-radius: 2.5rem;
      }
      &__button {
        display: inline-block;
        @include outlinedButton(1rem 2rem, 1.5rem);
      }
    }

    .list--progress {
      display: flex;
      margin: 7rem 0;

      $separator-width: 8.2rem;
      .list__item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6rem;
        height: 6rem;
        margin-right: $separator-width;

        border: 0.25rem solid $color__black;
        border-radius: 100%;

        font-family: $font__montserrat;
        font-size: 2.4rem;
        font-weight: 700;
        color: $color__black;

        opacity: 0.11;

        &:after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(50%);
          left: -($separator-width + .2rem);
          width: $separator-width;
          height: 0.2rem;

          background: $color__black;
        }

        &:last-of-type {
          margin-right: 0;
        }

        &:first-of-type {
          &:after {
            content: none;
          }
        }

        //states
        &.is-done,
        &.is-active {
          opacity: 1;
        }

        &.is-done {
          background: $color__black;
          color: $color__white;
        }
      }
    }
}

</style>
