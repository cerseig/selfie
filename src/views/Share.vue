<template>
  <div class="share">
    <h1>{{ $t('share.title') }}</h1>
    <img :src="avatarImage" /><br>
    <a href="avatarImage" class="" rel="noopener" @click="onClickEmail" :title="$t('share.links.email.alt')">{{ $t('share.links.email.title') }}</a><br><br>
    <a :href="twitterShareLink" data-type="twitter" @click="onClickSocialShare" :title="$t('share.links.twitter.alt')" class="">{{ $t('share.links.twitter.title') }}</a><br><br>
    <a :href="facebookShareLink" data-type="facebook" @click="onClickSocialShare" :title="$t('share.links.facebook.alt')" class="">{{ $t('share.links.facebook.title') }}</a><br><br>
  </div>
</template>

<script>
export default {
  name: 'share',
  data () {
    return {
      avatarImage: 'https://dummyimage.com/400x400/a9f5e3/a5a8d1.png&text=Avatar+Image',
      appName: 'Selfish',
      location: window.location
    }
  },
  computed: {
    shareMessage () {
      return `${this.$t('share.message', { appName: this.appName })}`
    },
    twitterShareLink () {
      return encodeURI(`https://twitter.com/intent/tweet?text=${this.shareMessage}&url=${this.location}`)
    },
    facebookShareLink () {
      return encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${'http://twitter.com'}&amp;text=${this.shareMessage}`)
    }
  },
  methods: {
    setInitialParams () {
      const windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      const popupSize = {
        width: 550,
        height: 420
      }

      this.popupOptions = {
        meta: 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
        size: popupSize,
        pos: {
          left: Math.round((windowSize.width / 2) - (popupSize.width / 2)),
          top: windowSize.height > popupSize.height ? Math.round((windowSize.height / 2) - (popupSize.height / 2)) : 0
        }
      }
    },
    onClickSocialShare (e) {
      e.preventDefault()
      const currentTarget = e.currentTarget
      const targetHref = currentTarget.getAttribute('href')

      window.open(
        `${targetHref}`,
        '_blank',
        `${this.popupOptions.meta},
        width=${this.popupOptions.size.width},
        height=${this.popupOptions.size.height},
        left=${this.popupOptions.pos.left},
        top=${this.popupOptions.pos.top}`
      )
    },
    onClickEmail () {

    }
  },
  mounted () {
    this.setInitialParams()
  }
}
</script>
