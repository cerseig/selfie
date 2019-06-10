<template>
  <div class="gallery">
    <button :class="`gallery__share ${isConclusionDone ? 'is-active' : ''}`" @click="redirectToShare">{{ $t('gallery.button.share') }}</button>
    <h1 class="gallery__title">{{ $t('gallery.title') }}</h1>
    <div class="gallery__avatars">
      <AvatarsGrid :avatarIsAdding="avatarIsAdding" :avatarPath="avatarPath"/>
    </div>
    <ModalConclusion :isActive="isModalActive" :usersNumber="allAvatars.length"/>
  </div>
</template>

<script>
import AvatarsGrid from '@/components/AvatarsGrid.vue'
import { CREATE_AVATAR_MUTATION, CREATE_USER_REPRESENTATION_MUTATION } from '@/graphQL/mutations.js'
import { ALL_AVATARS } from '@/graphQL/queries'
import store from '@/store/index'
import ModalConclusion from '@/components/modal/ModalConclusion.vue'

export default {
  name: 'gallery',
  data () {
    return {
      avatarId: '',
      url: '',
      picture: '',
      allAvatars: [],
      avatarIsAdding: false,
      isModalActive: false,
      isConclusionDone: false
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
    getAllAvatars () {
      this.$apollo.query({
        query: ALL_AVATARS
      })
    },
    updateBodyClass () {
      document.querySelector('.nav').classList.add('is-active')
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
          const data = store.readQuery({ query: ALL_AVATARS, variables: { orderBy: 'createdAt_DESC' } })
          data.allAvatars.unshift(createAvatar)
          store.writeQuery({ query: ALL_AVATARS, variables: { orderBy: 'createdAt_DESC' }, data })
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
    openConclusionModal () {
      this.$on('Animation:Gallery:AvatarAdding', () => {
        const timeOut = setTimeout(() => {
          this.isModalActive = true
          clearTimeout(timeOut)
        }, 4000)
      })
    },
    redirectToShare () {
      this.$router.push({ name: 'share' })
    }
  },
  mounted () {
    this.getAllAvatars()
    this.saveImagesInDB()
    this.updateBodyClass()
    this.openConclusionModal()
    this.$on('Modal:Conclusion:Close', () => {
      this.isModalActive = false
      this.isConclusionDone = true
    })
  }
}
</script>

<style lang="scss">
  .gallery {
    padding: 16rem 8rem 0 8rem;
    text-align: left;

    &__overlay {
      width: 100%;
      height: 100%;
      background-color: $color__white;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 5;
    }

    &__share {
      position: absolute;
      top: 30px;
      right: 50px;
      @include outlinedButton(1rem 2rem, 1.5rem);
      opacity: 0;
      transition: opacify 0.5s ease-in;

      &.is-active {
        opacity: 1;
      }

    }

    &__title {
      margin-bottom: 1.5rem;
      font-size: 5rem;
      color: $color__blue--dark;
    }

    &__subtitle {
      font-size: 3.5rem;
      font-weight: 300;
      margin-bottom: 6rem;
      display: flex;
      align-items: center;
      font-family: $font__sintony;
      span {
        font-weight: 700;
        margin-right: 10px;
        position: relative;
        &:before {
          content: '';
          width: 100%;
          height: 8px;
          background-color: $color__orange;
          position: absolute;
          bottom: -5px;
        }
      }
    }

    &__avatars {
      width: 100%;

      display: flex;
      justify-content: center;
    }
  }
</style>
