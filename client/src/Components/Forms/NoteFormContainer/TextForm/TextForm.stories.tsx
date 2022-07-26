import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextForm from '.'
import { RecoilRoot } from 'recoil'
import {
  atomEditingID,
  atomNoteBeingEdited,
  atomViewportWidth,
} from '../../../../atoms'
import { mockNotes } from '../../../../DataHelpers'

export default {
  title: 'Components/Forms/NoteFormContainer/TextForm',
  component: TextForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextForm>

const Template: ComponentStory<typeof TextForm> = (args) => (
  <TextForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  handleNoteTitleChange: () => null,
  handleNoteTextChange: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomNoteBeingEdited, mockNotes[0])
        snap.set(atomEditingID, mockNotes[0]._id)
        snap.set(atomViewportWidth, 440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
