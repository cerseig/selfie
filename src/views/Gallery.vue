<template>
  <div class="gallery">
    <button @click="onClickConclusion">conclusion</button>
    <h1 class="gallery__title heading-1">{{ $t('gallery.title') }}</h1>
    <p class="gallery__counter"><span>{{ allAvatars.length }}</span> {{ $t('gallery.counter') }}</p>
    <div class="gallery__avatars">
      <AvatarsGrid :avatarIsAdding="avatarIsAdding" :avatarPath="avatarPath"/>
    </div>
    <ModalConclusion :isActive="isModalActive" />
  </div>
</template>

<script>
import AvatarsGrid from '@/components/AvatarsGrid.vue'
import { CREATE_AVATAR_MUTATION, CREATE_USER_REPRESENTATION_MUTATION } from '@/graphQL/mutations.js'
import { ALL_AVATARS } from '@/graphQL/queries'
import store from '@/store/index'
import ModalConclusion from '@/components/ModalConclusion.vue'

export default {
  name: 'gallery',
  data () {
    return {
      avatarId: '',
      url: '',
      picture: '',
      allAvatars: [],
      avatarIsAdding: false,
      isModalActive: false
    }
  },
  apollo: {
    allAvatars: {
      query: ALL_AVATARS
    }
  },
  components: {
    AvatarsGrid,
    ModalConclusion
  },
  computed: {
    isAvatarSavedInDB: () => store.getters.getIsAvatarSavedInDB,
    isPictureSavedInDB: () => store.getters.getIsPictureSavedInDB,
    avatarPath: () => store.getters.getAvatarPath,
    picturePath: () => store.getters.getPicturePath
  },
  methods: {
    updateBodyClass () {
      document.querySelector('body').className = ''
      document.querySelector('body').classList.add('application')
    },
    saveImagesInDB () {
      if (!this.isAvatarSavedInDB && this.avatarPath.length > 0) {
        this.url = this.avatarPath
      }
      if (!this.isPictureSavedInDB && this.picturePath.length > 0) {
        this.picture = this.picturePath
      }
      if (!this.isPictureSavedInDB && !this.isAvatarSavedInDB && this.avatarPath.length > 0 && this.picturePath.length > 0) {
        this.addAvatar()
      }
    },
    addAvatar () {
      // Add avatar to avatars list
      this.$apollo.mutate({
        mutation: CREATE_AVATAR_MUTATION,
        variables: {
          url: this.url
        },
        update: (store, { data: { createAvatar } }) => {
          // Update avatars list when we had an avatar
          const data = store.readQuery({ query: ALL_AVATARS, variables: {orderBy: 'createdAt_DESC'} })
          data.allAvatars.unshift(createAvatar)
          store.writeQuery({ query: ALL_AVATARS, data })
          // Get ID of last avatar
          let avatarId = createAvatar.id
          this.addUserRepresentation(avatarId)
        }
      }).then((data) => {
        this.avatarIsAdding = true
      })
    },
    addUserRepresentation (avatarId) {
      // Add picture + avatar ID to temporary table
      this.$apollo.mutate({
        mutation: CREATE_USER_REPRESENTATION_MUTATION,
        variables: {
          avatarId: avatarId,
          picture: this.picture
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
    },
    onClickConclusion () {
      this.isModalActive = true
    }
  },
  mounted () {
    this.saveImagesInDB()
    this.updateBodyClass()
    this.$on('Modal:Conclusion:Close', () => {
      this.isModalActive = false
    })
  }
}
</script>

<style lang="scss">
  .gallery {
    margin-top: 10rem;

    &__title {
      margin-bottom: 2rem;
    }

    &__counter {
      font-size: 1.5rem;
      font-weight: 300;
      margin-bottom: 6rem;
    }

    &__avatars {
      width: 100%;

      display: flex;
      justify-content: center;
    }
  }
</style>
