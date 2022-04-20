import { atom } from 'recoil'

/** The width of the viewport/window, in pixels */
export const atomViewportWidth = atom<number>({
  key: 'atomViewportWidth',
  default: 0,
})
