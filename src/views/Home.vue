<template>
  <div class="home">
    <div class="home__container">
      <Icon class="home__logo" name="logo-baseline"/>
      <!-- <img class="home__logo" :src="`${publicPath}/img/logos/logo_baseline.svg`"> -->
      <h2 class="home__description">{{ $t('home.description') }}</h2>

      <div class="home__actions" v-if="isIosSafari">
        <div class="home__select">
        <span class="select__arrow" @click="onChangeLang">
          <Icon name="little-arrow" width="15" height="15" fill="#000000" />
        </span>
          <ul class="select__languages">
            <li v-for="(lang, index) in availableLanguages"
                :class="`select__language ${index === 0 ? 'is-selected' : ''}`"
                :key="`lang-${lang.ident}`"
                :data-value="lang.ident">
              {{lang.lang}}
            </li>
          </ul>
          <span class="select__arrow" @click="onChangeLang">
          <Icon name="little-arrow" width="15" height="15" fill="#000000" />
        </span>
        </div>
        <router-link class="home__start" :to="{ name: 'intro' }"><button class="home__start--button">{{ $t('home.start') }}</button></router-link>
      </div>
      <div class="home__redirection" v-else>
        <h3>Pour vivre pleinement l'expérience, rends toi sur Safari</h3>
      </div>

      <button class="home__about home__about--button" @click="openAboutPopUp">{{ $t('home.about') }}</button>
      <div :class="`home__popup ${isOpen === true ? 'home__popup--open' : ''}`">
        <button class="home__popup__close" @click="closePopUp">
          <Icon name="close" width="29" height="29" fill="#000000" />
        </button>
        <About />
      </div>

      <div class="home__avatars">
        <ul class="avatars">
          <li class="avatar">
            <img class="avatar__head" :src="`${publicPath}/img/avatars/avatar1_head.png`">
            <img class="avatar__body" :src="`${publicPath}/img/avatars/avatar1_body.png`">
          </li>
          <li class="avatar">
            <img class="avatar__head" :src="`${publicPath}/img/avatars/avatar2_head.png`">
            <img class="avatar__body" :src="`${publicPath}/img/avatars/avatar2_body.png`">
          </li>
          <li class="avatar">
            <img class="avatar__head" :src="`${publicPath}/img/avatars/avatar3_head.png`">
            <img class="avatar__body" :src="`${publicPath}/img/avatars/avatar3_body.png`">
          </li>
          <li class="avatar">
            <img class="avatar__head" :src="`${publicPath}/img/avatars/avatar4_head.png`">
            <img class="avatar__body" :src="`${publicPath}/img/avatars/avatar4_body.png`">
          </li>
          <li class="avatar">
            <img class="avatar__head" :src="`${publicPath}/img/avatars/avatar5_head.png`">
            <img class="avatar__body" :src="`${publicPath}/img/avatars/avatar5_body.png`">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index'
import About from '@/components/About.vue'
import Icon from '@/components/icons/Icon.vue'
import voiceSprite from '@/config/voiceSprite'
import { Howl } from 'howler'

