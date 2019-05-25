<template>
  <div :class="`panel--settings ${showSettings ? 'is-active' : ''}`">
    <button class="panel__close" @click="onClickClose">
      <Icon name="cross" width="50" height="50" stroke="#000000" />
    </button>

    <h1 class="panel__title">Settings</h1>
    <div class="panel__inner">
      <div class="panel__section">
        <h2 class="panel__subtitle">Detection</h2>
        <div class="form__item form__item--switch">
          <label class="form__label" for="show_camera" >
            <span class="form__label__text">Show camera</span>
            <input class="form__input" type="checkbox" id="show_camera" v-model="inputs.showCamera" @change="onChangeShowCamera">
            <span class="form__switch"></span>
          </label>
        </div>
        <div class="form__item form__item--switch">
          <label class="form__label" for="show_events">
            <span class="form__label__text">Show Events</span>
            <input class="form__input" type="checkbox" id="show_events" v-model="inputs.showEvents" @change="onChangeShowEvents">
            <span class="form__switch"></span>
          </label>
        </div>
      </div>

      <div class="panel__section">
        <h2 class="panel__subtitle">Avatar</h2>
        <div class="form__item form__item--switch">
          <label class="form__label" for="show_personnalisation">
            <span class="form__label__text">Show Personnalisation</span>
            <input class="form__input" type="checkbox" id="show_personnalisation" v-model="inputs.showPersonnalisation" @change="onChangeShowPersonnalisation">
            <span class="form__switch"></span>
          </label>
        </div>
        <div class="form__item form__item--switch">
          <label class="form__label" for="show_decor">
            <span class="form__label__text">Show Decor</span>
            <input class="form__input" type="checkbox" id="show_decor" v-model="inputs.showDecor" @change="onChangeShowDecor">
            <span class="form__switch"></span>
          </label>
        </div>
        <div class="form__item form__item--switch">
          <label class="form__label" for="show_gui" >
            <span class="form__label__text">Show GUI</span>
            <input class="form__input" type="checkbox" id="show_gui" v-model="inputs.showGUI" @change="onChangeShowGUI">
            <span class="form__switch"></span>
          </label>
        </div>
        <div class="form__item form__item--button">
          <button class="form__button" @click="onClickUpdateSizes">Update Canvas sizes</button>
        </div>
      </div>

      <div class="panel__section">
        <h2 class="panel__subtitle">Actions</h2>
        <div class="form__item form__item--button">
          <button class="form__button" @click="onClickTakeScreenshot">Screenshot</button>
        </div>
        <div class="form__item form__item--button">
          <button class="form__button" @click="onClickTakePicture">Take Picture</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'Settings',
  components: {
    Icon
  },
  data() {
    return {
      inputs: {
        showCamera: this.showCamera,
        showDecor: this.showDecor,
        showGUI: this.showGUI,
        showEvents: this.showEvents,
        showPersonnalisation: this.showPersonnalisation
      }
    }
  },
  props: {
    showCamera: {
      type: Boolean,
      required: true,
      default: false
    },
    showDecor: {
      type: Boolean,
      required: true,
      default: false
    },
    showSettings: {
      type: Boolean,
      required: true,
      default: false
    },
    showGUI: {
      type: Boolean,
      required: true,
      default: false
    },
    showEvents: {
      type: Boolean,
      required: true,
      default: false
    },
    showPersonnalisation: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    onChangeShowCamera () {
      this.$parent.$emit('Settings:showCamera', this.inputs.showCamera)
    },
    onClickClose () {
      this.$parent.$emit('Settings:showSettings', false)
    },
    onChangeShowEvents () {
      this.$parent.$emit('Settings:showEvents', this.inputs.showEvents)
    },
    onChangeShowGUI () {
      this.$parent.$emit('Settings:showGui', this.inputs.showGUI)
    },
    onChangeShowPersonnalisation () {
      this.$parent.$emit('Settings:showPersonnalisation', this.inputs.showPersonnalisation)
    },
    onChangeShowDecor () {
      this.$parent.$emit('Settings:showDecor', this.inputs.showDecor)
    },
    onClickTakeScreenshot (e) {
      e.preventDefault()
      this.$parent.$emit('Settings:takeScreenshot')
    },
    onClickTakePicture (e) {
      e.preventDefault(e)
      this.$parent.$emit('Settings:takePicture')
    },
    onClickUpdateSizes (e) {
      e.preventDefault(e)
      this.$parent.$emit('Settings:updateSizes')
    }
  },
  watch: {
    showCamera(nextProp) {
      this.inputs.showCamera = nextProp
    },
    showDecor(nextProp) {
      this.inputs.showDecor = nextProp
    },
    showGUI(nextProp) {
      this.inputs.showGUI = nextProp
    },
    showEvents(nextProp) {
      this.inputs.showEvents = nextProp
    },
    showPersonnalisation(nextProp) {
      this.inputs.showPersonnalisation = nextProp
    }
  }
}
</script>

