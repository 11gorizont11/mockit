
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import * as mutations from './mutations';
import * as getters from './getters';
import * as actions from './actions';
import state from './state';

Vue.use(Vuex);

export default new Store({
  state,
  getters,
  actions,
  mutations,
});