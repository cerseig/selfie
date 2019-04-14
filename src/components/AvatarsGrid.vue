<template>
  <ul class="avatarsGrid">
    <h4 v-if="loading">Loading...</h4>
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
      allLinks: {
        query: ALL_AVATARS
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
