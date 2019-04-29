<template>
  <div class="gallery">
    <h1>{{ $t('gallery.title') }}</h1>
    <AvatarsGrid />
  </div>
</template>

<script>
import AvatarsGrid from '@/components/AvatarsGrid.vue'

export default {
  name: 'gallery',
  components: {
    AvatarsGrid
  }
}
</script>
