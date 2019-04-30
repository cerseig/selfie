<template>
  <div class="share">
    <h1>{{ $t('share.title') }}</h1>
    <div v-if="temporaryTableId.length > 0" >
      <TemporaryPictures :id="temporaryTableId" />
    </div>
  </div>
</template>

<script>
import store from '../store/index'
import TemporaryPictures from '@/components/TemporaryPictures.vue'

export default {
  name: 'share',
  components: {
    TemporaryPictures
  },
  computed: {
    temporaryTableId: () => store.getters.getTemporaryTableId
  }
}
</script>
