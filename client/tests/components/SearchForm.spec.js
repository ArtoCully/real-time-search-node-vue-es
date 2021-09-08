import { shallowMount, mount } from '@vue/test-utils'
import SearchForm from '@/components/SearchForm.vue'

describe('SearchForm.vue', () => {
  it('should have correct component name', () => {
    const wrapper = shallowMount(SearchForm, {
      props: { value: '' }
    })

    expect(wrapper.vm.$options.name).toMatch('SearchForm');
  });

  it('should emit an event when search input field changes', () => {
    const wrapper = mount(SearchForm);
    const input = wrapper.find('input[type="text"]');
    const inputValue = 'Brazil';
    input.setValue(inputValue);
    const inputChangeCalled = wrapper.emitted('update:modelValue');

    expect(inputChangeCalled).toHaveLength(1);
    expect(inputChangeCalled[0][0]).toEqual(inputValue);
  });
});
