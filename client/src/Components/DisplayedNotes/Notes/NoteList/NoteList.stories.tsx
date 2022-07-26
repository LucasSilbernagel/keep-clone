import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteList from '.'
import { mockNotes } from '../../../../DataHelpers'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../../atoms'

export default {
  title: 'Components/DisplayedNotes/Notes/NoteList',
  component: NoteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteList>

const Template: ComponentStory<typeof NoteList> = (args) => (
  <NoteList {...args} />
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
