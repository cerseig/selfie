// initial state
const state = {
  step: {}
}

// getters
const getters = {
  getStep (state) {
    return state.step
  }
}
// mutations
const mutations = {
  setStep (state, step) {
    state.step = step
  }
}

export default {
  state,
  getters,
  mutations
}
