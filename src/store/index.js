import Vue from 'vue'
import Vuex from 'vuex'
import avatar from './modules/avatar'
import images from './modules/images'
import userStore from './modules/userStore'
import translation from './modules/translation'
import appStore from './modules/appStore'
import voice from './modules/voice'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    avatar,
    images,
    userStore,
    translation,
    appStore,
    voice
  }
})
