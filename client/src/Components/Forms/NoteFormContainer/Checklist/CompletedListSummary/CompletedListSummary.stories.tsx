import { ComponentStory, ComponentMeta } from '@storybook/react'
import CompletedListSummary from '.'
import { mockNotes } from '../../../../../DataHelpers'

export default {
  title: 'Components/Forms/NoteFormContainer/Checklist/CompletedListSummary',
  component: CompletedListSummary,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CompletedListSummary>

const Template: ComponentStory<typeof CompletedListSummary> = (args) => (
  <CompletedListSummary {...args} />
)

export const Default = Template.bind({})
Default.args = {
  note: mockNotes[1],
}
