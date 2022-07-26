import { ComponentStory, ComponentMeta } from '@storybook/react'
import DesktopSearch from '.'
import { RecoilRoot } from 'recoil'

export default {
  title: 'Components/Menus/TopBar/Search/DesktopSearch',
  component: DesktopSearch,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DesktopSearch>

const Template: ComponentStory<typeof DesktopSearch> = (args) => (
  <RecoilRoot>
    <DesktopSearch {...args} />
  </RecoilRoot>
)

export const Default = Template.bind({})
Default.args = {
  handleSearch: () => null,
  clearSearch: () => null,
}
