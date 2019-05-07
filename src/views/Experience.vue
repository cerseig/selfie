<template>
  <div class="experience">

    <div class="detection">
      <div :class="['detection__content js-detection', isDebug ? 'is-debug' : '', showCamera ? 'is-camera-shown' : '']"></div>
    </div>

    <PersonnalisationStep v-if="currentStep === 0" :validateStep="onValidateStep" />

    <div class="" v-if="currentStep === 1">
      <h1>Etape : la pose</h1>
      <a href="#" @click="onValidateStep">{{ $t('experience.personnalisation.nextStep') }} : {{ $t('share.subtitle') }}</a>
    </div>

    <SVGSprite />
  </div>
</template>

<script>
// Modules
import DetectionManager from '@/modules/detection/DetectionManager.js'
import PersonnalisationStep from '@/components/personnalisation/PersonnalisationStep'
import SVGSprite from '@/components/icons/SVGSprite'

export default {
  name: 'Experience',
  components: {
    PersonnalisationStep,
    SVGSprite
  },
  data () {
    return {
      isDebug: true,
      showCamera: false,
      currentStep: 0
    }
  },
  methods: {
    onValidateStep () {
      this.currentStep++

      if (this.currentStep >= 2) {
        // todo : camera screenshot
        this.$router.push({ name: 'gallery' })
      }
    },
    update () {
      requestAnimationFrame(this.update)
    }
  },
  mounted () {
    this.detectionManager = new DetectionManager()
    this.update()
  },
  beforeDestroy () {
    if (this.detectionManager) {
      this.detectionManager.destroy()
    }
  }
}
</script>

<style lang="scss">

.experience {
  width: 100%;
  height: 100%;
  position: relative;
  .detection {
    $self: &;
    position:  relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

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
      border: .25px solid black;
    }

    &__image {
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
