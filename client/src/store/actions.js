import axios from 'axios';
import types from './mutation-types';

export default {
  searchCities({ commit }, searchQuery) {
    commit(types.ERROR_OFF);
    commit(types.LOADING_ON);
    if(searchQuery) {
      axios
        .get("http://127.0.0.1:3001/v1/search?q=" + searchQuery)
        .then(response => {
            console.log('Success searchCities', response);

            if (response.data.data.values) {
              commit(types.LOAD_SEARCH_CITIES_RESULT, response.data.data.values);
            }
        })
        .catch(err => {
          commit(types.ERROR_ON, { message: err.message });
        })
        .finally(() => {
          commit(types.LOADING_OFF);
        })
    } else {
      commit(types.ERROR_OFF);
      commit(types.LOADING_OFF);
      commit(types.LOAD_SEARCH_CITIES_RESULT, []);
    }
  }
}
