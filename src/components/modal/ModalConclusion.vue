<template>
  <div :class="`modal modal--conclusion ${isActive ? 'is-active' : ''} ${isVideo ? 'is-video' : ''}`">
    <div class="modal__inner">
      <div :class="`modal__notification notification ${isVideo ? 'is-hidden' : ''}`">
        <button class="notification__close" @click="onClickClose">
          <Icon name="close" width="25" height="25" fill="#000000" />
        </button>
        <p class="notification__content">
          {{ $t('modalConclusion.notification.message', { usersLength: usersNumber }) }}
        </p>
      </div>
      <video :class="`modal__video ${isVideo ? 'is-active' : ''}`" ref="video"  preload playsinline>
        <source class="modal__video--source" :src="`${publicPath}/videos/conclusion.mp4`" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>

import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'ModalConclusion',
  props: {
    isActive: {
      required: true,
      type: Boolean
    },
    usersNumber: {
      required: true,
      type: Number
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      isVideo: false
    }
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
    },
    onClickClose () {
      this.isVideo = true
      this.playVideo()
    },
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

    background-color: rgba(0, 0, 0, 0.8);

    opacity: 0;
    transition: opacity .5s, background-color .5s linear;

    pointer-events: none;

    &.is-active {
      opacity: 1;
      pointer-events: all;
      z-index: 5;
    }

    &.is-video {
      background: $color__white;
    }

    .modal {

      &__inner {
        width: 90%;
        height: 90%;

        position: absolute;
        top: 50%;
        left: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        transform: translate(-50%, -50%);
        border-radius: 2.5rem;

        overflow: hidden;

        .notification {
          position: relative;

          padding: 10rem 8rem;
          background-color: $color__white;
          color: $color__black;
          font-size: 3rem;
          line-height: 4rem;

          border-radius: 2.5rem;
          overflow: hidden;
          opacity: 1;


          &.is-hidden {
            opacity: 0;
          }


          &__close {
            position: absolute;
            top: 3rem;
            right: 3rem;
            z-index: 10;
            cursor: pointer;
          }

          &__content {
            text-align: center;
            max-width: 400px;
          }
        }
      }

      &__video {
        width: 100%;
        display: none;
        position: absolute;

        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        transform: scale(0);

        &.is-active {
          display: block;
          transform: scale(1);
        }

      }

    }

  }
</style>
