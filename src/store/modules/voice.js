// initial state
const state = {
  sound: {},
  isVoice: false
}

// getters
const getters = {
  getSound (state) {
    return state.sound
  },
  getIsVoice (state) {
    return state.isVoice
  }
}
// mutations
const mutations = {
  setSound (state, sound) {
    state.sound = sound
  },
  setIsVoice (state, isVoice) {
    state.isVoice = isVoice
  }
}

export default {
  state,
  getters,
  mutations
}
