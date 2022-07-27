import { noteFormStyles } from '../Logic/LogicHelpers'

test('noteFormStyles', () => {
  expect(noteFormStyles(true, true)).toStrictEqual({
    backgroundColor: '#202123',
    width: '100%',
  })
  expect(noteFormStyles(false, true)).toStrictEqual({
    backgroundColor: '#202123',
    border: '1px solid #525355',
    borderRadius: '10px',
    width: '100%',
  })
  expect(noteFormStyles(false, false)).toStrictEqual({ width: '100%' })
})
