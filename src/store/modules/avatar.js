// initial state
const state = {
  hairCut: 'longhair',
  hairColor: 'brown',
  skinColor: 'white',
  eyeColor: 'brown'
}

// getters
const getters = {
  getHairCut (state) {
    return state.hairCut
  },
  getHairColor (state) {
    return state.hairColor
  },
  getSkinColor (state) {
    return state.skinColor
  },
  getEyeColor (state) {
    return state.eyeColor
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setHairCut (state, hairCut) {
    state.hairCut = hairCut
  },
  setHairColor (state, hairColor) {
    state.hairColor = hairColor
  },
  setSkinColor (state, skinColor) {
    state.skinColor = skinColor
  },
  setEyeColor (state, eyeColor) {
    state.eyeColor = eyeColor
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
