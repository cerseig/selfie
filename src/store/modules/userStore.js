import avatar from './avatar'
import translation from './translation'

// initial state
const state = {
  translation: translation,
  avatar: avatar,
  background: ''
}

// getters
const getters = {
  getBackground (state) {
    return state.background
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setBackground (state, background) {
    state.background = background
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
