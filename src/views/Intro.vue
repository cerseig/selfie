<template>
  <div class="intro">
    <h1 class="intro__animation">A.M.Y</h1>
  </div>
</template>

<script>
import { Howl } from 'howler'

export default {
  name: 'intro',
  methods: {
    initSounds () {
      this.sound = new Howl({
        src: ['/sounds/voice_fr.mp3'],
        sprite: {
          intro: [0, 20000]
        }
      })

      const introSound = this.sound.play('intro')
      this.audioId = introSound

      this.sound.on('end', () => {
        if (this.audioId === introSound) {
          this.$router.push({ name: 'experience' })
        }
      })
    }
  },
  mounted () {
    this.initSounds()
  },
  beforeDestroy () {
    this.sound.stop()
  }
}
</script>

<style lang="scss">
  .intro {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__animation {
      font-size: 15rem;
      animation: blink 2s infinite;
    }
  }
</style>
