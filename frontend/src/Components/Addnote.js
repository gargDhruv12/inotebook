import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully","success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container my-2">
                <div className="mx-5">
                    <h2>Add a note</h2>
                    <form className='my-3'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name='title' minLength={3} required value={note.title}
                                aria-describedby="emailHelp"
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control" value={note.description}
                                id="description" name='description' minLength={5} required
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tag" name='tag' value={note.tag}
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Addnote
