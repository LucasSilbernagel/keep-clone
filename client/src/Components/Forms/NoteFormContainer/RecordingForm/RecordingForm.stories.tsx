import { ComponentStory, ComponentMeta } from '@storybook/react'
import RecordingForm from '.'
import { RecoilRoot } from 'recoil'
import { atomEditingID, atomNoteBeingEdited } from '../../../../atoms'
import { mockNotes } from '../../../../DataHelpers'

export default {
  title: 'Components/Forms/NoteFormContainer/RecordingForm',
  component: RecordingForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RecordingForm>

const Template: ComponentStory<typeof RecordingForm> = (args) => (
  <RecordingForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  handleNoteTitleChange: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomNoteBeingEdited, mockNotes[3])
        snap.set(atomEditingID, mockNotes[3]._id)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
