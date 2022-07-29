import { ComponentStory, ComponentMeta } from '@storybook/react'
import DesktopAppBar from '.'
import { RecoilRoot } from 'recoil'

export default {
  title: 'Components/Menus/TopBar/DesktopAppBar',
  component: DesktopAppBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DesktopAppBar>

const Template: ComponentStory<typeof DesktopAppBar> = (args) => (
  <DesktopAppBar {...args} />
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
