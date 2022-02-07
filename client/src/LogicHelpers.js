/** Disables the buttons of notes that are not being edited
 * @param {Array} notesArray - Array of notes
 * @param {Object} nonEditedNote - A note that is not being edited
 * @param {String} editingID - The ID of the note that is being edited
 * @returns {Bool} - Whether or not the buttons of a particular note should be disabled
 */
export const disableNonEditingButtons = (
  notesArray,
  nonEditedNote,
  editingID
) => {
  return (
    notesArray.find((note) => note._id === editingID) &&
    nonEditedNote._id !== editingID
  )
}
