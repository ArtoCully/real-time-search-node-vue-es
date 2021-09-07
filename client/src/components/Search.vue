<template>
  <div class="search container px-3">
    <h1 class="text-3xl font-semibold mt-3 mb-5">Search cities around the world</h1>
    <search-form
      :modelValue="query"
      @update:modelValue="captureSearchQuery"
    ></search-form>
    <div v-if="loading">Loading...</div> <!-- TODO: create loading component -->
    <div v-if="error">{{ error.message }}</div> <!-- TODO: create an error alert component -->
    <search-list :results="results"></search-list>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

export default {
  name: 'Search',
  components: {
    SearchForm,
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
    captureSearchQuery(query) {
      this.query = query;
      this.search(query);
    },
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
