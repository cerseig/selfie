<template>
  <ul class="avatarsGrid">
    <p v-if="loading">Loading...</p>
    <li
      v-for="avatar in allAvatars"
      :key="avatar.id">
      {{avatar.url}}
    </li>
  </ul>
</template>

<script>
  import { ALL_AVATARS } from '@/graphQL/queries';

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
</style>
