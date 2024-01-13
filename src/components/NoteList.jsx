import React from 'react';
import { showFormattedDate } from '../utils/index';

const NoteList = ({ notes, onDelete, onArchive }) => {
  return (
    <div className="notes-list">
      {notes.length === 0 ? (
        <p className="notes-list__empty-message">No Notes Currently</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-item">
            <h3 className="note-item__title">Title: {note.title}</h3>
            <p className="note-item__content">Content: {note.body}</p>
            <p className="note-item__date" dangerouslySetInnerHTML={{ __html: showFormattedDate(note.createdAt) }}></p>
            <div className="note-item__action">
              <button
                className="note-item__delete-button"
                onClick={() => onDelete(note.id)}
              >
                Delete
              </button>
              <button
                className="note-item__archive-button"
                onClick={() => onArchive(note.id)}
              >
                Archive
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
