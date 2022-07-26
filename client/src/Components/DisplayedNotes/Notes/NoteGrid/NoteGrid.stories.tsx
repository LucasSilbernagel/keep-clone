import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteGrid from '.'
import { mockNotes } from '../../../../DataHelpers'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../../atoms'

export default {
  title: 'Components/DisplayedNotes/Notes/NoteGrid',
  component: NoteGrid,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteGrid>

const Template: ComponentStory<typeof NoteGrid> = (args) => (
  <NoteGrid {...args} />
)

export const Default = Template.bind({})
Default.args = {
  notes: mockNotes,
  deleteNote: () => null,
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
