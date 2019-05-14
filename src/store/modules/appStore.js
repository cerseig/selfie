// initial state
const state = {
  currentStep: {}
}

// getters
const getters = {
  getCurrentStep (state) {
    return state.currentStep
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setCurrentStep (state, currentStep) {
    state.currentStep = currentStep
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
