import { ComponentStory, ComponentMeta } from '@storybook/react'
import Notes from '.'
import { mockNotes } from '../../../DataHelpers'
import { RecoilRoot } from 'recoil'
import {
  atomViewportWidth,
  atomFilteredNotes,
  atomIsGridView,
} from '../../../atoms'

export default {
  title: 'Components/DisplayedNotes/Notes',
  component: Notes,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Notes>

const Template: ComponentStory<typeof Notes> = (args) => <Notes {...args} />

export const Default = Template.bind({})
Default.args = {
  deleteNote: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomViewportWidth, 1440)
        snap.set(atomIsGridView, true)
        snap.set(atomFilteredNotes, mockNotes)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
