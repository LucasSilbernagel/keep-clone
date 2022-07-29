import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProfileMenu from '.'
import { RecoilRoot } from 'recoil'

export default {
  title: 'Components/Menus/TopBar/ProfileMenu',
  component: ProfileMenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileMenu>

const Template: ComponentStory<typeof ProfileMenu> = (args) => (
  <ProfileMenu {...args} />
)

export const Default = Template.bind({})
Default.args = {
  isProfileMenuOpen: true,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
]
