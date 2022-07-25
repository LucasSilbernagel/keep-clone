import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteModal from '.'
import { RecoilRoot } from 'recoil'
import { atomIsModalOpen, atomViewportWidth } from '../../atoms'

export default {
  title: 'Components/NoteModal',
  component: NoteModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteModal>

const Template: ComponentStory<typeof NoteModal> = (args) => (
  <NoteModal {...args} />
)

export const Desktop = Template.bind({})
Desktop.args = {
  deleteNote: () => null,
  saveNewNote: () => null,
  finishCreatingNote: () => null,
  creatingNote: false,
}
Desktop.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsModalOpen, true)
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const Mobile = Template.bind({})
Mobile.args = {
  ...Desktop.args,
}
Mobile.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsModalOpen, true)
        snap.set(atomViewportWidth, 440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
