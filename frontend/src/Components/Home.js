import React, { useState, useContext } from 'react';
import Notes from './Notes';
import CategorySidebar from './CategorySidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Components/ui/dialog';
import { Input } from '../Components/ui/input';
import { Button } from '../Components/ui/button';
import categoryContext from '../context/categories/categoryContext';

const Home = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editNote, setEditNote] = useState({id: '', etitle: '', edescription: '', etag: '', ecategory: ''});
  const [onEditNoteSave, setOnEditNoteSave] = useState(() => () => {});
  const { categories } = useContext(categoryContext);

  // Called by Notes.js when user wants to edit a note
  const handleEditNote = (note, onSave) => {
    setEditNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
      ecategory: note.category || ''
    });
    setOnEditNoteSave(() => onSave);
    setIsEditDialogOpen(true);
  };

  // Called when user clicks Update Note in dialog
  const handleEditNoteSave = (e) => {
    e.preventDefault();
    onEditNoteSave(editNote);
    setIsEditDialogOpen(false);
  };

  const handleEditNoteChange = (e) => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen">
      <CategorySidebar 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        showAlert={props.showAlert}
      />
      <div className="flex-1 overflow-auto p-6">
        <Notes 
          showAlert={props.showAlert}
          selectedCategory={selectedCategory}
          onEditNote={handleEditNote}
        />
      </div>
      {/* Edit Note Dialog rendered outside scrollable area */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <form className='space-y-4' onSubmit={handleEditNoteSave}>
            <div>
              <label htmlFor="etitle" className="text-sm font-medium">Title</label>
              <Input
                type="text"
                id="etitle"
                name='etitle'
                value={editNote.etitle}
                minLength={3}
                required
                onChange={handleEditNoteChange}
              />
            </div>
            <div>
              <label htmlFor="edescription" className="text-sm font-medium">Description</label>
              <Input
                type="text"
                id="edescription"
                name='edescription'
                value={editNote.edescription}
                minLength={5}
                required
                onChange={handleEditNoteChange}
              />
            </div>
            <div>
              <label htmlFor="etag" className="text-sm font-medium">Tag</label>
              <Input
                type="text"
                id="etag"
                name='etag'
                value={editNote.etag}
                onChange={handleEditNoteChange}
              />
            </div>
            <div>
              <label htmlFor="ecategory" className="text-sm font-medium">Category</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="ecategory"
                name='ecategory'
                value={editNote.ecategory}
                onChange={handleEditNoteChange}
              >
                <option value="">No Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Update Note
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
