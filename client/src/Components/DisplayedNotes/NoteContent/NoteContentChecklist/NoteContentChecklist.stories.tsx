import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteContentChecklist from '.'
import { mockNotes } from '../../../../DataHelpers'

export default {
  title: 'Components/DisplayedNotes/NoteContent/NoteContentChecklist',
  component: NoteContentChecklist,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteContentChecklist>

const Template: ComponentStory<typeof NoteContentChecklist> = (args) => (
  <NoteContentChecklist {...args} />
)

export const Default = Template.bind({})
Default.args = {
  note: mockNotes[1],
}
