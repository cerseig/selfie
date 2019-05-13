<template>
  <ul class="avatars">
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
  apollo: {
    allAvatars: {
      query: ALL_AVATARS
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
      max-height: 200px;
      overflow: hidden;

      &:first-child {
        box-shadow: 5px 5px 10px #aaa;
      }

      &__picture {
        max-width: none;
        width: 100%;
      }
    }
  }

</style>
