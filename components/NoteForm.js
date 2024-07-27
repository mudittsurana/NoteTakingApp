import React, { useState } from 'react';

const NoteForm = ({ currentNote, onSave, onCancel }) => {
  const [note, setNote] = useState(currentNote);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title || ''}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={note.content || ''}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NoteForm;