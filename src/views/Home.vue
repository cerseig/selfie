<template>
  <div class="home">
    <label><h1>{{ $t('home.select') }}</h1></label>
    <select v-model="$i18n.locale">
      <option v-for="lang in availableLanguages" :key="`lang-${lang.ident}`" :value="lang.ident">{{lang.lang}}</option>
    </select>
    <br>
    <button>{{ $t('home.start') }}</button>
  </div>
</template>

<script>
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
  }
}
</script>
