<template>
  <div class="home">
    <div class="home__container">
      <img class="home__logo" :src="require(`@/assets/img/logo.png`)">
      <h1 class="home__baseline">{{ $t('home.baseline') }}</h1>
      <div class="home__select">
        <span class="select__arrow" @click="onChangeLang"> < </span>
        <ul class="select__languages">
          <li v-for="(lang, index) in availableLanguages"
              :class="`select__language ${index === 0 ? 'is-selected' : ''}`"
              :key="`lang-${lang.ident}`"
              :data-value="lang.ident">
            {{lang.lang}}
          </li>
        </ul>
        <span class="select__arrow" @click="onChangeLang"> > </span>
      </div>
      <router-link class="home__start" :to="{ name: 'intro' }"><button class="home__start--button">{{ $t('home.start') }}</button></router-link>
      <button class="home__about home__about--button" @click="openAboutPopUp">{{ $t('home.about') }}</button>
    </div>
  </div>
</template>

<script>
import store from '../store/index'

export default {
  name: 'home',
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
      ]
    }
  },
  methods: {
    onChangeLang () {
      let selectLanguage = document.querySelector('.is-selected').nextSibling
      if (selectLanguage !== null) {
        store.commit('setLang', selectLanguage.getAttribute('data-value'))
      } else {
        selectLanguage = document.querySelector('.is-selected').previousSibling
        store.commit('setLang', selectLanguage.getAttribute('data-value'))
      }
      document.querySelector('.is-selected').classList.remove('is-selected')
      selectLanguage.classList.add('is-selected')
    },
    openAboutPopUp () {
      console.log('About pop-up is open.')
    }
  },
  computed: {
    lang: () => store.getters.getLang
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
      margin: 1.25rem 0;

      text-transform: uppercase;
      font-weight: 300;
      font-size: 1.25rem;
    }
    &__select {
      margin: 3.125rem auto;
      @include flexCenter();
      .select {
        &__languages {
          width: 150px;

          position: relative;
          @include flexCenter();
        }
        &__language {
          position: absolute;

          opacity: 0;
          z-index: 0;

          font-size: 1.25rem;
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
        @include containedButton(0.9375rem 5rem, 1.25rem);
      }
    }
    &__about {
      position: absolute;
      bottom: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
      &--button {
        @include textButton(0.875rem);
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
        font-size: 1.625rem;
      }
      &__select {
        margin: 6.25rem auto;
        .select {
          &__languages {
            width: 200px;
          }
          &__language {
            font-size: 1.5625rem;
          }
        }
      }
      &__start {
        &--button {
          @include containedButton(1.5625rem 8.125rem, 1.75rem);
        }
      }
      &__about {
        bottom: 3.125rem;
        &--button {
          @include textButton(1.25rem);
        }
      }
    }
  }
</style>
