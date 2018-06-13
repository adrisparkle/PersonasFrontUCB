import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth'
import crudModule from './modules/crud'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    crud: crudModule
  }
})
