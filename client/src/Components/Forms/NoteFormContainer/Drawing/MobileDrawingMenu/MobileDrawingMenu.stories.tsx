import { ComponentStory, ComponentMeta } from '@storybook/react'
import MobileDrawingMenu from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../../../atoms'

export default {
  title: 'Components/Forms/NoteFormContainer/Drawing/MobileDrawingMenu',
  component: MobileDrawingMenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MobileDrawingMenu>

const Template: ComponentStory<typeof MobileDrawingMenu> = (args) => (
  <MobileDrawingMenu {...args} />
)

export const Default = Template.bind({})
Default.args = {
  selectedColor: { label: 'Black', color: '#000000' },
  setSelectedColor: () => null,
  selectedStroke: 5,
  setSelectedStroke: () => null,
  clearCanvas: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomViewportWidth, 440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
