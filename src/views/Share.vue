<template>
  <div class="share">
    <h2 class="share__title heading-1">{{ $t('share.title') }}</h2>

    <div class="share__inner">
      <TemporaryPictures />
      <div class="share__bottom">
        <p class="teasing-1">Partager sur</p>
        <div class="share__list--social">
          <button class="list__item" data-type="facebook" @click="onClickSocialShare" >
            <Icon name="facebook" width="40" height="40" fill="#000000" />
          </button>
          <button class="list__item" data-type="twitter" @click="onClickSocialShare" >
            <Icon name="twitter" width="40" height="40" fill="#000000" />
          </button>
          <button class="list__item" @click="onClickEmail">
            <Icon name="mail" width="40" height="40" fill="#000000" stroke="#ffffff" />
          </button>
        </div>

        <div class="">
          <input type="email" v-model="email.adress" class="share__input" ref="emailInput" required />
          <a href="#" class="share__button" @click="onSubmitEmail">Envoyer</a><br>
          <p v-if="email.sent" class="teasing-1">
            <span v-if="email.success">{{ $t('share.links.email.success', { emailAdress: email.adress }) }}</span>
            <span v-else>{{ $t('share.links.email.error') }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- <div v-if="temporaryTableId.length > 0" >
      <TemporaryPictures :id="temporaryTableId" />
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import config from '@/config/config.js'
import TemporaryPictures from '@/components/TemporaryPictures.vue'
import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'share',
  components: {
    TemporaryPictures,
    Icon
  },
  data () {
    return {
      avatarImage: 'https://dummyimage.com/400x400/a9f5e3/a5a8d1.png&text=Avatar+Image',
      appName: 'Selfish',
      location: window.location,
      selection: {

      },
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
          .post(`${process.env.VUE_APP_SCRIPT_BASEURL}${config.server.sendEmail}`, {
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

<style scoped lang="scss">

.share {
  margin-top: 10rem;

  &__title {
    padding-top: 6rem;
    margin-bottom: 6.5rem;
  }

  //Share list social
  &__list--social {
    margin-top: 5rem;

    .list__item {
      display: inline-block;
      margin-right: 7.5rem;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  &__input {
    @include outlinedButton(1rem 2rem, 1.5rem);
    width: 30rem;
    margin-top: 3rem;
    margin-right: 2rem;
  }

  &__button {
    @include outlinedButton(1rem 2rem, 1.5rem);
  }

  &__bottom {
    margin-top: 4.8rem;
  }

}

</style>
