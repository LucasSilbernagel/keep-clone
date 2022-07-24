import { ComponentStory, ComponentMeta } from '@storybook/react'
import DrawingForm from '.'
import { mockNotes } from '../../../../../DataHelpers'
import { RecoilRoot } from 'recoil'
import { atomEditingID, atomNoteBeingEdited } from '../../../../../atoms'

export default {
  title: 'Components/Forms/NoteFormContainer/Drawing/DrawingForm',
  component: DrawingForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DrawingForm>

const Template: ComponentStory<typeof DrawingForm> = (args) => (
  <DrawingForm {...args} />
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
        snap.set(atomNoteBeingEdited, mockNotes[2])
        snap.set(atomEditingID, mockNotes[2]._id)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
