import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import categoryContext from '../context/categories/categoryContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote.js';
import { useNavigate } from 'react-router-dom';
import { Input } from '../Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Search } from 'lucide-react';

const Notes = (props) => {
    const noteContextData = useContext(noteContext);
    const categoryContextData = useContext(categoryContext);
    const { notes, getNotes, editNote } = noteContextData;
    const { categories } = categoryContextData;
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
          navigate('/login');
        } else {
          getNotes();
        }
    }, [getNotes, navigate]);

    const [searchTerm, setSearchTerm] = useState("");
    const selectedCategory = props.selectedCategory;

    const updateNote = (currNote) => {
        props.onEditNote && props.onEditNote(currNote, (updatedNote) => {
            editNote(
                updatedNote.id,
                updatedNote.etitle,
                updatedNote.edescription,
                updatedNote.etag,
                updatedNote.ecategory || null
            );
            props.showAlert("Updated Successfully","success");
        });
    };

    // Filter notes based on selected category and search term
    const filteredNotes = notes.filter(note => {
        const matchesCategory = selectedCategory === null || note.category === selectedCategory;
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            note.tag.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryName = (categoryId) => {
        if (!categoryId) return "No Category";
        const category = categories.find(cat => cat._id === categoryId);
        return category ? `${category.icon} ${category.name}` : "Unknown Category";
    };

    return (
        <>
            <Addnote showAlert={props.showAlert} />

            {/* Search and Filter Section */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Search & Filter Notes
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium">Search Notes</label>
                            <Input
                                type="text"
                                placeholder="Search by title, description, or tag..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium">Current Category</label>
                            <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm">
                                {selectedCategory ? 
                                    categories.find(cat => cat._id === selectedCategory)?.name || "Unknown Category" :
                                    "All Categories"
                                }
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notes Display */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Your Notes</h2>
                    <div className="text-sm text-muted-foreground">
                        {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found
                    </div>
                </div>
                
                {filteredNotes.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-lg font-semibold mb-2">No notes found</h3>
                            <p className="text-muted-foreground text-center">
                                {searchTerm || selectedCategory 
                                    ? "Try adjusting your search or filter criteria"
                                    : "Create your first note to get started!"
                                }
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredNotes.map((note) => {
                            return (
                                <Noteitem 
                                    note={note} 
                                    key={note._id} 
                                    updateNote={updateNote} 
                                    showAlert={props.showAlert}
                                    categoryName={getCategoryName(note.category)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Notes;