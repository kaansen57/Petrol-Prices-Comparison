import Vue from 'vue'
import Vuex from 'vuex'
import akaryakit from './modules/akaryakit';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    akaryakit
  }
})
