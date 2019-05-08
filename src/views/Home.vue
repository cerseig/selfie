<template>
  <div class="home">
    <div class="home__container">
      <img class="home__logo" :src="require(`@/assets/img/logo.png`)">
      <h1 class="home__baseline">{{ $t('home.baseline') }}</h1>
      <div class="home__select">
        <span class="select__arrow" @click="onChangeLang"><</span>
        <ul class="select__languages">
          <li v-for="(lang, index) in availableLanguages"
              :class="`select__language ${index === 0 ? 'is-selected' : ''}`"
              :key="`lang-${lang.ident}`"
              :data-value="lang.ident">
            {{lang.lang}}
          </li>
        </ul>
        <span class="select__arrow" @click="onChangeLang">></span>
      </div>
      <!--<select class="home__select" v-model="$i18n.locale" @change="onChangeLang">
        <option v-for="lang in availableLanguages" :key="`lang-${lang.ident}`" :value="lang.ident">{{lang.lang}}</option>
      </select>-->
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
      store.commit('setLang', this.$i18n.locale)
      console.log(this.lang)
    },
    openAboutPopUp () {
      console.log("about pop up is open")
    }
  },
  computed: {
    lang: () => store.getters.getLang,
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
      width: 200px;
    }
    &__baseline {
      text-transform: uppercase;
      font-weight: 300;
      font-size: toRem(26px);
      margin: toRem(20px) 0;
    }
    &__select {
      display: block;
      margin: toRem(50px) auto;
      .select {
        &__arrow {

        }
        &__languages {

        }
        &__language {
          opacity: 0;
          z-index: 0;
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
        @include containedButton();
      }
    }
    &__about {
      position: absolute;
      bottom: toRem(50px);
      left: 50%;
      transform: translateX(-50%);
      &--button {
        @include textButton();
      }
    }
  }

</style>