export default {
  name: 'home',
  components: {
    About,
    Icon
  },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      availableLanguages: [
        {
          ident: 'fr',
          lang: 'Français'
        },
        {
          ident: 'en',
          lang: 'English'
        }
      ],
      isOpen: false,
      isIosSafari: true
    }
  },
  methods: {
    onDetectDevice () {
      let isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) // true or false
      if (isIOS) {
        if (navigator.userAgent.match('CriOS')) {
          this.isIosSafari = false
          console.log('Chrome', this.isIosSafari)
        } else {
          this.isIosSafari = true
          console.log('Not Chrome', this.isIosSafari)
        }
      }
    },
    updateBodyClass () {
      document.querySelector('body').className = ''
      document.querySelector('body').classList.add('default')
      document.querySelector('.nav').classList.add('nav--start')
    },
    onChangeLang () {
      let selectLanguage = document.querySelector('.is-selected').nextSibling
      if (selectLanguage !== null) {
        this.$i18n.locale = selectLanguage.getAttribute('data-value')
        store.commit('setLang', this.$i18n.locale)
      } else {
        selectLanguage = document.querySelector('.is-selected').previousSibling
        this.$i18n.locale = selectLanguage.getAttribute('data-value')
        store.commit('setLang', this.$i18n.locale)
      }
      document.querySelector('.is-selected').classList.remove('is-selected')
      selectLanguage.classList.add('is-selected')
    },
    openAboutPopUp () {
      this.isOpen = true
    },
    closePopUp () {
      this.isOpen = false
    },
    initSoundContext () {
      const source = '/sounds/voice_fr.mp3'
      this.sound = new Howl({
        src: [source],
        sprite: voiceSprite
      })
      store.commit('setSound', this.sound)
    }
  },
  computed: {
    lang: () => store.getters.getLang
  },
  mounted () {
    this.updateBodyClass()
    this.initSoundContext()
    this.onDetectDevice()
  }
}
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    &__logo {
      width: 200px;
      height: 200px;
    }

    &__description {
      max-width: 500px;
      margin: 2rem auto;

      font-weight: 300;
      font-size: 2rem;
    }

    &__select {
      margin: 0 auto 20px auto;
      height: 60px;
      width: 300px;
      @include flexCenter();
      @include containedButton(2.2rem 0, 2.5rem, $color__black, $color__white);
      text-transform: initial;

      .select {

        &__arrow {
          cursor: pointer;

          &:first-child {
            svg {
              transform: rotate(180deg)
            }
          }
        }

        &__languages {
          width: 150px;

          position: relative;
          @include flexCenter();
        }

        &__language {
          position: absolute;

          opacity: 0;
          z-index: 0;

          font-size: 2rem;
          font-weight: 700;

          &.is-selected {
            opacity: 1;
            z-index: 1;
          }

        }

      }
    }

    &__start {
      &--button {
        margin: 0 auto;
        height: 60px;
        width: 300px;
        @include outlinedButton(1.5rem 8rem, 2rem);
      }
    }

    &__avatars {
      margin-top: 80px;
      max-height: 300px;

      .avatars {
        list-style: none;
        display: flex;
        align-items: flex-end;
        .avatar {
          &__head {

          }
          &__body {

          }
        }
      }

    }

    &__about {
      position: absolute;
      top: 30px;
      right: 30px;
      &--button {
        @include textButton(1.4rem);
      }
    }

    &__popup {
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left:0;

      opacity: 0;
      z-index: -1;

      &__close {
        position: absolute;
        top: 1rem;
        left: 1rem;

        z-index: 10;

        // transform: rotate(45deg);
      }

      &--open {
        opacity: 1;
        z-index: 10;
      }

    }
  }

  /* ----- TABLET ----- */
  @media (min-width: 769px) and (max-width: 1024px)  {
    .home {

      &__logo {
        width: 400px;
        height: 400px;
      }

      &__description {
        font-size: 2.7rem;
        line-height: 4rem;
        max-width: 600px;
        margin: 0 auto 6rem auto;
      }

      &__select {
        margin: 0 auto 30px auto;
        width: 400px;
        height: 75px;
        @include containedButton(2.2rem 0, 2.5rem, $color__black, $color__white);

        .select {

          &__languages {
            width: 230px;
          }

          &__language {
            font-size: 2.5rem;
          }

        }

      }

      &__start {
        &--button {
          width: 400px;
          height: 75px;
          @include outlinedButton(1.8rem 0, 2.5rem);
        }
      }

      &__avatars {
        max-height: 420px;
      }

      &__about {
        &--button {
          @include textButton(2rem);
        }
      }

      &__popup {
        &__close {
          top: 5rem;
          left: 5rem;
        }
      }
    }
  }
</style>
