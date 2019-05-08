<template>
  <div class="panel panel--debug">
    <div class="panel__inner">
      <div class="panel__top">
        <h1 class="heading-1">Debug Experience</h1>
        <div class="panel__settings">
          <div class="form__item form__item--checkbox">
            <input class="form__input" type="checkbox" id="show_camera" v-model="showCamera">
            <label class="form__label" for="show_camera">
              <span class="form__label__text">Show camera</span>
            </label>
          </div>
          <div class="form__item form__item--checkbox">
            <input class="form__input" type="checkbox" id="show_gui" v-model="showGUI">
            <label class="form__label" for="show_gui">
              <span class="form__label__text">Show GUI</span>
            </label>
          </div>
        </div>
      </div>
      <div class="panel__body">
        <div :class="['detection js-detection', showCamera ? 'is-camera-shown' : '']"></div>
        <ul class="list list--events">
          <li class="list__item" v-for="(position, key) in positions.events" :key="key">
            <span class="list__title">{{key}}</span>
            <div class="progress">
              <span class="progress__bar" :style="{ transform: `scaleX(${position})` }" ></span>
            </div>
          </li>
        </ul>
        <div class="avatar" ref="avatarElement">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import DetectionManager from '@/modules/detection/DetectionManager.js'
import Scene from '@/modules/webgl/Scene.js'
import config from '@/config/config'

export default {
  name: 'DebugExperience',
  data () {
    return {
      showCamera: false,
      showGUI: true,
      positions: {}
    }
  },
  methods: {
    update () {
      this.rafID = requestAnimationFrame(this.update)

      this.positions = this.detectionManager.getPositions()
      this.scene.update(this.positions)
    }
  },
  mounted () {
    document.querySelector('body').classList.add('debug-mode')
    this.rafID = null
    this.detectionManager = new DetectionManager()
    this.scene = new Scene({
      config: config,
      element: this.$refs.avatarElement,
      mode: 'debug',
      sizes: {
        width: this.$refs.avatarElement.clientWidth,
        height: this.$refs.avatarElement.clientWidth / 16 * 9
      }
    })

    this.update()
  },
  beforeDestroy () {
    if (this.detectionManager) {
      cancelAnimationFrame(this.rafID)
      this.detectionManager.destroy()
    }
  }
}
</script>

<style lang="scss">
  .panel--debug {
    min-height: 100vh;
    width: 100vw;
    background: #fef0de;
    z-index: 3;
    text-align: left;
    font-family: 'Montserrat';

    .panel {
      &__inner {
        padding: 2rem;
      }

      &__body {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .panel__settings {
      display: flex;

      .form__item {
        margin-right: 2rem;
      }
    }

    .form__item {
      &--checkbox {
        .form {
          &__input {
            display: none;
            &:checked {
              + .form__label {
                .form__label__text {
                  &:before,
                  &:after {
                    opacity: 1;
                  }
                }
              }
            }
          }

          &__label {
            display: flex;
            align-items: center;
            font-size: .8rem;
            cursor: pointer;

            &:before {
              content: '';
              display: block;
              width: 1.2rem;
              height: 1.2rem;
              margin-right: .5rem;
              border: 2px solid black;
              border-radius: .3rem;
              cursor: pointer;
            }

            &__text {
              position: relative;
              display: block;

              &:before,
              &:after {
                content: '';
                position: absolute;
                height: .3rem;
                background: black;
                opacity: 0;
              }

              &:before {
                left: -1.5rem;
                top: .2rem;
                width: .6rem;
                transform: rotate(45deg);
                transform-origin: top left;
              }

              &:after {
                top: .05rem;
                left: -1.7rem;
                width: .8rem;
                background: black;
                transform: rotate(-45deg);
                transform-origin: top right;
              }
            }
          }
        }
      }
    }

    .detection {
      flex: 1 1 30%;
      max-width: 40%;
    }
    .heading-1 {
      font-family: 'Montserrat';
      font-size: 1.5rem;
    }

    .progress {
      position: relative;
      width: 100%;
      height: .5rem;
      background: rgba(255, 255, 255, 0.7);
      border-radius: .5rem;
      overflow: hidden;

      &__bar {
        display: block;
        width: 100%;
        height: 100%;
        background: black;
        border-top-right-radius: .3rem;
        border-bottom-right-radius: .3rem;
        transform-origin: left;
        transform: scaleX(0);
        transition: .5s transform;
      }
    }

    .list--events {
      flex: 1 1 30%;
      max-width: 30%;

      .list__item {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-bottom: .4rem;
      }

      .list__title {
        flex: 1 1 60%;
        font-size: 0.7rem;
        font-weight: 700;
        margin-bottom: .3rem;
      }

      .progress {
        width: 100%;
        flex: 1 1 40%;
      }
    }
    .avatar {
      flex: 1;
      min-width: 30%;
      margin-left: 4rem;
    }

    .detection {
      $self: &;
      position: relative;
      display: flex;
      justify-content: space-between;

      &__camera {
        display: none;
      }

      &__image {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
        opacity: 0;
      }

      &__points {
        position: relative;
        z-index: 1;
      }

      &.is-camera-shown {
        .detection__image {
          opacity: 1;
        }
      }

    }
  }

</style>
