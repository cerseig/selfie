// initial state
const state = {
  hairCut: '',
  hairColor: 'red',
  skinColor: '',
  eyeColor: '',
  facialHair: '',
  facialHairColor: '',
  glasses: '',
  glassesColor: ''
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
  },
  getFacialHair (state) {
    return state.facialHair
  },
  getFacialHairColor (state) {
    return state.facialHairColor
  },
  getGlasses (state) {
    return state.glasses
  },
  getGlassesColor (state) {
    return state.glassesColor
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
  },
  setFacialHair (state, facialHair) {
    state.facialHair = facialHair
  },
  setFacialHairColor (state, facialHairColor) {
    state.facialHairColor = facialHairColor
  },
  setGlasses (state, glasses) {
    state.glasses = glasses
  },
  setGlassesColor (state, glassesColor) {
    state.glassesColor = glassesColor
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
