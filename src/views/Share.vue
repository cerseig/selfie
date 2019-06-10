<template>
  <div class="share">
    <h2 class="share__title">{{ $t('share.title') }}</h2>
    <h3 class="share__subtitle">{{ $t('share.subtitle') }}</h3>

    <div class="share__inner">
      <TemporaryPictures :selection="selection" />

      <div class="share__panel">
        <div class="share__counter"><span>{{ picturesSelected }}</span></div>
        <div v-if="!selection.avatar && !selection.picture">
          <p class="teasing-1">{{ $t('share.indication') }}</p>
        </div>

        <div v-else>
          <p class="teasing-1">Partager via :</p>
          <div class="share__list--social">
            <button class="list__item" v-if="!selection.picture" data-type="facebook" @click="onClickSocialShare" >
              <Icon name="facebook" width="40" height="40" fill="#000000" />
            </button>
            <button class="list__item" v-if="!selection.picture" data-type="twitter" @click="onClickSocialShare" >
              <Icon name="twitter" width="40" height="40" fill="#000000" />
            </button>
            <button class="list__item" @click="onClickEmail">
              <Icon name="mail" width="40" height="40" fill="#000000" stroke="#ffffff" />
            </button>
          </div>

          <div class="share__email" v-if="email.share">
            <input type="email" v-model="email.adress" class="share__input" ref="emailInput" required />
            <a href="#" class="share__button" @click="onSubmitEmail">{{ $t('share.links.email.button') }}</a><br>
            <p v-if="email.sent" class="teasing-1">
              <span v-if="email.success">{{ $t('share.links.email.success', { emailAdress: email.adress }) }}</span>
              <span v-else>{{ $t('share.links.email.error') }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
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
        avatar: true,
        picture: false
      },
      email: {
        share: false,
        adress: 'leaztanda@gmail.com',
        sent: false,
        success: false
      },
      message: null,
      picturesSelected: 1
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
    updateBodyClass () {
      document.querySelector('body').className = ''
      document.querySelector('body').classList.add('default')
    },
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
    onPictureSelected (key) {
      const formerValue = this.selection[key]
      this.selection[key] = !formerValue
      this.getPicturesSelected(this.selection)
    },
    getPicturesSelected (selection) {
      if (selection.avatar && selection.picture) {
        this.picturesSelected = 2
      } else if (selection.avatar || selection.picture) {
        this.picturesSelected = 1
      } else {
        this.picturesSelected = 0
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
    this.updateBodyClass()
    this.setInitialParams()
    this.$on('TemporaryPicture:Selection', this.onPictureSelected)
  }
}
</script>

<style scoped lang="scss">

.share {
  padding: 20rem 8rem 0 8rem;
  text-align: left;

  &__title {
    margin-bottom: .5rem;
    font-size: 3rem;
    font-weight: 300;
  }

  &__subtitle {
    margin-bottom: 8rem;
    font-size: 3rem;
    font-weight: 600;
  }

  //Share list social
  &__list--social {
    margin-top: 5rem;

    .list__item {
      display: inline-block;
      margin-right: 7rem;

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

  &__counter {
    position: absolute;
    right: -15px;
    top: -15px;

    width: 50px;
    height: 50px;
    border-radius: 50%;
    @include flexCenter();

    font-family: $font__sintony;
    font-size: 2.5rem;

    background-color: $color__orange;
    color: $color__white;
  }

  &__panel {
    position: relative;
    width: fit-content;

    margin: 5rem auto 0 auto;
    padding: 5rem 10rem;

    background-color: $color__white;
    border-radius: 2.5rem;

    p {
      max-width: 500px;
    }

  }

}

</style>
