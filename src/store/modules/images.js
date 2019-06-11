// initial state
const state = {
  avatarPath: '',
  avatarBase64Path: '',
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
  getAvatarBase64Path (state) {
    return state.avatarBase64Path
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
  setAvatarBase64Path (state, avatarBase64Path) {
    state.avatarBase64Path = avatarBase64Path
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
