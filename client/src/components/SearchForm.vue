<template>
  <form action="" class="search__form">
    <div class="mb-5">
        <label for="search__form-input" class="sr-only">Search</label>
        <input
          type="text"
          class="w-96 drop-shadow-md"
          name="search__form-input"
          id="search__form-input"
          placeholder="Start typing"
          @input="onInput">
        <span class="glyphicon glyphicon-search form-control-feedback"></span>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  emits: ['update:modelValue'],
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>
