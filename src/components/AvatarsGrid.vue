<template>
  <ul :class="`avatars ${avatarIsAdding ? 'has-been-update' : ''}`">
    <p v-if="loading">Loading...</p>
    <li
      v-for="avatar in allAvatars"
      :key="avatar.id"
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
      loading: 0
    }
  },
  props: {
    avatarIsAdding: {
      required: false,
      type: Boolean
    }
  },
  apollo: {
    allAvatars: {
      query: ALL_AVATARS
    }
  },
  methods: {
    addingAvatar () {
      let newAvatarParent = document.querySelector('.avatars > li:first-child')
      let newAvatar = newAvatarParent.firstChild
      console.log(newAvatar)
    }
  },
  watch: {
    avatarIsAdding () {
      if (this.avatarIsAdding) {
        this.addingAvatar()
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

    &__item {
      list-style: none;
      max-height: 250px;
      overflow: hidden;

      &:first-child {
        box-shadow: 5px 5px 10px #aaa;
      }

      &__picture {
        max-width: none;
        width: 100%;
      }
    }

    &.has-been-update {

      .avatars__item:first-child {

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          height: 100%;
          width: 100%;
          transform: translate(-50%, -50%);
          transition: all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)
        }
      }
    }
  }

</style>
