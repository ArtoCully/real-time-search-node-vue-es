import types from './mutation-types';

export default {
  [types.LOADING_ON](state) {
    state.loading = true;
  },
  [types.LOADING_OFF](state) {
    state.loading = false;
  },
  [types.ERROR_ON](state, payload = { message: 'Something went wrong try again'}) {
    state.error = payload;
  },
  [types.ERROR_OFF](state) {
    state.loading = null;
  },
  [types.LOAD_SEARCH_CITIES_RESULT](state, payload) {
    state.cities = payload
  }
}
