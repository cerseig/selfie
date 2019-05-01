<template>
  <div class="share">
    <h1>{{ $t('share.title') }}</h1>
    <div v-if="temporaryTableId.length > 0" >
      <TemporaryPictures :id="temporaryTableId" />
    </div>
    <a href="#" class="" rel="noopener" @click="onClickEmail" :title="$t('share.links.email.alt')">{{ $t('share.links.email.title') }}</a><br>
    <div class="" v-if="email.share">
      <br>
      <input type="email" v-model="email.adress" ref="emailInput" required />
      <a href="#" @click="onSubmitEmail">Envoyer</a><br>
      <p v-if="email.sent">
        <span v-if="email.success">{{ $t('share.links.email.success', { emailAdress: email.adress }) }}</span>
        <span v-else>{{ $t('share.links.email.error') }}</span>
      </p>
    </div><br>

    <a :href="twitterShareLink" data-type="twitter" @click="onClickSocialShare" :title="$t('share.links.twitter.alt')" class="">{{ $t('share.links.twitter.title') }}</a><br><br>
    <a :href="facebookShareLink" data-type="facebook" @click="onClickSocialShare" :title="$t('share.links.facebook.alt')" class="">{{ $t('share.links.facebook.title') }}</a><br><br>

  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import TemporaryPictures from '@/components/TemporaryPictures.vue'

export default {
  name: 'share',
  components: {
    TemporaryPictures
  },
  data () {
    return {
      avatarImage: 'https://dummyimage.com/400x400/a9f5e3/a5a8d1.png&text=Avatar+Image',
      appName: 'Selfish',
      location: window.location,
      email: {
        share: false,
        adress: 'leaztanda@gmail.com',
        sent: false,
        success: false
      },
      message: null
    }
  },
  computed: {
    temporaryTableId: () => store.getters.getTemporaryTableId,
    lang: () => store.getters.getLang,
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
    onClickEmail (e) {
      e.preventDefault()
      this.email.share = true
    },
    onSubmitEmail (e) {
      const isValid = this.$refs.emailInput.checkValidity() || this.$refs.emailInput.reportValidity()
      const temporaryPictures = this.$children[0].temporaryPictures

      if (isValid) {
        this.email.sent = true

        axios
          .post('http://localhost:8000/send-email.php', {
            lang: this.lang,
            urlAvatar: temporaryPictures.avatar.url,
            urlPicture: temporaryPictures.picture,
            email: this.email.adress
          }).then(response => {
            this.email.success = response.data.success
          }).catch(() => {
            this.email.success = false
          })
      }
    }
  },
  mounted () {
    this.setInitialParams()
  }
}
</script>
