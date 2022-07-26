import { ComponentStory, ComponentMeta } from '@storybook/react'
import DrawingTools from '.'
import { RecoilRoot } from 'recoil'

export default {
  title: 'Components/Forms/NoteFormContainer/Drawing/DrawingTools',
  component: DrawingTools,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DrawingTools>

const Template: ComponentStory<typeof DrawingTools> = (args) => (
  <RecoilRoot>
    <DrawingTools {...args} />
  </RecoilRoot>
)

export const Default = Template.bind({})
Default.args = {
  selectedColor: { label: 'Black', color: '#000000' },
  setSelectedColor: () => null,
  selectedStroke: 5,
  setSelectedStroke: () => null,
  clearCanvas: () => null,
}
