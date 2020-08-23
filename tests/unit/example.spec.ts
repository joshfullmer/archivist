import { shallowMount } from '@vue/test-utils'
import BookCard from '@/components/BookCard.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(BookCard, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
