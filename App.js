import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (note) => {
    if (note.id) {
      setNotes(notes.map(n => (n.id === note.id ? note : n)));
    } else {
      note.id = Date.now();
      note.timestamp = new Date().toLocaleString();
      setNotes([...notes, note]);
    }
    setCurrentNote(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="app">
      <h1>Simple Note Taking App</h1>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <NoteList
        notes={currentNotes}
        onDelete={handleDeleteNote}
        onEdit={handleEditNote}
      />
      <Pagination
        notesPerPage={notesPerPage}
        totalNotes={filteredNotes.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
      <button onClick={() => setCurrentNote({})}>Add Note</button>
      {currentNote && (
        <NoteForm
          currentNote={currentNote}
          onSave={handleSaveNote}
          onCancel={() => setCurrentNote(null)}
        />
      )}
    </div>
  );
};

export default App;