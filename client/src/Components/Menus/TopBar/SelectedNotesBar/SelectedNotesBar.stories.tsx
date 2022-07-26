import { ComponentStory, ComponentMeta } from '@storybook/react'
import SelectedNotesBar from '.'
import { RecoilRoot } from 'recoil'
import { atomSelectedNoteIds } from '../../../../atoms'

export default {
  title: 'Components/Menus/TopBar/SelectedNotesBar',
  component: SelectedNotesBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SelectedNotesBar>

const Template: ComponentStory<typeof SelectedNotesBar> = (args) => (
  <SelectedNotesBar {...args} />
)

export const Default = Template.bind({})
Default.args = {
  editNotes: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomSelectedNoteIds, [1, 2])
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
