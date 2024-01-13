import React, { Component } from 'react';
import { getInitialData } from '../utils/index';
import NoteList from './NoteList';
import NoteInput from './NoteInput';
import ArchivedNotes from './ArchivedNotes';
import { v4 as uuidv4 } from 'uuid';

class NoteApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      archivedNotes: [],
    };
  }

  onDeleteHandler = (id) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes: updatedNotes });
  };

  onAddNoteHandler = ({ title, body }) => {
    const newNote = {
      id: uuidv4(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  };

  onArchiveHandler = (id) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== id);
    const archivedNote = this.state.notes.find((note) => note.id === id);

    const updatedArchivedNote = { ...archivedNote, archived: true };


    this.setState((prevState) => ({
      notes: updatedNotes,
      archivedNotes: [...prevState.archivedNotes, updatedArchivedNote],
    }));
  };

  onDeleteArchivedHandler = (id) => {
    const updatedArchivedNotes = this.state.archivedNotes.filter(
      (note) => note.id !== id
    );
    this.setState({ archivedNotes: updatedArchivedNotes });
  };

  onRevertArchivedHandler = (id) => {
    const updatedArchivedNotes = this.state.archivedNotes.filter(
      (note) => note.id !== id
    );
    const revertedNote = this.state.archivedNotes.find((note) => note.id === id);

    this.setState((prevState) => ({
      archivedNotes: updatedArchivedNotes,
      notes: [...prevState.notes, { ...revertedNote, archived: false }],
    }));
  };

  render() {
    const { notes, archivedNotes } = this.state;

    return (
      <div className="note-app">
        <div className="note-app__header">
          <h1>Note App</h1>
        </div>
        <div className="note-app__body">
          <h2>Add Note</h2>
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Note List</h2>
          <NoteList
            notes={notes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
          <h2>Archived Notes</h2>
          <ArchivedNotes
            archivedNotes={archivedNotes}
            onDeleteArchived={this.onDeleteArchivedHandler}
            onRevertArchived={this.onRevertArchivedHandler}
          />
        </div>
      </div>
    );
  }
}

export default NoteApp;
