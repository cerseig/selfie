<template>
  <div class="gallery">
    <h1>This is a gallery page</h1>
    <div class="addAvatar">
      <input v-model="url" type="text" />
      <button @click="addAvatar()">ajouter</button>
    </div>
    <AvatarsGrid />
  </div>
</template>

<script>
import AvatarsGrid from '@/components/AvatarsGrid.vue'
import { CREATE_AVATAR_MUTATION } from '@/graphQL/mutations.js'

export default {
  name: 'gallery',
  data () {
    return {
      url: ''
    }
  },
  components: {
    AvatarsGrid
  },
  methods: {
    addAvatar() {
      const { url } = this.$data
      this.$apollo.mutate({
        mutation: CREATE_AVATAR_MUTATION,
        variables: {
          url
        }
      })
      this.addUserRepresentation(idAvatar)
    },
    addUserRepresentation() {

    }
  }
}
</script>
