import { ComponentStory, ComponentMeta } from '@storybook/react'
import CompletedItems from '.'
import { mockNotes } from '../../../../../DataHelpers'
import { RecoilRoot } from 'recoil'
import { atomNoteList } from '../../../../../atoms'

export default {
  title: 'Components/Forms/NoteFormContainer/Checklist/CompletedItems',
  component: CompletedItems,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CompletedItems>

const Template: ComponentStory<typeof CompletedItems> = (args) => (
  <CompletedItems {...args} />
)

export const Default = Template.bind({})
Default.args = {
  handleListCheckboxChange: () => null,
  handleDeleteChecklistItem: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomNoteList, mockNotes[1].list)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
