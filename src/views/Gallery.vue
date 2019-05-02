<template>
  <div class="gallery">
    <h1>{{ $t('gallery.title') }}</h1>
    <div class="addAvatars">
      <input class="addAvatar__avatar" v-model="url" type="text" />
      <input class="addAvatar__picture" v-model="picture" type="text" />
      <button type="button" @click="createAvatar()">ajouter</button>
    </div>
    <AvatarsGrid />
  </div>
</template>

<script>
import AvatarsGrid from '@/components/AvatarsGrid.vue'
import { CREATE_AVATAR_MUTATION, CREATE_USER_REPRESENTATION_MUTATION } from '@/graphQL/mutations.js'
import { ALL_AVATARS } from '@/graphQL/queries'
import store from '../store/index'

export default {
  name: 'gallery',
  data () {
    return {
      avatarId: '',
      url: '',
      picture: ''
    }
  },
  components: {
    AvatarsGrid
  },
  methods: {
    createAvatar () {
      const { url } = this.$data
      // Add avatar to avatars list
      this.$apollo.mutate({
        mutation: CREATE_AVATAR_MUTATION,
        variables: {
          url
        },
        update: (store, { data: { createAvatar } }) => {
          // Update avatars list when we had an avatar
          const data = store.readQuery({ query: ALL_AVATARS })
          data.allAvatars.push(createAvatar)
          store.writeQuery({ query: ALL_AVATARS, data })
          // Get ID of last avatar
          let avatarId = createAvatar.id
          this.addUserRepresentation(avatarId)
        }
      })
    },
    addUserRepresentation (avatarId) {
      const { picture } = this.$data
      // Add picture + avatar ID to temporary table
      this.$apollo.mutate({
        mutation: CREATE_USER_REPRESENTATION_MUTATION,
        variables: {
          avatarId: avatarId,
          picture: picture
        },
        update: (store, { data: { createUserRepresentation } }) => {
          // Get ID of this temporary table
          let temporaryTableId = createUserRepresentation.id
          this.updateTemporaryTableId(temporaryTableId)
        }
      })
    },
    updateTemporaryTableId (tableId) {
      // Update temporary table store ID
      store.commit('setTemporaryTableId', tableId)
    }
  }
}
</script>
