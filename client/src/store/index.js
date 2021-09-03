import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import state from './state';
import getters from './getters';

export default createStore({
  actions,
  mutations,
  state,
  getters,
});
