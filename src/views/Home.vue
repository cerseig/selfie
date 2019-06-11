<template>
  <div :class="`home ${isIntro ? 'is-intro-active' : ''}`">
    <div :class="`home__container ${isIntro ? 'is-hidden' : ''}`">
      <svg id="icon-logo-baseline" class="home__logo" viewBox="0 0 902.8 772.3">
        <g class="home__logo__baseline">
          <path fill="#022551" d="M458.8 564.4c-61-9.2-159.5 20.5-227.7 6.9-54.3-10.9-135.3.3-135.3.3-29.8.1-54.1-26.1-54.1-55.9-.1-29.8 12.1-60.2 53.9-59.1 63.3 1.7 163.2 19.9 234.2.9 55.4-14.8 120.4-7.2 144.5-1.6 41.5 9.6 54.1 29.1 54.1 58.9.1 29.8-16.6 57.6-69.6 49.6zM790.8 710c2.1.1-94.8-8.5-159 3.5-118 22-245 14-366.1 3.2-69.9-6.2-122.9-1.2-173.6 5.6-53.1 7.1-54.1-43-54.2-72.8-.1-29.8 4.9-57.9 53.8-59.2 80.9-2.1 175.1 16.3 328.4-6.1 87.5-12.7 175.1 10 282.7 12.3 46 1 103-9 103-9 39-2 38.7 29.5 38.8 59.3.1 29.8 12.2 59.6-53.8 63.2z"/>
          <path style="fill:#FFF" d="M154.5 496.4c8 0 13 3.6 13 9.7 0 4.4-2.6 7.7-6.8 8.7 5.2.9 8.3 4.6 8.3 9.8 0 6.6-5.4 10.6-14.1 10.7h-17.2l-.1-38.8 16.9-.1zm-10.3 16h10c4.2 0 6.6-2 6.6-5.2 0-3.3-2.5-5-6.7-5h-10l.1 10.2zm.1 16.9h10c5.1 0 8.1-2 8.1-5.7 0-3.4-3.1-5.5-8.2-5.5h-10l.1 11.2zM210.3 519c0 10.1-6.3 16.4-16.8 16.4s-16.9-6.2-16.9-16.3v-22.7h6.5v22.7c0 6.5 4.1 10.5 10.4 10.5 6.3 0 10.2-3.9 10.2-10.5v-22.7h6.5l.1 22.6zM234.4 502.1l.1 32.9H228l-.1-32.9h-12.2v-5.9l31.1-.1v5.9l-12.4.1zM274.2 502v11.2h17.6v5.8h-17.6v15.9h-6.5l-.1-38.8h26v5.9h-19.4zM300.2 534.9l-.1-38.8h6.5l.1 38.8h-6.5zM335 523.1c-.6.1-1.2.1-1.8.1H324v11.7h-6.5l-.1-38.8h15.7c9.9 0 15.6 4.8 15.6 13.2 0 6.2-2.9 10.6-8 12.6l8.7 12.9H342l-7-11.7zm-1.8-5.9c6 0 9.4-2.6 9.4-7.8 0-5.1-3.4-7.5-9.4-7.5H324v15.3h9.2zM384.3 499.6l-2.7 5.8c-4.2-2.5-8.4-3.6-11.4-3.6-3.8 0-6.3 1.5-6.3 4.1 0 8.5 21 3.9 20.9 17.9 0 6.9-6.1 11.2-14.6 11.2-6.1 0-11.9-2.5-15.9-6.1l2.8-5.7c4 3.6 9 5.6 13.1 5.6 4.5 0 7.3-1.7 7.2-4.7 0-8.6-21-3.8-21-17.6 0-6.6 5.7-10.8 14.1-10.8 5.3 0 10.2 1.6 13.8 3.9zM407.2 501.8l.1 32.9h-6.5l-.1-32.9h-12.2v-5.9l31.1-.1v5.9l-12.4.1zM430.1 531.5c0 1.1-.4 2.1-1 2.9l-3.1 4.8h-3.3l2.1-4.8c-1-.7-1.5-1.7-1.5-2.9 0-2 1.4-3.5 3.4-3.6 1.7 0 3.3 1.3 3.4 3.6z"/>
          <g>
            <path style="fill:#FFF" d="M155.2 670.1v5.9h-23.3l-.1-38.8h6.5l.1 32.9h16.8zM168.5 643v10.5h18.9v5.9h-18.9v10.7h21.8v5.9H162l-.1-38.8 27.7-.1v5.9h-21.1zM213.1 643l.1 32.9h-6.5l-.1-32.9h-12.2v-5.9l31.1-.1v5.9l-12.4.1zM281.4 675.7l-.1-29-12.2 25h-4.3l-12.3-24.9.1 29h-6.1l-.1-38.8h7.8l12.8 25.7 12.7-25.8h7.7l.1 38.8h-6.1zM304.7 642.8v10.5h18.9v5.9h-18.9v10.7h21.8v5.9l-28.4.1-.1-38.8 27.7-.1v5.9l-21-.1zM364.1 642.7l.1 32.9h-6.5l-.1-32.9h-12.2v-5.9l31.1-.1v5.9l-12.4.1zM384.3 666.8l-3.7 8.8h-6.8l17-38.8h6.7l17 38.8h-7l-3.7-8.7-19.5-.1zm9.7-23.1l-7.3 17.2h14.6l-7.3-17.2zM433.3 658.3l-6.6 7.3v9.9h-6.5l-.1-38.8h6.5v20.1l18.5-20.1h7.7l-15 16.6 16.1 22.2H446l-12.7-17.2zM467 642.5V653h18.9v5.9H467v10.7h21.8v5.9l-28.4.1-.1-38.8 27.7-.1v5.9l-21-.1zM517.8 666.5l-3.7 8.8h-6.8l17-38.8h6.7l17 38.8h-7l-3.7-8.7-19.5-.1zm9.7-23l-7.3 17.2h14.6l-7.3-17.2zM594.9 640.1l-2.7 5.8c-4.2-2.5-8.4-3.6-11.4-3.6-3.8 0-6.3 1.5-6.3 4.1 0 8.5 21 3.9 20.9 17.9 0 6.9-6.1 11.2-14.6 11.2-6.1 0-11.9-2.5-15.9-6.1l2.8-5.7c4 3.6 9 5.6 13.1 5.6 4.5 0 7.3-1.7 7.2-4.7 0-8.6-21-3.8-21-17.6 0-6.6 5.7-10.8 14.1-10.8 5.2-.1 10.2 1.5 13.8 3.9zM610.1 642.2v10.5H629v5.9h-18.9v10.7h21.8v5.9l-28.4.1-.1-38.8 27.7-.1v5.9l-21-.1zM663.8 669.1v5.9h-23.3l-.1-38.8h6.5l.1 32.9h16.8zM677.1 642.1v11.2h17.6v5.8h-17.6V675h-6.5l-.1-38.8h26v5.9h-19.4zM703.1 674.9l-.1-38.8h6.5l.1 38.8h-6.5zM726.8 642v10.5h18.9v5.9h-18.9v10.7h21.8v5.9l-28.4.1-.1-38.8 27.7-.1v5.9l-21-.1z"/>
          </g>
        </g>
        <g fill="#E14718">
          <path d="M341.1 309c8.2-35.2 44.5-135.3 20.9-192.1-20.4-49-87.1-88.6-163.8-64.9C111 78.9 43.6 182.1 39.8 245.9c-4.3 71.7 35.9 128 84.3 134.9 89.6 12.9 116.6-28.9 132.3-39.2 15.7-10.4-10.9 25.2 23.1 54.1 21.5 18.2 81.1 29.3 94.9 18.8 0 .1-53.6-18.2-33.3-105.5zm-75.8-67.2c-44 64.8-99.5 92.6-136.4 59.7-31.1-27.7-9-87.7 15.1-122.5 37.9-54.6 95-81.7 133.5-54.1 41.2 29.7 14.9 76.9-12.2 116.9zM645.6 319.3c.1-4.1.5-10.8.8-18.9.6-7.2.8-14.6.8-22.2.2-10.1.1-20.7-.5-30.8-.1-3-.1-5.9-.1-8.8-.2-39.5-33-58.5-52.9-55.7-21 2.9-40.8 12.8-54 28.3-11.2-11.6-26.2-16.7-37-14.6-47.2 9.2-49 40.2-58.8 39.2-8.2-.8 6.3-28.6 10.8-41.4 5.7-16-13-42.6-40.5-24.4-16.2 10.7-22.2 30.9-23.6 47.6-3 35.9-8.4 78.1-8.5 110.5-.2 32.4 12.5 55.8 41.3 52.4 28.1-3.3 32.9-43.4 35.9-57 3-13.6 10.4-58.2 25.9-62.6 15.5-4.4 5.8 51.7 4.5 76.2-1.4 24.5 13.4 37.1 29.6 35 42.5-5.8 31.3-126.4 56.9-124.9 16.1.9-2.2 93.1 29.1 119.7 31 26.4 63.3 10.6 69.3 3.7 0 0-29.8-3.6-29-51.3z"/>
          <path d="M600.6 416.2c-21.2-17.2-39.4-43.6-39.4-43.6-1.3-2-13.5 16.4-8.7 39.7 6.1 29.6 31.1 73 87.5 83.3 54.2 10 105.6-6.7 142.4-45.3 22.8-23.9 43.8-48.2 53.4-83 9.5-34.8-2.7-80 24-127 16-28.2-8.1-56.6-37-55.5-28.3 1-36.2 40.7-40.3 54s-15 57.2-30.8 60.3c-15.8 3.1-1.7-52 1.6-76.3s-10.6-39.8-26.7-37.2c-44.6 7.2-42.6 77.2-45.8 116.6s28.4 62 48.4 59.7c47.7-5.4 52-36.2 61.7-34.5 8.1 1.4-28.8 90.6-90 107.6-41 11.4-72.1 4-100.3-18.8z"/>
        </g>
      </svg>
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
import AssetsLoader from '@/modules/loader/AssetsLoader'

// GraphQL
import { ALL_AVATARS } from '@/graphQL/queries'

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
      isIosSafari: true,
      allAvatars: []
    }
  },
  methods: {
    getAllAvatars () {
      this.$apollo.query({
        query: ALL_AVATARS,
        variables: {
          orderBy: 'createdAt_DESC'
        }
      }).then(result => {
        AssetsLoader.loadAssetsArray(result.data.allAvatars, 'image')
      })
    },
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
    this.getAllAvatars()
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
      transition: transform .5s, opacity .3s .5s;
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
      transition: opacity .5s .3s ease;
      z-index: 10;
      opacity: 0;
      pointer-events: none;

      &.is-active {
        opacity: 1;
      }

    }
  }

  //Transitions
  .is-intro-active {
    .home__description,
    .home__actions,
    .home__about {
      opacity: 0;
    }

    .home__avatars {
      transform: translateY(100%);
    }

    .home__logo {
      transform: translate(-2%, 98%) scale(1.26);
      opacity: 0;

      .home__logo__baseline {
        opacity: 0;
        transition: opacity .3s;
      }
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
