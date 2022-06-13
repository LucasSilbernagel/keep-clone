import { atom } from 'recoil'
import { BLANK_NEW_NOTE, BLANK_EXISTING_NOTE } from './Constants'
import { INewNote, NoteType, IListItem, IExistingNote } from './types'
import { nanoid } from 'nanoid'

/** The width of the viewport/window, in pixels */
export const atomViewportWidth = atom<number>({
  key: 'atomViewportWidth',
  default: 0,
})

/** A new note */
export const atomNewNote = atom<INewNote>({
  key: 'atomNewNote',
  default: BLANK_NEW_NOTE,
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

/** Boolean to determine whether notes are displayed in a grid */
export const atomIsGridView = atom<boolean>({
  key: 'atomIsGridView',
  default: true,
})

/** Boolean to determine whether the dark theme is being used */
export const atomIsDarkTheme = atom<boolean>({
  key: 'atomIsDarkTheme',
  default: false,
})

/** The type of note that is being created, edited, or displayed */
export const atomNoteType = atom<NoteType>({
  key: 'atomNoteType',
  default: 'text',
})

/** Array of checklist items for a note */
export const atomNoteList = atom<Array<IListItem>>({
  key: 'atomNoteList',
  default: [{ text: '', done: false, id: nanoid() }],
})

/** The note that is being edited */
export const atomNoteBeingEdited = atom<IExistingNote>({
  key: 'atomNoteBeingEdited',
  default: BLANK_EXISTING_NOTE,
})
