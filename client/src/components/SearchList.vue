<template>
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
</template>

<script>
export default {
  name: 'SearchList',
  props: {
    results: {
      type: Array,
      requried: true,
    }
  }
}
</script>
