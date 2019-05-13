<template>
</template>

<script>
  import DetectionManager from '@/modules/detection/DetectionManager.js'
  import store from '@/store/index'
  import sprite from '@/config/voiceSprite'

  export default {
    name: 'detection',
    methods: {
      initDetection () {
        console.log('init detection')
      },
      playDetectionVoice () {

      }
     },
    mounted () {
      this.initDetection()
    },
    computed: {
    }
  }
</script>
