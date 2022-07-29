import { ComponentStory, ComponentMeta } from '@storybook/react'
import MobileAppBar from '.'
import { RecoilRoot } from 'recoil'

export default {
  title: 'Components/Menus/TopBar/MobileAppBar',
  component: MobileAppBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MobileAppBar>

const Template: ComponentStory<typeof MobileAppBar> = (args) => (
  <MobileAppBar {...args} />
)

export const Default = Template.bind({})
Default.args = {
  handleSearch: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
]
