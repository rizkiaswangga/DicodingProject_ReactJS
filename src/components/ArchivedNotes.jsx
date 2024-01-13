import React, { Component } from 'react';
import { showFormattedDate } from '../utils/index';

class ArchivedNotes extends Component {
  render() {
    const { archivedNotes, onDeleteArchived, onRevertArchived } = this.props;

    return (
      <div className="notes-list archived-notes-list">
        {archivedNotes.length === 0 ? (
          <p className="notes-list__empty-message">No Archived Notes Currently</p>
        ) : (
          archivedNotes.map((note) => (
            <div key={note.id} className="note-item">
              <h3 className="note-item__title">Title: {note.title}</h3>
              <p className="note-item__content">Content: {note.body}</p>
              <p className="note-item__date" dangerouslySetInnerHTML={{ __html: showFormattedDate(note.createdAt) }}></p>
              <div className="note-item__action">
                <button
                  className="note-item__delete-button"
                  onClick={() => onDeleteArchived(note.id)}
                >
                  Delete
                </button>
                <button
                  className="note-item__archive-button"
                  onClick={() => onRevertArchived(note.id)}
                >
                  Revert
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default ArchivedNotes;
