import { ComponentStory, ComponentMeta } from '@storybook/react'
import PinnedLabel from '.'

export default {
  title: 'Components/DisplayedNotes/NoteContent/PinnedLabel',
  component: PinnedLabel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PinnedLabel>

const Template: ComponentStory<typeof PinnedLabel> = (args) => (
  <PinnedLabel {...args} />
)

export const Pinned = Template.bind({})
Pinned.args = {
  pinnedStatus: 'Pinned',
}

export const Others = Template.bind({})
Others.args = {
  pinnedStatus: 'Others',
}
