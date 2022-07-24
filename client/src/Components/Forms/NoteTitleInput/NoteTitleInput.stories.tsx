import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteTitleInput from '.'
import { RecoilRoot } from 'recoil'
import { atomEditingID, atomNoteBeingEdited } from '../../../atoms'
import { mockNotes } from '../../../DataHelpers'

export default {
  title: 'Components/Forms/NoteTitleInput',
  component: NoteTitleInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteTitleInput>

const Template: ComponentStory<typeof NoteTitleInput> = (args) => (
  <NoteTitleInput {...args} />
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
        snap.set(atomNoteBeingEdited, mockNotes[0])
        snap.set(atomEditingID, mockNotes[0]._id)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
