// initial state
const state = {
  avatarPath: '',
  picturePath: '',
  isPictureSavedInDB: false,
  isAvatarSavedInDB: false
}

// getters
const getters = {
  getAvatarPath (state) {
    return state.avatarPath
  },
  getPicturePath (state) {
    return state.picturePath
  },
  getIsPictureSavedInDB (state) {
    return state.isPictureSavedInDB
  },
  getIsAvatarSavedInDB (state) {
    return state.isAvatarSavedInDB
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setAvatarPath (state, avatarPath) {
    state.avatarPath = avatarPath
  },
  setPicturePath (state, picturePath) {
    state.picturePath = picturePath
  },
  setIsPictureSavedInDB (state, isPictureSavedInDB) {
    state.isPictureSavedInDB = isPictureSavedInDB
  },
  setIsAvatarSavedInDB (state, isAvatarSavedInDB) {
    state.isAvatarSavedInDB = isAvatarSavedInDB
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
