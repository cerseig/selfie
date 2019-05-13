// initial state
const state = {
  sound: {},
  currentSprites: []
}

// getters
const getters = {
  getSound (state) {
    return state.sound
  },
  getCurrentSprites (state) {
    return state.currentSprites
  }
}
// mutations
const mutations = {
  setSound (state, sound) {
    state.sound = sound
  },
  setCurrentSprites (state, currentSprites) {
    state.currentSprites = currentSprites
  }
}

export default {
  state,
  getters,
  mutations
}
