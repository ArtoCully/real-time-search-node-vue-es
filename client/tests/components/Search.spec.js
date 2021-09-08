import { shallowMount, mount } from '@vue/test-utils'
import Search from '@/components/Search.vue'
import SearchList from '@/components/SearchList.vue';
import { createStore } from 'vuex';

describe('Search.vue', () => {
  let actions;
  let state;
  let store;

  beforeEach(() => {
    actions = {
      searchCities: jest.fn(),
    };

    state = {
      loading: false,
      cities: [],
      error: null,
    };

    store = createStore({
      actions,
      state,
    })
  });

  it('should have correct component name', () => {
    const wrapper = shallowMount(Search, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.vm.$options.name).toMatch('Search');
  });

  it('should show errors', () => {
    const errorMessage = 'This is an error';

    state = {
      ...state,
      error: {
        message: errorMessage,
      }
    }

    store = createStore({
      actions,
      state,
    });

    const wrapper = mount(Search, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('.search__error').text()).toEqual(errorMessage);
  });

  it('should show loading', () => {
    state = {
      ...state,
      loading: true,
    }

    store = createStore({
      actions,
      state,
    });

    const wrapper = mount(Search, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('.search__loading').exists()).toBe(true);
  });

  it('should display results', () => {
    const cities = [
      {
        name: 'NL',
        country: 'The Netherlands',
        lat: 123123123,
        lng: 123213123
      },
      {
        name: 'UK',
        country: 'United Kingdom',
        lat: 12342323123,
        lng: 12322342313123
      }
    ];

    state = {
      ...state,
      cities,
    }

    store = createStore({
      actions,
      state,
    });

    const wrapper = mount(Search, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.findComponent(SearchList).vm.results).toEqual(cities);
  });
});
