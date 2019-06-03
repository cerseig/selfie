// initial state
const state = {
  step: -1
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
