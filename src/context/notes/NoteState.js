import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)


  // Get all notes
  const getNotes = async () => {
    // to do api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2NWI4NGVhNTZkM2UyZDJiODlmNWU1In0sImlhdCI6MTczNDgxNTg5NH0.cGuhbJsO7DJw1x6-zC-p3Xu5WknjAbJl_g5X7l8SVOY"
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2NWI4NGVhNTZkM2UyZDJiODlmNWU1In0sImlhdCI6MTczNDgxNTg5NH0.cGuhbJsO7DJw1x6-zC-p3Xu5WknjAbJl_g5X7l8SVOY"
      },
      body: JSON.stringify({ title, description, tag })
    });
    // eslint-disable-next-line
    const json = response.json()

    console.log("Adding a new note")
    const note = {
      "title": title,
      "description": description,
      "tag": tag,
    }
    setNotes([...notes, note]);

  }
  // Delete  -> ->
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2NWI4NGVhNTZkM2UyZDJiODlmNWU1In0sImlhdCI6MTczNDgxNTg5NH0.cGuhbJsO7DJw1x6-zC-p3Xu5WknjAbJl_g5X7l8SVOY"
      },
    });
    const json = response.json()
    console.log(json);

    const newnote = notes.filter((note) => { return note._id !== id });
    setNotes(newnote)
    console.log("deleting the note " + id)
  }

  // Edit   -> ->

  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2NWI4NGVhNTZkM2UyZDJiODlmNWU1In0sImlhdCI6MTczNDgxNTg5NH0.cGuhbJsO7DJw1x6-zC-p3Xu5WknjAbJl_g5X7l8SVOY"
      },
      body: JSON.stringify({ title, description, tag })
    });
    // eslint-disable-next-line
    const json = response.json()
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;
