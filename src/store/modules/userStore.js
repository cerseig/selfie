import avatar from './avatar'
import translation from './translation'

// initial state
const state = {
  translation: translation,
  avatar: avatar,
  background: '',
  temporaryTableId: ''
}

// getters
const getters = {
  getBackground (state) {
    return state.background
  },
  getTemporaryTableId (state) {
    return state.temporaryTableId
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
