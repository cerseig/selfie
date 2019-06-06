<template>
  <div :class="`modal modal--conclusion ${isActive ? 'is-active' : ''}`">
    <button class="modal__close" @click="onClickClose">
      <Icon name="close" width="30" height="30" fill="#000000" />
    </button>
    <div class="modal__inner">
      ANIMATION CONCLUSION
    </div>
  </div>
</template>

<script>
  import store from '../store/index'

  import Icon from '@/components/icons/Icon.vue'

  export default {
    name: 'ModalConclusion',
    props: {
      isActive: {
        required: true,
        type: Boolean
      }
    },
    components: {
      Icon
    },
    methods: {
      onClickClose () {
        this.$parent.$emit('Modal:Conclusion:Close')
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
  .modal--conclusion {
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
      z-index: 5;
    }

    .modal {
      &__close {
        position: absolute;
        top: 10rem;
        left: 10rem;
        z-index: 10;
      }

      &__inner {
        width: 90%;
        height: 90%;

        position: absolute;
        top: 50%;
        left: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 5rem;
        transform: translate(-50%, -50%);
        background: $color__white--light;
        border-radius: 2.5rem;
      }
    }

  }
</style>
