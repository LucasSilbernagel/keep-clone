import { atom } from 'recoil'
import { ENote } from './Enums'
import { INewNote } from './Interfaces'

/** The width of the viewport/window, in pixels */
export const atomViewportWidth = atom<number>({
  key: 'atomViewportWidth',
  default: 0,
})

/** A new note */
export const atomNewNote = atom<INewNote>({
  key: 'atomNewNote',
  default: ENote,
})

/** Boolean to determine whether the note modal is open */
export const atomIsModalOpen = atom<boolean>({
  key: 'atomIsModalOpen',
  default: false,
})
