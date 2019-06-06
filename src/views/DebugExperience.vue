<template>
  <div class="panel panel--debug">
    <Decors v-if="show.decor" :decors="decors" :selection="selection.decor" />
    <div class="panel__inner">
      <div class="panel__cover gui__wrapper">
        <h1 class="heading-1">Debug Experience</h1>
      </div>
      <div class="panel__top">
        <router-link :to="{name: 'gallery'}" class="link">Go to gallery</router-link>
        <button class="panel__button" @click="onClickSettings">Settings</button>
      </div>
      <div class="panel__body" ref="panelBodyElement">

        <div :class="['detection js-detection', show.camera ? 'is-camera-shown' : '']"></div>
        <ul class="list list--events" v-if="show.events">
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
      <PersonnalisationStep :class="`${show.personnalisation ? 'is-active' : ''}`"/>
      <DecorStep :isActive="show.decor"/>
      <div class="panel__settings">
        <Settings
          :showSettings="show.settings"
          :showCamera="show.camera"
          :showPersonnalisation="show.personnalisation"
          :showDecor="show.decor"
          :showEvents="show.events"
          :showGUI="show.gui"
           />
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

// Components
import Settings from '@/components/debug/Settings'
import PersonnalisationStep from '@/components/personnalisation/PersonnalisationStep'
import DecorStep from '@/components/decor/DecorStep'
import Decors from '@/components/decor/Decors'

// webgl
import Scene from '@/modules/webgl/Scene.js'

export default {
  name: 'DebugExperience',
  components: {
    Settings,
    PersonnalisationStep,
    DecorStep,
    Decors
  },
  data () {
    return {
      show: {
        settings: false,
        camera: false,
        personnalisation: false,
        events: false,
        gui: false,
        decor: true
      },
      decors: config.decors,
      selection: {
        decor: config.decors.default
      },
      positions: {}
    }
  },
  methods: {
    // todo : fix data process between parent & child
    initSettingsEvents () {
      this.$on('Settings:showCamera', (showCamera) => {
        this.show.camera = showCamera
      })
      this.$on('Settings:showSettings', (showSettings) => {
        this.show.settings = false
      })
      this.$on('Settings:showEvents', (showEvents) => {
        this.show.events = showEvents
      })
      this.$on('Settings:showPersonnalisation', (showPersonnalisation) => {
        this.show.personnalisation = showPersonnalisation
      })
      this.$on('Settings:showDecor', (showDecor) => {
        this.show.decor = showDecor
      })
      this.$on('Settings:showGui', (showGui) => {
        if (this.scene && this.scene.gui) {
          this.show.gui = showGui
          this.scene.gui.closed = !showGui
        }
      })
      this.$on('Settings:takeScreenshot', this.takeScreenshot)
      this.$on('Settings:takePicture', this.takePicture)
      this.$on('Settings:updateSizes', this.updateSizes)
    },

    initScene () {
      this.rafID = null
      this.avatarId = null
      this.detectionManager = new DetectionManager({
        mode: 'debug'
      })

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
    },

    update () {
      this.rafID = requestAnimationFrame(this.update)

      this.positions = this.detectionManager.getPositions()
      this.scene.update(this.positions)
    },

    updateSizes () {
      if (window.innerWidth <= 1024) {
        const sceneWidth = this.$refs.panelBodyElement.clientWidth / 2
        const sceneHeight = Math.floor(sceneWidth / 16 * 9)
        this.scene.updateSizes(sceneWidth, sceneHeight)
      } else {
        const sceneHeight = Math.floor(this.$refs.avatarElement.clientWidth / 16 * 9)
        this.scene.updateSizes(this.$refs.avatarElement.clientWidth, sceneHeight)
      }
    },

    takeScreenshot () {
      Capture.takeScreenshot(this.$refs.avatarElement).then(params => {
        this.avatarId = params.uniqId
        store.commit('setAvatarPath', params.path)
      })
    },

    takePicture () {
      const video = this.detectionManager.getVideo()

      Picture.takePicture(video).then(params => {
        store.commit('setPicturePath', params.path)
      })
    },

    onClickSettings () {
      this.show.settings = true
    },

    onPersonnalisationChange (change) {
      this.scene.avatar.personnalisation.handlePersonnalisation(change)
    },

    onDecorChange (change) {
      this.selection.decor = change
    }
  },
  mounted () {
    document.querySelector('body').classList.add('debug-mode')
    this.initSettingsEvents()
    this.initScene()

    this.$on('Personnalisation:Change', this.onPersonnalisationChange)
    this.$on('Decor:Change', this.onDecorChange)

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

    .decor {
      &__list {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;

        .decor__item {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          opacity: 0;

          &.is-active {
            opacity: 1;
          }
        }
      }
    }

    .panel {
      &__inner {
        padding: 2rem;
        overflow-x: hidden;
      }

      &__settings {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        pointer-events: none;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
      }

      &__button {
        position: fixed;
        bottom: 3rem;
        right: 3rem;
        @include outlinedButton(1rem 2rem, 1rem);
      }

      &__top {
        position: relative;
        z-index: 4;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__body {
        position: relative;
        z-index: 3;
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

    @media (min-width: 768px) and (max-width: 1024px)  {
      .panel__body {
        flex-wrap: wrap;
        padding: 8rem;

        .avatar,
        .detection {
          min-width: 100%;
        }

        .detection {
          display: none;

          &.is-camera-shown {
            display: flex;
          }
        }
      }

      .list--events {
        order: 3;
        flex: 1 1 100%;
        width: 100%;
        max-width: 100%;
      }
    }
  }

</style>
