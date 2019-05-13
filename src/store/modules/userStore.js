import avatar from './avatar'
import images from './images'
import translation from './translation'

// initial state
const state = {
  translation: translation,
  avatar: avatar,
  images: images,
  background: 'yellow',
  temporaryTableId: ''
}

// getters
const getters = {
  getBackground (state) {
    return state.background
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
  setBackground (state, background) {
    state.background = background
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
