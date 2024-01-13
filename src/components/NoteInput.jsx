import React, { Component } from 'react';

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNote: {
        title: '',
        body: '',
      },
      isTitleValid: true,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title' && value.length > 50) {
      this.setState({ isTitleValid: false });
    } else {
      this.setState({ isTitleValid: true });
    }
    this.setState((prevState) => ({
      newNote: { ...prevState.newNote, [name]: value },
    }));
  };

  handleAddNote = () => {
    const { addNote } = this.props;
    const { newNote, isTitleValid } = this.state;
    if (isTitleValid) {
      addNote(newNote);
      this.setState({
        newNote: {
          title: '',
          body: '',
        },
      });
    }
  };

  render() {
    const { newNote, isTitleValid } = this.state;
    const titleCharLimit = 50 - newNote.title.length;

    return (
      <div className="note-input">
        <label htmlFor="title" className="note-input__title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={newNote.title}
          onChange={this.handleInputChange}
          maxLength={50}
        />
        {!isTitleValid && (
          <p className="note-input__title__char-limit">
            Title cannot exceed 50 characters. Please delete some text.
          </p>
        )}
        {isTitleValid && (
          <p className="note-input__title__char-limit">
            {titleCharLimit} characters left
          </p>
        )}
        <br />
        <label htmlFor="body" className="note-input__body">
          Body:
        </label>
        <textarea
          id="body"
          name="body"
          value={newNote.body}
          onChange={this.handleInputChange}
        />
        <br />
        <button
          className="note-input__button"
          onClick={this.handleAddNote}
          disabled={!isTitleValid}
        >
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteInput;