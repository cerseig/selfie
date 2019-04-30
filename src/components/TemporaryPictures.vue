<template>
  <div class="temporary__pictures">
    <h1>Avatar</h1>
    <img :src="temporaryPictures.avatar.url">

    <h1>Picture</h1>
    <img :src="temporaryPictures.picture">

  </div>
</template>

<script>
import { GET_USER_REPRESENTATION } from '@/graphQL/queries'

export default {
  name: 'TemporaryPictures',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      temporaryPictures: ''
    }
  },
  methods: {
    getTemporaryPictures () {
      this.$apollo.query({
        query: GET_USER_REPRESENTATION,
        variables: {
          id: this.id
        }
      }).then(result => this.temporaryPictures = result.data.UserRepresentation)
    }
  },
  mounted () {
    this.getTemporaryPictures()
  }
}
</script>

<style scoped lang="scss">

</style>
