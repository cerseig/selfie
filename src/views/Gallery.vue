<template>
  <div class="gallery">
    <h1>This is a gallery page</h1>
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
