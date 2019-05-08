// initial state
const state = {
  lang: 'fr'
}

// getters
const getters = {
  getLang (state, getters) {
    return state.lang
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setLang (state, lang) {
    state.lang = lang
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
