import { ComponentStory, ComponentMeta } from '@storybook/react'
import ImageForm from '.'
import { RecoilRoot } from 'recoil'
import { atomEditingID, atomNoteBeingEdited } from '../../../../atoms'
import { mockNotes } from '../../../../DataHelpers'

export default {
  title: 'Components/Forms/NoteFormContainer/ImageForm',
  component: ImageForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ImageForm>

const Template: ComponentStory<typeof ImageForm> = (args) => (
  <ImageForm {...args} />
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
        snap.set(atomNoteBeingEdited, mockNotes[4])
        snap.set(atomEditingID, mockNotes[4]._id)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
