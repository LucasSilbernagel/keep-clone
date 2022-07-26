import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteContentFooter from '.'
import { mockNotes } from '../../../../DataHelpers'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../../atoms'

export default {
  title: 'Components/DisplayedNotes/NoteContent/NoteContentFooter',
  component: NoteContentFooter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteContentFooter>

const Template: ComponentStory<typeof NoteContentFooter> = (args) => (
  <NoteContentFooter {...args} />
)

export const MenuClosed = Template.bind({})
MenuClosed.args = {
  note: mockNotes[1],
  deleteNote: () => null,
  moreAnchorEl: null,
  setMoreAnchorEl: () => null,
  isMoreMenuOpen: false,
}
MenuClosed.decorators = [
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

export const MenuOpen = Template.bind({})
MenuOpen.args = {
  ...MenuClosed.args,
  isMoreMenuOpen: true,
}
MenuOpen.decorators = [
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
