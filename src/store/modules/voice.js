// initial state
const state = {
  sound: {},
  currentSprites: [],
  isPlaySprite: false
}

// getters
const getters = {
  getSound (state) {
    return state.sound
  },
  getCurrentSprites (state) {
    return state.currentSprites
  },
  getIsPlaySprite (state) {
    return state.isPlaySprite
  }
}
// mutations
const mutations = {
  setSound (state, sound) {
    state.sound = sound
  },
  setCurrentSprites (state, currentSprites) {
    state.currentSprites = currentSprites
  },
  setIsPlaySprite (state, isPlaySprite) {
    state.isPlaySprite = isPlaySprite
  }
}

export default {
  state,
  getters,
  mutations
}
