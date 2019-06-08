<template>
  <div :class="`modal modal--conclusion ${isActive ? 'is-active' : ''}`">
    <div class="modal__inner">
      <video ref="video" class="modal__video" preload>
        <source class="modal__video--source" :src="`${publicPath}/videos/conclusion.mp4`" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import store from '../../store/index'

import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'ModalConclusion',
  props: {
    isActive: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  components: {
    Icon
  },
  methods: {
    handleScroll (isActive) {
      if (isActive) {
        document.body.classList.add('is-unscrollable')
      } else {
        document.body.classList.remove('is-unscrollable')
      }
    },
    playVideo () {
      this.$refs.video.play()
      this.$refs.video.addEventListener('ended', () => {
        this.$refs.video.pause()
        this.$parent.$emit('Modal:Conclusion:Close')
      })
    }
  },
  mounted () {
    this.handleScroll(this.isActive)
  },
  watch: {
    isActive (nextProp) {
      this.handleScroll(nextProp)
      if (this.isActive) {
        this.playVideo()
      }
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

    background: $color__white;

    opacity: 0;
    transition: opacity .5s;

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
        border-radius: 2.5rem;

        overflow: hidden;
      }

      &__video {
        width: 100%;
      }

    }

  }
</style>
