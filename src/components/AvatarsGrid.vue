<template>
  <ul :class="`avatars ${avatarIsAdding ? 'has-been-update' : ''}`">
    <img class="avatars__item__picture current-avatar" alt="Avatar">
    <p v-if="loading">Loading...</p>
    <li
      ref="avatarList"
      v-for="avatar in allAvatars"
      :key="avatar.id"
      :data-id="avatar.id"
      class="avatars__item avatar">
      <img class="avatars__item__picture" :src="avatar.url">
    </li>
  </ul>
</template>

<script>
import { ALL_AVATARS } from '@/graphQL/queries'

export default {
  name: 'AvatarsGrid',
  data () {
    return {
      allAvatars: [],
      loading: 0,
      currentAvatar: ''
    }
  },
  props: {
    avatarIsAdding: {
      required: false,
      type: Boolean
    },
    avatarPath: {
      required: false,
      type: String
    }
  },
  methods: {
    getAllAvatars () {
      this.$apollo.query({
        query: ALL_AVATARS,
        variables: {
          orderBy: 'createdAt_DESC'
        }
      }).then(result => {
        this.allAvatars = result.data.allAvatars
        this.showAllAvatars()
      })
    },
    showCurrentAvatar () {
      this.currentAvatar = document.querySelector('.current-avatar')
      this.currentAvatar.setAttribute('src', this.avatarPath)
    },

    showAllAvatars () {
      this.$nextTick(() => {
        const avatar = document.querySelectorAll('.avatar')
        this.currentAvatarParentProperties = {
          width: avatar[0].offsetWidth,
          height: avatar[0].offsetHeight,
          top: avatar[0].offsetTop,
          left: avatar[0].offsetLeft
        }
        avatar[0].firstChild.remove()
        avatar[0].appendChild(this.currentAvatar)
        this.addCurrentAvatarInGallery(this.currentAvatarParentProperties)
      })
    },

    addCurrentAvatarInGallery (container) {
      setTimeout(() => {
        this.currentAvatar.style.width = container.width + 'px'
        this.currentAvatar.style.height = container.height + 'px'
        this.currentAvatar.style.top = container.top + 'px'
        this.currentAvatar.style.left = container.left + 'px'
        this.currentAvatar.style.transform = 'translate(0,0)'
        this.$parent.$emit('Animation:Gallery:AvatarAdding')
      }, 5000)
    }
  },
  mounted () {
    this.showCurrentAvatar()
  },
  watch: {
    avatarIsAdding () {
      if (this.avatarIsAdding) {
        this.getAllAvatars()
      }
    }
  }
}
</script>

<style scoped lang="scss">

  .avatars {
    display: grid;
    grid-template-columns: 200px 200px 200px 200px;
    grid-gap: 20px;
    padding: 0;
    margin: 0;

    .current-avatar {
      z-index: 5;
      height: 100vh;
      width: 100vw;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
      background-color: $color__white;
    }

    &__item {
      list-style: none;
      max-height: 250px;
      overflow: hidden;

      &:first-child {
        // box-shadow: 5px 5px 10px #aaa;
      }

      &__picture {
        max-width: none;
        width: 100%;

      }
    }
  }

</style>
