<template>
  <ul :class="`avatars ${avatarIsAdding ? 'has-been-update' : ''}`">
    <img class="avatars__item__picture current-avatar" alt="Avatar">
    <p v-if="loading">Loading...</p>
    <li
      v-if="allAvatars"
      v-for="avatar in allAvatars"
      :key="avatar.id"
      :data-id="avatar.id"
      class="avatars__item">
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
  apollo: {
    allAvatars: {
      query: ALL_AVATARS,
      variables: {
        orderBy: 'createdAt_DESC'
      }
    }
  },
  methods: {
    showCurrentAvatar () {
      console.log('show current avatar')
      this.currentAvatar = document.querySelector('.current-avatar')
      this.currentAvatar.setAttribute('src', this.avatarPath)
    },

    showAllAvatars () {
      console.log('show all avatars')
      this.$nextTick(() => {
        let currentAvatarParent = document.querySelectorAll('.avatars.has-been-update > li')[0]
        console.log('current avatar parent', currentAvatarParent)
        this.currentAvatarParentProperties = {
          width: currentAvatarParent.offsetWidth,
          height: currentAvatarParent.offsetHeight,
          top: currentAvatarParent.offsetTop,
          left: currentAvatarParent.offsetLeft
        }
        currentAvatarParent.firstChild.remove()
        currentAvatarParent.appendChild(this.currentAvatar)
        this.addCurrentAvatarInGallery(this.currentAvatarParentProperties)
      })
    },

    addCurrentAvatarInGallery (container) {
      console.log('add current avatar in gallery')
      setTimeout(() => {
        this.currentAvatar.style.width = container.width + 'px'
        this.currentAvatar.style.height = container.height + 'px'
        this.currentAvatar.style.top = container.top + 'px'
        this.currentAvatar.style.left = container.left + 'px'
        this.currentAvatar.style.transform = 'translate(0,0)'
      }, 5000)
    }
  },
  mounted () {
    this.showCurrentAvatar()
  },
  watch: {
    avatarIsAdding () {
      if (this.avatarIsAdding && !this.loading) {
        this.showAllAvatars()
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
