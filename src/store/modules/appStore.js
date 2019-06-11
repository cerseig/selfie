// initial state
const state = {
  currentStep: {},
  gallery: []
}

// getters
const getters = {
  getCurrentStep (state) {
    return state.currentStep
  },
  getGallery (state) {
    return state.gallery
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setCurrentStep (state, currentStep) {
    state.currentStep = currentStep
  },
  setGallery (state, gallery) {
    state.gallery = gallery
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
