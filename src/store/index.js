import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curAvatarId: null
  },
  mutations: {
    SET_CUR_AVATAR_ID(state, id) {
      state.curAvatarId = id
    }
  },
  actions: {},
  modules: {}
})
