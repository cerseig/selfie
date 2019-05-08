<template>
  <div class="intro">
    <h1>{{ $t('intro.title') }}</h1>
  </div>
</template>

<script>
import { Howl } from 'howler'

export default {
  name: 'intro',
  methods: {
    initSounds () {
      this.sound = new Howl({
        src: ['/sounds/voice_fr.mp4'],
        sprite: {
          intro: [70, 12000]
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
