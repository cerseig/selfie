import avatar from './avatar'
import images from './images'
import translation from './translation'

// initial state
const state = {
  translation: translation,
  avatar: avatar,
  images: images,
  decor: 'yellow',
  temporaryTableId: ''
}

// getters
const getters = {
  getDecor (state) {
    return state.decor
  },
  getTemporaryTableId (state) {
    return state.temporaryTableId
  },
  getAvatar (state) {
    return state.avatar
  },
  getImages (state) {
    return state.images
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setDecor (state, decor) {
    state.decor = decor
  },
  setTemporaryTableId (state, temporaryTableId) {
    state.temporaryTableId = temporaryTableId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
