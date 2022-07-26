import { ComponentStory, ComponentMeta } from '@storybook/react'
import DrawingMenu from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../../../atoms'

export default {
  title: 'Components/Forms/NoteFormContainer/Drawing/DrawingMenu',
  component: DrawingMenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DrawingMenu>

const Template: ComponentStory<typeof DrawingMenu> = (args) => (
  <DrawingMenu {...args} />
)

export const Default = Template.bind({})
Default.args = {
  selectedColor: { label: 'Black', color: '#000000' },
  setSelectedColor: () => null,
  selectedStroke: 5,
  setSelectedStroke: () => null,
  handleBackClick: () => null,
  clearCanvas: () => null,
  undo: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
