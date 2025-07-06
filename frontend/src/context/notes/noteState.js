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
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a note
  const addNote = async (title, description, tag, category) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag, category })
    });
    // eslint-disable-next-line
    const note = await response.json();
    setNotes(notes.concat(note));
    console.log("Adding a new note")
    // const note = {
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    // }
    // setNotes([...notes, note]);

  }
  // Delete  -> ->
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    // eslint-disable-next-line
    const json = await response.json()

    const newnote = notes.filter((note) => { return note._id !== id });
    setNotes(newnote)
    console.log("deleting the note " + id)
  }

  // Edit   -> ->

  const editNote = async (id, title, description, tag, category) => {
    // API call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag, category })
    });
    // eslint-disable-next-line
    const json = await response.json()

    let newnotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        newnotes[index].category = category;
        break;
      }
    }
    setNotes(newnotes)
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;





// import { useState } from "react";
// import noteContext from "./noteContext";
// import { useNavigate } from 'react-router-dom';
// const NoteState = (props) => {
//   const host = "http://localhost:5000"; // Backend API URL
//   const initialNotes = [];
//   const [notes, setNotes] = useState(initialNotes);
// let navigate = useNavigate();

//   const getNotes = async () => {
//     const token = localStorage.getItem("token");
    
//     if (!token) {
//       // If no token is found, redirect to login page
//       navigate("/login");
//       return;
//     }
  
//     // API call to fetch all notes
//     try {
//       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": token, // Include the token in headers
//         },
//       });
  
//       const json = await response.json();
//       if (response.status === 200) {
//         setNotes(Array.isArray(json) ? json : []); // Ensure notes is always an array
//       } else {
//         console.error(json.error); // Log the error response
//         navigate("/login"); // Redirect to login if token is invalid
//       }
//     } catch (error) {
//       console.error(error.message); // Log the error
//       navigate("/login"); // Redirect to login if there's an error
//     }
//   };
  

//   // Add a note
//   const addNote = async (title, description, tag) => {
//     // API call to add a new note
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token"),
//       },
//       body: JSON.stringify({ title, description, tag }),
//     });
    
//     const note = await response.json();
//     setNotes(notes.concat(note)); // Add the new note to the state
//   };

//   // Delete a note
//   const deleteNote = async (id) => {
//     // API call to delete a note
//     const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token"),
//       },
//     });

//     const json = await response.json();
//     const newNotes = notes.filter((note) => note._id !== id); // Remove deleted note from state
//     setNotes(newNotes);
//   };

//   // Edit a note
//   const editNote = async (id, title, description, tag) => {
//     // API call to update a note
//     const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token"),
//       },
//       body: JSON.stringify({ title, description, tag }),
//     });

//     const json = await response.json();
//     let newNotes = JSON.parse(JSON.stringify(notes)); // Clone notes array
//     for (let index = 0; index < newNotes.length; index++) {
//       if (newNotes[index]._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag;
//         break;
//       }
//     }
//     setNotes(newNotes); // Update the notes array in state
//   };

//   return (
//     <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//       {props.children}
//     </noteContext.Provider>
//   );
// };

// export default NoteState;
