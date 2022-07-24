import { ComponentStory, ComponentMeta } from '@storybook/react'
import SelectButton from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../../DataHelpers'

export default {
  title: 'Components/DisplayedNotes/NoteContent/SelectButton',
  component: SelectButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SelectButton>

const Template: ComponentStory<typeof SelectButton> = (args) => (
  <RecoilRoot>
    <SelectButton {...args} />
  </RecoilRoot>
)

export const Default = Template.bind({})
Default.args = {
  defaultHidden: false,
  note: mockNotes[0],
}
