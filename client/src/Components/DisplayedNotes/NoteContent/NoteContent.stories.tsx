import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteContent from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../DataHelpers'
import {
  atomIsGridView,
  atomIsDarkTheme,
  atomSelectedNoteIds,
  atomViewportWidth,
} from '../../../atoms'

export default {
  title: 'Components/DisplayedNotes/NoteContent',
  component: NoteContent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteContent>

const Template: ComponentStory<typeof NoteContent> = (args) => (
  <NoteContent {...args} />
)

export const TextNote = Template.bind({})
TextNote.args = {
  note: mockNotes[0],
  deleteNote: () => null,
}
TextNote.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsGridView, true)
        snap.set(atomIsDarkTheme, false)
        snap.set(atomSelectedNoteIds, [])
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const TextNoteListView = Template.bind({})
TextNoteListView.args = {
  ...TextNote.args,
}
TextNoteListView.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsGridView, false)
        snap.set(atomIsDarkTheme, false)
        snap.set(atomSelectedNoteIds, [])
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const TextNoteSelected = Template.bind({})
TextNoteSelected.args = {
  ...TextNote.args,
}
TextNoteSelected.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsGridView, true)
        snap.set(atomIsDarkTheme, false)
        snap.set(atomSelectedNoteIds, [mockNotes[0]._id])
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const TextNoteMobile = Template.bind({})
TextNoteMobile.args = {
  ...TextNote.args,
}
TextNoteMobile.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsGridView, true)
        snap.set(atomIsDarkTheme, false)
        snap.set(atomSelectedNoteIds, [])
        snap.set(atomViewportWidth, 440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const Checklist = Template.bind({})
Checklist.args = {
  ...TextNote.args,
  note: mockNotes[1],
}
Checklist.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsGridView, true)
        snap.set(atomIsDarkTheme, false)
        snap.set(atomSelectedNoteIds, [])
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const Drawing = Template.bind({})
Drawing.args = {
  ...TextNote.args,
  note: mockNotes[2],
}
Drawing.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsGridView, true)
        snap.set(atomIsDarkTheme, false)
        snap.set(atomSelectedNoteIds, [])
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const Recording = Template.bind({})
Recording.args = {
  ...TextNote.args,
  note: mockNotes[3],
}
Recording.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsGridView, true)
        snap.set(atomIsDarkTheme, false)
        snap.set(atomSelectedNoteIds, [])
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const Image = Template.bind({})
Image.args = {
  ...TextNote.args,
  note: mockNotes[4],
}
Image.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsGridView, true)
        snap.set(atomIsDarkTheme, false)
        snap.set(atomSelectedNoteIds, [])
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
