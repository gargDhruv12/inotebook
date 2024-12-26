import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote.js';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, []);

    const updateNote = (currNote) => {
        ref.current.click();
        setNote({etitle : currNote.title, edescription : currNote.description, etag : currNote.tag});
    };

    const ref = useRef(null);
    const [note, setNote] = useState({etitle : "",edescription : "",etag : ""});

    const handleClick = (e)=>{
        e.preventDefault();
        console.log("note updated")
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name] : e.target.value})
    }
    return (
        <>
            <Addnote />

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
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription" name='edescription' value={note.edescription}
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>
                                Update note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container ">
                <div className="mx-4">
                    <h2>Your notes buddy</h2>
                    <div className="row">
                        {notes.map((note) => {
                            return <Noteitem note={note} key={note._id} updateNote={updateNote} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notes;
