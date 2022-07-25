import { ComponentStory, ComponentMeta } from '@storybook/react'
import SettingsMenu from '.'
import { RecoilRoot } from 'recoil'

export default {
  title: 'Components/Menus/TopBar/SettingsMenu',
  component: SettingsMenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SettingsMenu>

const Template: ComponentStory<typeof SettingsMenu> = (args) => (
  <RecoilRoot>
    <SettingsMenu {...args} />
  </RecoilRoot>
)

export const Default = Template.bind({})
Default.args = {
  settingsAnchorEl: null,
  settingsMenuId: 'menu-id',
  isSettingsMenuOpen: true,
  handleSettingsMenuClose: () => null,
}
