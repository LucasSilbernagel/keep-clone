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

/** Boolean to determine whether the search form is being used */
export const atomIsSearching = atom<boolean>({
  key: 'atomIsSearching',
  default: false,
})

/** The text that is typed into the search bar */
export const atomSearchValue = atom<string>({
  key: 'atomSearchValue',
  default: '',
})

/** Boolean to determine whether notes are loading from the back end */
export const atomIsLoading = atom<boolean>({
  key: 'atomIsLoading',
  default: false,
})
