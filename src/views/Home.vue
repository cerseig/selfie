<template>
  <div :class="`home`">
    <div :class="`home__container ${isIntro ? 'is-hidden' : ''}`">
      <Icon class="home__logo" name="logo-baseline"/>
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
        <button class="home__start--button" @click="openIntro">{{ $t('home.start') }}</button>
      </div>
      <div class="home__redirection" v-else>
        <h3>Pour vivre pleinement l'expérience, rends toi sur Safari</h3>
      </div>

      <button class="home__about home__about--button" @click="openAboutPopUp">{{ $t('home.about') }}</button>
      <div :class="`home__popup ${isOpen ? 'home__popup--open' : ''}`">
        <button class="home__popup__close" @click="closePopUp">
          <Icon name="close" width="29" height="29" fill="#000000" />
        </button>
        <About />
      </div>

      <div class="home__avatars">
        <ul class="avatars">
          <li class="avatar">
            <div class="avatar__head">
              <img :src="`${publicPath}/img/avatars/avatar1_head.png`">
            </div>
            <div class="avatar__body" >
              <img :src="`${publicPath}/img/avatars/avatar1_body.png`">
            </div>
          </li>
          <li class="avatar">
            <div class="avatar__head avatar__head--behind">
              <img :src="`${publicPath}/img/avatars/avatar2_head.png`">
            </div>
            <div class="avatar__body" >
              <img :src="`${publicPath}/img/avatars/avatar2_body.png`">
            </div>
          </li>
          <li class="avatar">
            <div class="avatar__head avatar__head--behind">
              <img :src="`${publicPath}/img/avatars/avatar3_head.png`">
            </div>
            <div class="avatar__body" >
              <img :src="`${publicPath}/img/avatars/avatar3_body.png`">
            </div>
          </li>
          <li class="avatar">
            <div class="avatar__head">
              <img :src="`${publicPath}/img/avatars/avatar4_head.png`">
            </div>
            <div class="avatar__body" >
              <img :src="`${publicPath}/img/avatars/avatar4_body.png`">
            </div>
          </li>
          <li class="avatar">
            <div class="avatar__head">
              <img :src="`${publicPath}/img/avatars/avatar5_head.png`">
            </div>
            <div class="avatar__body" >
              <img :src="`${publicPath}/img/avatars/avatar5_body.png`">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div :class="`home__intro ${isIntro ? 'is-active' : ''}`">
      <Intro :isIntro="isIntro" />
    </div>
  </div>
</template>

<script>
// Components
import About from '@/components/About.vue'
import Intro from '@/components/Intro.vue'
import Icon from '@/components/icons/Icon.vue'

// Config
import voiceSprite from '@/config/voiceSprite'

// Libs
import { Howl } from 'howler'

// Modules
import store from '../store/index'

export default {
  name: 'home',
  components: {
    About,
    Icon,
    Intro
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
      isIntro: false,
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
      const body = document.querySelector('body')
      body.className = ''
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
    openIntro () {
      this.isIntro = true
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

    &__container {
      padding: 0 20px;
      overflow: hidden;
    }

    &__logo {
      width: 180px;
      height: 180px;
      pointer-events: none;
      transition: transform .5s, opacity .2s .5s;
    }

    &__description {
      max-width: 100%;
      margin: 2rem auto;

      font-weight: 300;
      font-size: 1.8rem;
    }

    &__select {
      margin: 0 auto 10px auto;
      height: 40px;
      width: 180px;
      @include flexCenter();
      @include containedButton(0, 1rem, $color__black, $color__white);
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
          width: 120px;

          position: relative;
          @include flexCenter();
        }

        &__language {
          position: absolute;

          opacity: 0;
          z-index: 0;

          font-size: 1.6rem;
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
        height: 40px;
        width: 180px;
        @include outlinedButton(0 0, 1.5rem);
      }
    }

    &__avatars {
      margin: 30px auto 0 auto;
      height: 170px;
      width: calc(100vw - 40px);
      position: relative;
      pointer-events: none;
      transition: transform .3s;

      .avatars {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-wrap: wrap;

        .avatar {
          flex: 1;
          position: relative;
          width: 100px;

          &__head, &__body {
            display: block;
            position: relative;
          }

          img {
            height: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &__head {
            height: 130px;
            margin-bottom: -18px;
            z-index: 1;
            transform-origin: bottom;
            &--behind {
              z-index: 3;
            }
          }

          &__body {
            height: 60px;
            z-index: 2;
          }

          &:nth-of-type(1) {
            .avatar__head {
              animation: tiltLeft 4s infinite;
            }
          }

          &:nth-of-type(3) {
            margin-left: -5px;
            .avatar__head {
              animation: tiltRight 6s linear 3s infinite;
            }
          }

          &:nth-of-type(4) {
            margin-left: 10px;
            .avatar__head {
              animation: tiltRightLeft 8s linear 2s infinite;
            }
          }
        }
      }

    }

    &__about {
      position: absolute;
      top: 30px;
      right: 30px;
      transition: opacity .3s;
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

    &__intro {
      position: absolute;
      transform: scale(0);
      transition: transform 0.3s ease;
      z-index: 10;

      &.is-active {
        transform: scale(1);
      }

    }
  }

  //Transitions
  .home-fade-leave-active {
    .home__description,
    .home__actions,
    .home__about {
      opacity: 0;
    }

    .home__avatars {
      transform: translateY(100%);
    }

    .home__logo {
      transform: translate(0, 70%) scale(1.25);
      opacity: 0;
    }
  }

  /* ----- TABLET IPAD ----- */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
    .home {

      &__logo {
        width: 300px;
        height: 300px;
      }

      &__description {
        font-size: 2.7rem;
        line-height: 4rem;
        max-width: 600px;
        margin: 0 auto 6rem auto;
        transition: opacity .3s;
      }

      &__select {
        margin: 0 auto 30px auto;
        width: 300px;
        height: 60px;
        @include containedButton(0, 2.2rem, $color__black, $color__white);

        .select {

          &__languages {
            width: 210px;
          }

          &__language {
            font-size: 2.2rem;
          }

        }

      }

      &__start {
        &--button {
          width: 300px;
          height: 60px;
          @include outlinedButton(0, 2.2rem);
        }
      }

      &__avatars {
        margin: 30px auto 0 auto;
        height: 320px;
        width: calc(100vw - 100px);

        .avatars {

          .avatar {
            width: 100px;

            &__head {
              height: 300px;
              margin-bottom: -50px;
            }

            &__body {
              height: 100px;
            }

            &:nth-of-type(3) {
              margin-left: -10px;
            }

            &:nth-of-type(4) {
              margin-left: 30px;
            }
          }
        }

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

  /* ----- TABLET IPAD PRO ----- */
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
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
        margin: 60px auto 0 auto;
        height: 400px;
        width: calc(100vw - 100px);

        .avatars {

          .avatar {
            width: 140px;

            &__head {
              height: 350px;
              margin-bottom: -50px;
            }

            &__body {
              height: 140px;
            }

            &:nth-of-type(3) {
              margin-left: -10px;
            }

            &:nth-of-type(4) {
              margin-left: 30px;
            }
          }
        }

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
