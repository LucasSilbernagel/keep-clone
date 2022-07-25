import { ComponentStory, ComponentMeta } from '@storybook/react'
import MobileSearch from '.'
import { RecoilRoot } from 'recoil'

export default {
  title: 'Components/Menus/TopBar/Search/MobileSearch',
  component: MobileSearch,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MobileSearch>

const Template: ComponentStory<typeof MobileSearch> = (args) => (
  <RecoilRoot>
    <MobileSearch {...args} />
  </RecoilRoot>
)

export const Default = Template.bind({})
Default.args = {
  handleSearch: () => null,
  clearSearch: () => null,
}
