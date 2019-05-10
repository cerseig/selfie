import Vue from 'vue'
import Vuex from 'vuex'
import avatar from './modules/avatar'
import images from './modules/images'
import userStore from './modules/userStore'
import translation from './modules/translation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    avatar,
    images,
    userStore,
    translation
  }
})
