import types from './mutation-types';

export default {
  [types.FETCH_CITIES](state, payload) {
    // TODO: add functionality here
  },
  [types.LOADING_ON](state) {
    state.loading = true;
  },
  [types.LOADING_OFF](state) {
    state.loading = false;
  }
}
