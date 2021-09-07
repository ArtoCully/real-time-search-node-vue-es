<template>
  <div class="search container px-3">
    <h1 class="text-3xl font-semibold mt-3 mb-5">Search cities around the world</h1>
    <form action="" class="search__form">
      <div class="mb-5">
          <label for="search__form-input" class="sr-only">Search</label>
          <input type="text" class="w-96 drop-shadow-md" name="search__form-input" id="search__form-input" placeholder="Start typing" v-model="query" >
          <span class="glyphicon glyphicon-search form-control-feedback"></span>
      </div>
      <div v-if="loading">Loading...</div> <!-- TODO: create loading component -->
      <div v-if="error">{{ error.message }}</div> <!-- TODO: create an error alert component -->
    </form>
    <search-list :results="results"></search-list>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SearchList from './SearchList';

export default {
  name: 'Search',
  components: {
    SearchList,
  },
  data() {
    return {
      query: '',
    }
  },
  methods: {
    ...mapActions({
      search: 'searchCities',
    }),
  },
  watch: {
    query: function(value) {
      console.log('value', value);
      this.search(value);
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      results: state => state.cities,
      error: state => state.error,
    })
  }
}
</script>
