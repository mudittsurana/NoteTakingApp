import React from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note-item">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <small>{note.timestamp}</small>
      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteItem;