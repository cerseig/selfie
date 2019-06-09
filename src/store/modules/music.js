// initial state
const state = {
  music: {},
  isMusic: false
}

// getters
const getters = {
  getMusic (state) {
    return state.music
  },
  getIsMusic (state) {
    return state.isMusic
  }
}
// mutations
const mutations = {
  setMusic (state, music) {
    state.music = music
  },
  setIsMusic (state, isMusic) {
    state.isMusic = isMusic
  }
}

export default {
  state,
  getters,
  mutations
}
