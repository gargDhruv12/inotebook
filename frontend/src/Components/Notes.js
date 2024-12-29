import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote.js';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();    // Note in latest versions of React navigate has been used in place of useHistory

    useEffect(() => {
        if (!localStorage.getItem('token')) {
          navigate('/login');
        } else {
          getNotes();
        }
        // eslint-disable-next-line
      }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id : "", etitle : "",edescription : "",etag : ""});

    const updateNote = (currNote) => {
        ref.current.click();
        setNote({id : currNote._id, etitle : currNote.title, edescription : currNote.description, etag : currNote.tag});
    };

    const handleClick = (e)=>{
        console.log("note updated");
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully","success");
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name] : e.target.value})
    }
    return (
        <>
            <Addnote showAlert = {props.showAlert} />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle" name='etitle' value={note.etitle}
                                        aria-describedby="emailHelp" minLength={3} required
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription" name='edescription' value={note.edescription} minLength={5} required
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag" name='etag' value={note.etag}
                                        onChange={onChange}
                                    />
                                </div>
                               
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary"  onClick={handleClick}>
                                Update note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container ">
                <div className="mx-4">
                    <h2>Your notes buddy</h2>
                    <div className="container">{notes.length ===0 && "No notes to display"}</div>
                    
                    <div className="row">
                        {notes.map((note) => {
                            return <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert = {props.showAlert} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notes;





// {Array.isArray(notes) ? (
//     notes.map((note) => {
//         return <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert} />;
//     })
// ) : (
//     <div>No notes available</div>
// )}