<style lang="scss">
  .panel--settings {
    position: absolute;
    top: -2rem;
    bottom: 0;
    right: 0;
    height: 100vh;
    min-width: 30rem;
    padding: 6rem 2rem;
    margin: 2rem 0;
    z-index: 9999999;

    box-sizing: border-box;
    overflow: auto;
    pointer-events: all;

    background: $color__white;
    box-shadow: -.6rem .7rem 2.1rem .3rem rgba(89,60,23,0.11);

    opacity: 0;
    transform: translateX(100%);
    transition: transform .3s, opacity .3s;

    &.is-active {
      opacity: 1;
      transform: translateX(0);
    }

    .panel {
      &__title {
        font-family: 'Montserrat';
        font-size: 2rem;
        text-transform: uppercase;
        text-align: center;
      }

      &__subtitle {
        font-family: 'Montserrat';
        font-size: 1.5rem;
        margin-bottom: 0.8rem;
      }

      &__section {
        padding-bottom: 2rem;
        margin-top: 2rem;
        border-bottom: 1px solid #e6e6e6;

        &:last-of-type {
          border: none;
        }
      }

      &__inner {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
      }

      &__close {
        position: absolute;
        top: 1rem;
        right: 1rem;

        .icon {
          transform: rotate(45deg);
        }
      }
    }

  }

  .form__item {
    margin-bottom: 1.2rem;
    .form__label {
      cursor: pointer;

      &__text {
        font-size: 1.5rem;
      }
    }
    &--button {
      .form__button {
        @include outlinedButton(1rem 2rem, 1rem);
      }
    }
    &--switch {
      .form__input {
        position: absolute;
        opacity: 0;
        z-index: -1;

        &:checked + .form__switch:before {
          background: #4cd964;
          border-color:  #4cd964;
        }
        &:checked + .form__switch:after {
          content: "";
          left: 1.3rem;
        }
      }

      .form__switch {
        position: relative;
        display: block;
        width: 3.25rem;
        height: 2rem;
        cursor: pointer;
        border-radius: 1rem;
          &:before,
          &:after {
            content: "";
            position: absolute;
            left: 0;
            transition: .25s ease all;
            -moz-transition: .25s ease all;
            -webkit-transition: .25s ease all;
          }
          &:before {
            display: block;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            border-radius: 1rem;
            border: 0.25rem solid #e6e6e6;
            background: #F5F5F5;
          }
          &:after {
            content: "";
            top: 0.25rem;
            bottom: 0.26rem;
            left: 0.35rem;
            width: 1.5rem;
            border-radius: 100%;
            background: white;
            box-shadow: 0 .4rem .1rem rgba($color__black, .05), 0 .2rem .2rem rgba($color__black, .1), 0 .4rem .4rem rgba($color__black, .05), 0 0 0 2px rgba($color__black, .04);
          }
      }

      .form__label {
        display: flex;
        justify-content: space-between;
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
            color: #626265;

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
</style>
