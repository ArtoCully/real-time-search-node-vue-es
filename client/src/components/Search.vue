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
      <div class="max-w-lg m-auto" v-for="(result, index) in results" :key="index">
        <div class="panel panel-default border-b p-1">
            <h3 class="panel-heading text-lg mt-0 mb-2">
              <!-- display the city name and country  -->
              {{ result.name }}, {{ result.country }}
            </h3>
            <div class="panel-body">
              <!-- display the latitude and longitude of the city  -->
              <p>lat:{{ result.lat }}, long: {{ result.lng }}.</p>
            </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Search',
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
