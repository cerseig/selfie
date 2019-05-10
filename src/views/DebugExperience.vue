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
          <div class="form__item form__item--button">
            <button class="form__button" @click="takeScreenshot">Screenshot</button>
          </div>
          <div class="form__item form__item--button">
            <button class="form__button" @click="takePicture">Take Picture</button>
          </div>
          <router-link :to="{name: 'gallery'}" class="link">Go to gallery</router-link>
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
import Capture from '@/modules/images/Capture.js'
import Picture from '@/modules/images/Picture.js'
import store from '@/store/index'

// Config
import config from '@/config/config'

// webgl
import Scene from '@/modules/webgl/Scene.js'

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
    },

    takeScreenshot (e) {
      e.preventDefault()
      Capture.takeScreenshot(this.$refs.avatarElement, (params) => {
        this.avatarId = params.uniqId
        console.log('take screenshot maggle')
        store.commit('setAvatarPath', params.path)
      })
    },

    takePicture () {
      const video = this.detectionManager.getVideo()
      Picture.takePicture(video, (params) => {
        store.commit('setPicturePath', params.path)
      })
    }
  },
  mounted () {
    document.querySelector('body').classList.add('debug-mode')

    this.rafID = null
    this.avatarId = null
    this.detectionManager = new DetectionManager()

    const sceneHeight = Math.floor(this.$refs.avatarElement.clientWidth / 16 * 9)

    this.scene = new Scene({
      config: config,
      element: this.$refs.avatarElement,
      mode: 'debug',
      sizes: {
        width: this.$refs.avatarElement.clientWidth,
        height: sceneHeight
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
    position: relative;
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

    .link {
      font-family: $font__sintony;
      font-size: 1.5rem;
      text-transform: uppercase;
      text-decoration: underline;
    }

    .panel__settings {
      display: flex;
      margin: 2rem 0;
      padding: 2rem;
      align-items: center;

      .form__item {
        margin-right: 2rem;
      }
    }

    .form__item {
      &--button {
        .form__button {
          @include outlinedButton(1.3rem 4rem, 1.2rem);
        }
      }
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
            font-size: 1.5rem;
            cursor: pointer;

            &:before {
              content: '';
              display: block;
              width: 2rem;
              height: 2rem;
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
                height: .5rem;
                background: black;
                opacity: 0;
              }

              &:before {
                left: -2.3rem;
                top: .6rem;
                width: 1rem;
                transform: rotate(45deg);
                transform-origin: top left;
              }

              &:after {
                top: .07rem;
                left: -2.7rem;
                width: 1.6rem;
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
      font-size: 3rem;
      text-transform: uppercase;
      text-align: center;
    }

    .progress {
      position: relative;
      width: 100%;
      height: 1rem;
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
        margin-bottom: .8rem;
      }

      .list__title {
        flex: 1 1 60%;
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: .3rem;
      }

      .progress {
        width: 100%;
        flex: 1 1 40%;
      }
    }
    .avatar {
      min-width: 30%;
      margin-left: 4rem;
      background: url('/img/team.png');
      background-size: cover;
      background-position: center;
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
