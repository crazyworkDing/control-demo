import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

import list from "./modules/list";
import templateApi from "./modules/templateApi";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    list,
    templateApi

  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
