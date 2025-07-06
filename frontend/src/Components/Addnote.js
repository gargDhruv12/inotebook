import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import categoryContext from '../context/categories/categoryContext';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Plus } from 'lucide-react';

const Addnote = (props) => {
    const noteContextData = useContext(noteContext);
    const categoryContextData = useContext(categoryContext);
    const { addNote } = noteContextData;
    const { categories } = categoryContextData;
    const [note, setNote] = useState({ title: "", description: "", tag: "", category: "" });
    
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag, note.category || null)
        setNote({ title: "", description: "", tag: "", category: "" })
        props.showAlert("Added Successfully","success");
    }
    
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="mb-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Add a Note
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleClick} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="text-sm font-medium">Title</label>
                            <Input
                                type="text"
                                id="title"
                                name='title'
                                minLength={3}
                                required
                                value={note.title}
                                onChange={onChange}
                                placeholder="Enter note title"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="text-sm font-medium">Description</label>
                            <Input
                                type="text"
                                value={note.description}
                                id="description"
                                name='description'
                                minLength={5}
                                required
                                onChange={onChange}
                                placeholder="Enter note description"
                            />
                        </div>
                        <div>
                            <label htmlFor="tag" className="text-sm font-medium">Tag</label>
                            <Input
                                type="text"
                                id="tag"
                                name='tag'
                                value={note.tag}
                                onChange={onChange}
                                placeholder="Enter note tag"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="text-sm font-medium">Category</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="category"
                                name='category'
                                value={note.category}
                                onChange={onChange}
                            >
                                <option value="">No Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.icon} {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button type="submit" className="w-full">
                            Add Note
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Addnote
