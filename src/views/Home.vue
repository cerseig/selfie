<template>
  <div class="home">
    <label><h1>{{ $t('home.select') }}</h1></label>
    <select v-model="$i18n.locale" @change="onChangeLang">
      <option v-for="lang in availableLanguages" :key="`lang-${lang.ident}`" :value="lang.ident">{{lang.lang}}</option>
    </select>
    <br>
    <router-link :to="{ name: 'intro' }"><button>{{ $t('home.start') }}</button></router-link>
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
    }
  },
  computed: {
    hairCut: () => store.getters.getHairCut,
    lang: () => store.getters.getLang
  }
}
</script>
