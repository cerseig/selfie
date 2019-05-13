import Vue from 'vue'
import Vuex from 'vuex'
import avatar from './modules/avatar'
import userStore from './modules/userStore'
import translation from './modules/translation'
import appStore from './modules/appStore'
import voice from './modules/voice'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    avatar,
    userStore,
    translation,
    appStore,
    voice
  }
})
