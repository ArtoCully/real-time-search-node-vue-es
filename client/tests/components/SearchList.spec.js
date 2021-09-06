import { shallowMount } from '@vue/test-utils'
import SearchList from '@/components/SearchList.vue'

describe('SearchList.vue', () => {
  it('should have correct component name', () => {
    const wrapper = shallowMount(SearchList, {
      props: { results: [] }
    })

    expect(wrapper.vm.$options.name).toMatch('SearchList');
  });

  it('should return correct results', () => {
    const results = [
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

    const wrapper = shallowMount(SearchList, {
      props: { results }
    });

    expect(wrapper.vm.results).toEqual(results);
    expect(wrapper.findAll('.panel').length).toEqual(2);
    expect(wrapper.findAll('h3').length).toEqual(2);
  });
});
