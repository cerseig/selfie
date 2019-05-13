<template>
  <div class="home">
    <div class="home__container">
      <img class="home__logo" :src="require(`@/assets/img/logo.png`)">
      <h1 class="home__baseline">{{ $t('home.baseline') }}</h1>
      <div class="home__select">
        <span class="select__arrow" @click="onChangeLang">
          <Icon name="little-arrow" width="15" height="15" stroke="#000000" />
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
          <Icon name="little-arrow" width="15" height="15" stroke="#000000" />
        </span>
      </div>
      <router-link class="home__start" :to="{ name: 'intro' }"><button class="home__start--button">{{ $t('home.start') }}</button></router-link>
      <button class="home__about home__about--button" @click="openAboutPopUp">{{ $t('home.about') }}</button>
      <div :class="`home__popup ${isOpen === true ? 'home__popup--open' : ''}`">
        <button class="home__popup__close" @click="closePopUp">
          <Icon name="cross" width="50" height="50" stroke="#000000" />
        </button>
        <About />
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index'
import About from '@/components/About.vue'
import Icon from '@/components/icons/Icon.vue'
import sprite from '@/config/voiceSprite'

export default {
  name: 'home',
  components: {
    About,
    Icon
  },
  data () {
    return {
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
      isOpen: false
    }
  },
  methods: {
    updateBodyClass () {
      document.querySelector('body').className = ""
      document.querySelector('body').classList.add('default')
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
        sprite: sprite
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
  }
}
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    position: relative;
    @include flexCenter();

    &__logo {
      width: 100px;
    }

    &__baseline {
      margin: 2rem 0;

      text-transform: uppercase;
      font-weight: 300;
      font-size: 2rem;
    }

    &__select {
      margin: 5rem auto;
      @include flexCenter();

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
        @include containedButton(1.5rem 8rem, 2rem);
      }
    }

    &__about {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
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

        transform: rotate(45deg);
      }

      &--open {
        opacity: 1;
        z-index: 10;
      }

    }
  }

  /* ----- TABLET ----- */
  @media (min-width: 768px) and (max-width: 1024px)  {
    .home {

      &__logo {
        width: 200px;
      }

      &__baseline {
        font-size: 2.6rem;
      }

      &__select {
        margin: 10rem auto;

        .select {

          &__languages {
            width: 200px;
          }

          &__language {
            font-size: 2.5rem;
          }

        }

      }

      &__start {

        &--button {
          @include containedButton(2.5rem 13rem, 2.8rem);
        }

      }

      &__about {
        bottom: 5rem;

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
