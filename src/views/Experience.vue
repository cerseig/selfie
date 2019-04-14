<template>
  <div class="experience">
    <h1>This is an experience page</h1>
    <a href="#" @click="isDebug = !isDebug" class="btn btn--debug">{{isDebug ? 'Switch to Normal mode' : 'Switch to Debug mode' }}</a>
    <div class="form__item" v-if="isDebug">
      <label for="show_camera" >Show camera</label>
      <input type="checkbox" id="show_camera" value="true" v-model="showCamera">
    </div>
    <div :class="['detection js-detection', isDebug ? 'is-debug' : '', showCamera ? 'is-camera-shown' : '']"></div>
  </div>
</template>

<script>
//Modules
import DetectionManager from '@/modules/detection/DetectionManager.js'

export default {
  name: 'Experience',
  data() {
    return {
      isDebug: true,
      showCamera: false
    }
  },
  mounted() {
    new DetectionManager()
  }
}
</script>

<style lang="scss">

.detection {
  $self: &;
  position:  relative;
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
  }

  &__points {
    position: relative;
    z-index: 1;
  }

  &__image,
  &__points {
    opacity: 0;
  }

  &.is-debug {
    &.is-camera-shown {
      #{$self}__image {
        opacity: .15;
      }
    }

    #{$self}__points{
      opacity: 1;
    }
  }
}

.btn--debug {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: .5rem 1rem;
  display: block;
  background: pink;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  font-size: .8rem;
  color: white;
  cursor: pointer;

  &:hover {
    background: red;
  }
}

.form__item {
  display: flex;
  align-items: center;
}
</style>
